const express = require('express')
const app = express()
const { db } = require('./firebase')
const { doc, collection, getDoc, setDoc, getDocs, deleteDoc, query, where} = require('firebase/firestore')
const cors = require('cors')
const bodyParser = require('body-parser')
const { storage } = require('./firebase')
const { ref, getDownloadURL} = require('firebase/storage')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.post("/api/getUserData", async (req, res) => {
    console.log("request made")
    const userDataRef = doc(db, "users", req.body.currentUser)
    const retrievedData = await getDoc(userDataRef)
    res.send(retrievedData.data())
})

app.put("/api/updateUserData", async (req, res) => {
    const userData = req.body.data
    userData.lastUpdated = new Date().toLocaleString()
    userData.email = req.body.email != null ? req.body.email : ""
    setDoc(doc(db, "users", req.body.currentUser), userData)
    console.log(req.body.updateApproved)
    if (req.body.updateApproved) {
        setDoc(doc(db, "people", req.body.currentUser), userData)
    } else {
        setDoc(doc(db, "requests", req.body.currentUser), userData)
    }
    
    res.send("data updated")
})

app.put("/api/adminApproveData", async (req, res) => {
    console.log(req.body.currentUser)
    const approvedData = await getDoc(doc(db, "requests", req.body.currentUser))
    setDoc(doc(db, "people", req.body.currentUser), approvedData.data())
    await deleteDoc(doc(db, "requests", req.body.currentUser))
    res.send("data approved")
})

app.delete("/api/adminRemoveRequest", async (req, res) => {
    await deleteDoc(doc(db, "requests", req.body.currentUser))
    res.send("request removed")
})

app.delete("/api/adminDeleteData", async (req, res) => {
    await deleteDoc(doc(db, "people", req.body.currentUser))
    res.send("data removed")
})


app.post("/api/searchForName", async (req, res) => {
    const peopleRef = collection(db, "people")
    const q = query(peopleRef, where("firstName", "==", req.body.firstName), where("lastName", "==", req.body.lastName))
    const querySnapshot = await getDocs(q)
    let docCount = 0
    querySnapshot.forEach((doc) => {
        docCount++
    })
    res.send(String(docCount != 0))
    
})


app.post("/api/adminSearch", async (req, res) => {
    const dbRef = collection(db, "people")
    const resultList = []
    await getDocs(dbRef).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const userData = doc.data()
            if (checkKeyword(req.body.searchTerm, Object.values(flattenObject(userData)).join("|"))) {
                userData.id = doc.id
                resultList.push(userData)
            }
        })
    })
    
    res.send(resultList)

})

app.get("/api/adminGetNewUsers", async (req, res) => {
    const dbRef = collection(db, "requests")
    let resultList = []
    const userDocs = await getDocs(dbRef)
    await userDocs.forEach(async (userDoc) => {
        resultList.push(getUserDataIfNotExists(userDoc))
    })

    Promise.all(resultList).then((values) => {
        console.log("new", values)
        res.send(values.filter(elments => elments != null))
    })
})

app.get("/api/adminGetPendingChanges", async (req, res) => {
    const dbRef = collection(db, "requests")
    let resultList = []
    const userDocs = await getDocs(dbRef)
    await userDocs.forEach(async (userDoc) => {
        resultList.push(getUserDataIfExists(userDoc))
    })

    Promise.all(resultList).then((values) => {
        console.log("changes", values)
        res.send(values.filter(elments => elments != null))
    })
    
})

async function getUserDataIfExists(userDoc) {
    return await getDoc(doc(db, "people", userDoc.id)).then((officialDoc) => {
        if (officialDoc.exists()) {
            return {...userDoc.data(), id: userDoc.id}
        } else  {
            return null
        }
    })
}

async function getUserDataIfNotExists(userDoc) {
    return await getDoc(doc(db, "people", userDoc.id)).then((officialDoc) => {
        if (!officialDoc.exists()) {
            return {...userDoc.data(), id: userDoc.id}
        } else  {
            return null
        }
    })
}



app.post("/api/search", async (req, res) => {
    const peopleRef = collection(db, "people")
    const userDataRef = doc(db, "users", req.body.currentUser)
    const retrievedData = await getDoc(userDataRef)
    
    bfsResult = []
    const currUser = {...retrievedData.data(), depth: 0, id:req.body.currentUser}
    await breathFirstSearch(peopleRef, [currUser],[currUser.firstName + " " + currUser.lastName], req.body.filters)
    console.log(req.body.sorting)
    if (req.body.sorting == "Max Depth") {
        bfsResult.reverse()
    }

    let sortedResult = req.body.sorting == "Max Depth" ? bfsResult.sort(d1, d2 => d1.depth - d2.depth) : bfsResult.sort(d1, d2 => d2.depth - d1.depth)

    res.send(sortedResult)
})

let bfsResult = []

async function breathFirstSearch(dataRef, queue, visited, filters){
    if (!queue.length) {
        return new Promise((resolve, reject) => resolve(""))
    }

    currPerson = queue.pop()
    
    if (currPerson.depth > filters.maxDepth) {
        return new Promise((resolve, reject) => resolve(""))
    }

    

    //check if currPerson is a user
    const usersRef = collection(db, "users")
    const q = query(usersRef, where("firstName", "==", currPerson.firstName), where("lastName", "==", currPerson.lastName))
    const querySnapshot = await getDocs(q)
    let docCount = 0
    querySnapshot.forEach((doc) => {
        docCount++ 
    })

    if (docCount >= 0) {
        if ((filters.clan == currPerson.clan || filters.clan == "All") && (filters.gender == currPerson.gender || filters.gender == "All") && currPerson.depth > filters.minDepth){ 
            const profileText = Object.values(flattenObject(currPerson)).join("|")
            if (filters.keyword.trim() == "" || checkKeyword(filters.keyword, profileText)){
                if (currPerson.profileVisibility) {
                
                    currPerson.age = getAge(currPerson.dateOfBirth?.startDate)

                    await getDownloadURL(ref(storage, `images/${currPerson.id}`)).then((url) => {
                        currPerson.photo = url
                    }).catch(err=> console.log(err))

                    bfsResult.push(currPerson)
                }
            }
                
        }
        
    }

    for (let relation of currPerson.relations) {
        if (!(visited.includes(relation.firstName + " " + relation.lastName))) {
            
            visited.push(relation.firstName + " " + relation.lastName)

            const q = query(dataRef, where("firstName", "==", relation.firstName), where("lastName", "==", relation.lastName))
            const querySnapshot = await getDocs(q)
            
            let newPerson = {}
            querySnapshot.forEach((doc) => {
                newPerson = doc.data()
                newPerson.id = doc.id
                newPerson.depth = currPerson.depth + 1
            })

            if (Object.keys(newPerson).length > 1) {
                queue.push(newPerson)
            }
        }
    }

    await breathFirstSearch(dataRef, queue, visited, filters)

}

function checkKeyword(word, text) {
    return text.toLowerCase().includes(word.toLowerCase())
}

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function flattenObject (obj, prefix = '') {
    return Object.keys(obj).reduce((acc, k) => {
      const pre = prefix.length ? prefix + '.' : '';
      if (typeof obj[k] === 'object') Object.assign(acc, flattenObject(obj[k], pre + k));
      else acc[pre + k] = obj[k];
      return acc;
    }, {})
  }
  

app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`))
