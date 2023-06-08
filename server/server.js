const express = require('express')
const app = express()
const { db } = require('./firebase')
const { doc, collection, getDoc, setDoc, getDocs, query, where} = require('firebase/firestore')
const cors = require('cors')
const bodyParser = require('body-parser')
const { storage } = require('./firebase')
const { ref, getDownloadURL} = require('firebase/storage')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.post("/api/getUserData", async (req, res) => {
    const userDataRef = doc(db, "users", req.body.currentUser)
    const retrievedData = await getDoc(userDataRef)
    res.send(retrievedData.data())
})

app.put("/api/updateUserData", async (req, res) => {
    setDoc(doc(db, "users", req.body.currentUser), req.body.data)
    setDoc(doc(db, "people", req.body.currentUser), req.body.data)
    res.send("data updated")
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
    console.log(bfsResult)

    res.send(bfsResult)
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
            const profileText = Object.values(currPerson).join("|")
            if (filters.keyword.trim() == "" || checkKeyword(filters.keyword, profileText)){
                
                currPerson.age = getAge(currPerson.dateOfBirth?.startDate)

                if (!currPerson.phoneNumberVisibility) {
                    currPerson.phoneNumber = "●●●-●●●-●●●●"
                }

                await getDownloadURL(ref(storage, `images/${currPerson.id}`)).then((url) => {
                    currPerson.photo = url
                }).catch(err=> console.log(err))

                bfsResult.push(currPerson)
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
    console.log(word, text)
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


app.listen(process.env.PORT, () => console.log("Server started on port 5005"))
