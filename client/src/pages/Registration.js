import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import GenericTextInput from '../components/GenericTextInput'
import GenericRadioInput from '../components/GenericRadioInput'
import DateSelect from '../components/DateSelect'
import DropDownSelect from '../components/DropDownSelect'
import RelationInput from '../components/RelationsInput'
import ToggleSelect from '../components/ToggleSelect'
import { useAuth } from '../contexts/AuthContext'

export default function Registration() {
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
    const [phoneVisibility, setPhoneVisibility] = useState(true)
    
    //disables submit button while the database is updating
    const [loading, setLoading] = useState(false)

    //toggles if an * is displayed next to required fields
    const [showRequired, setShowRequired] = useState(false)
    
    const [userData, setUserData] = useState()

    
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
                    phoneNumberVisibility: phoneVisibility
                }})
            })
                navigate("/")
            } catch (e) {
                console.log(e)
            }
        }

        
        setLoading(false)
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900 h-full">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Registration 
                    </h1>
                    <div className="inline flex">
                        <div className="mr-2 w-1/2">
                            <GenericTextInput label="First Name" defaultValue={userData?.firstName} setValue={setFirstName} displayRequired={showRequired}/>
                        </div>

                        <div className="ml-2 w-1/2">
                            <GenericTextInput label="Last Name" defaultValue={userData?.lastName} setValue={setLastName} displayRequired={showRequired}/>
                        </div>

                    </div>
                    <div className="flex gap-8">
                        <div className="w-3/5">
                            <GenericTextInput label="Phone Number" defaultValue={userData?.phoneNumber} setValue={setPhoneNumber}/>
                        </div>
                        <ToggleSelect label="Profile Visibility" defaultValue={userData ? userData.phoneNumberVisibility : true} setValue={setPhoneVisibility}/>
                    </div>
                    <GenericTextInput label="Address (Local Village)" defaultValue={userData?.address} setValue={setAddress}/>
                    <GenericTextInput label="City" defaultValue={userData?.city} setValue={setCity}/>
                    <GenericRadioInput label="Gender" id="registrationGender" defaultValue={userData?.gender} options={["Male", "Female", "Other"]} setValue={setGender}/>
                    <DateSelect label="Date of Birth" defaultValue={userData?.dateOfBirth} setValue={setDate}/>
                    <DropDownSelect label="Clan" defaultValue={userData?.clan} options={["Njovu"]} setValue={setClan}/>
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

                    <button type="submit" onClick={handleSubmit} disabled={loading} className="mt-4 w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>
                </div>
                </div>
            </div>
        </section>
    )
    
}
