import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/blueLogo.png'
import { useAuth } from '../contexts/AuthContext'
import SettingsModal from './SettingsModal'
import { storage } from '../util/firebase'
import { ref, getDownloadURL} from 'firebase/storage'

export default function() {
    const navigate = useNavigate()

    const { currentUser, logout } = useAuth()
    const [dropDownOpen, setDropDownOpen] = useState(false)
    const [settingsOpen, setSettingsOpen] = useState(false)

    const [profilePic, setProfilePic] = useState()

    //loads the users profile pic from firebase storage
    //all pfp's are saved in "image/userUID"
    useEffect(()=> {
        getDownloadURL(ref(storage, `images/${currentUser.uid}`)).then((url) => {
            setProfilePic(url)
        }).catch(err=> console.log(err))
    }, [])

    return (
        <div>
            <nav class="bg-blue-600 py-10">
                <div class="mx-auto px-2 sm:px-6 ">
                    <div class="relative flex h-16 items-center justify-between">
                    <img className="w-16 h-16" src={logo} alt="logo"></img>
                    <span className="text-white text-2xl font-bold">Buganda Geneology</span>
                    <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div class="hidden sm:ml-6 sm:block">
                            <div class="flex space-x-4">
                                <a href="#" class="text-gray-200 hover:text-white rounded-md px-3 py-2 text-sm font-medium" onClick={()=>navigate("/")}>Clan Info</a>
                                <a href="#" class="text-gray-200 hover:text-white  rounded-md px-3 py-2 text-sm font-medium" onClick={()=>navigate("/Kings")}>King History</a>
                                <a href="#" class="text-gray-200 hover:text-white rounded-md px-3 py-2 text-sm font-medium" onClick={()=>navigate("/Search")}>Geneology Search</a>
                            </div>
                        </div>
                    </div>
                    <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div class="relative ml-3 mr-3">
                            <div>
                                <button type="button" onClick={()=>setDropDownOpen((prevState) => !prevState)}class="flex items-center text-white justify-center rounded-full" id="user-menu-button">
                                
                                <span class="mr-4">{currentUser.email}</span>
                                <img class="h-8 w-8 rounded-full" src={`${profilePic ? profilePic : "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"}`} alt=""/>
                                </button>
                            </div>

                            <div id="dropdown" onMouseLeave={()=>setDropDownOpen(false)} class={`${dropDownOpen ? "" : "hidden" } absolute right-0 top-10 z-10 py-2 w-48 bg-white rounded-lg text-gray-800 shadow-xl`}>
                                    <a onClick={()=>setSettingsOpen(true)} class="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">Account Settings</a>
                                    <a onClick={logout} class="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                </nav>
            <SettingsModal open={settingsOpen} closeFunc={()=>setSettingsOpen(false)}></SettingsModal>
            
        </div>
    )
}


