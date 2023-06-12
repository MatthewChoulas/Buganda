import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactDom from 'react-dom'
import GenericTextInput from '../components/GenericTextInput'
import GenericRadioInput from '../components/GenericRadioInput'
import DateSelect from '../components/DateSelect'
import DropDownSelect from '../components/DropDownSelect'
import RelationInput from '../components/RelationsInput'
import ToggleSelect from './ToggleSelect'
import { storage} from '../util/firebase'
import { ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { useAuth } from '../contexts/AuthContext'

export default function SettingsModal({open, closeFunc}) {
    const { currentUser } = useAuth()
    const navigate = useNavigate()

    //Data entry states
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [gender, setGender] = useState('')
    const [date, setDate] = useState('')
    const [clan, setClan] = useState('')
    const [description, setDescription] = useState('')
    const [relations, setRelations] = useState([])
    const [profileVisibility, setProfileVisibility] = useState(true)

    //stores profilePic url
    const [profilePic, setProfilePic] = useState()
    
    //disables submit button while the database is updating
    const [loading, setLoading] = useState(false)

    const [showRequired, setShowRequired] = useState(false)
    
    const [userData, setUserData] = useState()

    const [picHover, setPicHover] = useState(false)

    // makes request to server to get user data and sets userDataState to the servers response
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER}/api/getUserData`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({currentUser: currentUser.uid})
        }).then(
            response => response.json()
        ).then(
            data => {
                setUserData(data)
            }
        )
    }, [])
    
    //checks that required field(first and last name) are filled out
    //if they are the data in the users doc is updated with the fields from the form
    async function handleSubmit(){
        setLoading(true)
        if (firstName == "" || lastName == "") {
            setShowRequired(true)
        } else {
            setShowRequired(false)
            try {
                await fetch(`${process.env.REACT_APP_SERVER}/api/updateUserData`, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                    body: JSON.stringify({currentUser: currentUser.uid, data: {
                    firstName: firstName,
                    lastName: lastName,
                    phoneNumber: phoneNumber,
                    address: address,
                    city: city,
                    gender: gender,
                    dateOfBirth: date,
                    clan: clan,
                    relations: relations,
                    description: description,
                    profileVisibility: profileVisibility
                }})
            })
                window.location.reload()
            } catch (e) {
                console.log(e)
            }
        }

        
        setLoading(false)
    }

    //calls the function to close the model when the user clicks outside of the container
    //this function is attached to the div that creates the background shadow behind the model
    function handleClickOut(event) {
        const modelContainer = document.getElementById("modelContainer")
        console.log(modelContainer.contains(event.target))
        if (!(modelContainer.contains(event.target))) {
            closeFunc()
        }
    }

    //loads the users profile picture from firebase storage when the model opens
    //user profiles are saved in the image directory and are named by the users UID
    useEffect(()=> {
            getDownloadURL(ref(storage, `images/${currentUser.uid}`)).then((url) => {
                setProfilePic(url)
            }).catch(err=> console.log(err))
    }, [])


    //updates database when a file is selected
    //attached to onChange of the file selector input
    function handleFileChange(event) {
        console.log("file exists")
        const file = event.target.files[0]
        if (file == null) return
        
        const imageRef = ref(storage, `images/${currentUser.uid}`)
        uploadBytes(imageRef, file).then(()=>{
            setProfilePic(URL.createObjectURL(file)) 
        })
    }

    //prevents html form being rendered if the model isn't open
    if (!open) return null

    return ReactDom.createPortal(
    
       <div className="fixed z-1000 left-50 top-50 border-white opacity-100">
       <div className="fixed z-1001 overflow-y-scroll left-0 top-0 right-0 bottom-0 bg-gray-700 bg-opacity-75" onClick={handleClickOut}>
       <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
                <div id="modelContainer" className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Account Settings
                </h1>
                <div className="flex items-center">
                    <div className="flex-shrink-0 relative border overflow-hidden rounded-full" onMouseEnter={() => setPicHover(true)} onMouseLeave={() => setPicHover(false)}>
                        <img className="h-36 w-36" src={`${profilePic ? profilePic : "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"}`} alt=""/>
                        <input className="hidden" type="file" id="file" onChange={handleFileChange}></input>
                        <label className={`absolute bottom-0 leading-7 cursor-pointer text-white text-center h-10 w-36 bg-[rgb(0,0,0,0.7)] text-xs ${picHover ? "visible" : "hidden"}`} for="file">Choose Photo</label>
                    </div>
                    <div className="max-w-60 ml-8 ">
                        <p className="break-words font-semibold text-xl">
                            {userData ? userData.firstName + " " + userData.lastName : ""}
                        </p>
                        <p className="break-all text-gray-700 mt-3">
                            {currentUser.email}
                        </p>
                    </div>
                </div>
                <h1 className="text-xl mt-4 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Personal Information
                </h1>
                    <div className="inline flex">
                        <div className="mr-2 w-1/2">
                            <GenericTextInput label="First Name" defaultValue={userData?.firstName} setValue={setFirstName} displayRequired={showRequired}/>
                        </div>

                        <div className="ml-2 w-1/2">
                            <GenericTextInput label="Last Name (Surname)" defaultValue={userData?.lastName} setValue={setLastName} displayRequired={showRequired}/>
                        </div>

                    </div>
                    <div className="flex gap-8">
                        <div className="w-3/5">
                            <GenericTextInput label="Phone Number" defaultValue={userData?.phoneNumber} setValue={setPhoneNumber}/>
                        </div>
                        <ToggleSelect label="Profile Visibility" defaultValue={userData ? userData.profileVisibility : true} setValue={setProfileVisibility}/>
                    </div>
                    <GenericTextInput label="Address (Local Village)" defaultValue={userData?.address} setValue={setAddress}/>
                    <GenericTextInput label="City" defaultValue={userData?.city} setValue={setCity}/>
                    <GenericRadioInput label="Gender" id="registrationGender" defaultValue={userData?.gender} options={["Male", "Female", "Other"]} setValue={setGender}/>
                    <DateSelect label="Date of Birth" defaultValue={userData?.dateOfBirth} setValue={setDate}/>
                    <DropDownSelect label="Clan" defaultValue={"Njovu"} options={["Njovu"]} setValue={setClan}/>
                    <GenericTextInput label="Short Personal Description" defaultValue={userData?.description} setValue={setDescription}/>
                    <div className="block pt-4">
                        <label className="block font-semibold mb-4 text-lg font-medium text-gray-900 dark:text-white">Add Relatives</label>
                        <RelationInput defaultValues={userData?.relations} setValue={setRelations}/>
                    </div>

                    {showRequired && <div className="w-full sm:max-w-md flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                    <span className="sr-only">Info</span>
                    <div>
                         "One or more required fields are missing"
                    </div>
                    </div>}

                    <button type="submit" onClick={handleSubmit} disabled={loading} className="mt-4 w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Update</button>
                </div>
                </div>
                </div>
                </div>
        </div>

        ,
       document.getElementById("portal")
    )
}