import React from 'react'
import ReactDom from 'react-dom'
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

    const [sideBarOpen, setSideBarOpen] = useState(false)
    console.log(sideBarOpen)

    //loads the users profile pic from firebase storage
    //all pfp's are saved in "image/userUID"
    useEffect(()=> {
        getDownloadURL(ref(storage, `images/${currentUser.uid}`)).then((url) => {
            setProfilePic(url)
        }).catch(err=> console.log(err))
    }, [])

    function handleClickOut(event) {
        const sideBar = document.getElementById("sideBarContainer")
        if (!(sideBar.contains(event.target))) {
            setSideBarOpen(false)
        }
    }

    function navigateClanInfo() {
        setSideBarOpen(false)
        navigate("/")
        
    }
    console.log(window.screen.width)

    ReactDom.render(<div className={`fixed ${sideBarOpen ? "" : "hidden"} z-1001 overflow-y-scroll left-0 top-0 right-0 bottom-0 bg-gray-700 bg-opacity-75`} onClick={handleClickOut}></div>, document.getElementById("portal"))

    return (
        <div>
            
            <div>
            <nav class="bg-blue-600 py-5">
                <div class="mx-auto px-2 sm:px-6 ">
                <aside id="sideBarContainer" class={`fixed z-1001 top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full ${sideBarOpen ? "translate-x-0" : ""}`} aria-label="Sidebar">
                    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-100 dark:bg-gray-800">
                        <ul class="space-y-2 font-medium text-lg">
                            <li>
                                <button onClick ={()=>setSideBarOpen(false)} class="cursor-pointer text-gray-900 font-semibold rounded-lg dark:text-white0">
                                <span class="ml-3 text-xl">Buganda Geneology</span>
                                </button>
                            </li>
                            <li>
                                <a href="#" onClick={navigateClanInfo} class="flex items-center p-2.5 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
                                <span class="flex-1 ml-3 whitespace-nowrap">Clan Info</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={()=>navigate("/Kings")} class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 576 512"><path d="M576 136c0 22.09-17.91 40-40 40c-.248 0-.4551-.1266-.7031-.1305l-50.52 277.9C482 468.9 468.8 480 453.3 480H122.7c-15.46 0-28.72-11.06-31.48-26.27L40.71 175.9C40.46 175.9 40.25 176 39.1 176c-22.09 0-40-17.91-40-40S17.91 96 39.1 96s40 17.91 40 40c0 8.998-3.521 16.89-8.537 23.57l89.63 71.7c15.91 12.73 39.5 7.544 48.61-10.68l57.6-115.2C255.1 98.34 247.1 86.34 247.1 72C247.1 49.91 265.9 32 288 32s39.1 17.91 39.1 40c0 14.34-7.963 26.34-19.3 33.4l57.6 115.2c9.111 18.22 32.71 23.4 48.61 10.68l89.63-71.7C499.5 152.9 496 144.1 496 136C496 113.9 513.9 96 536 96S576 113.9 576 136z"/></svg>
                                <span class="flex-1 ml-3 whitespace-nowrap">Past Kings</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={()=>navigate("/Search")} class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 512 512"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/></svg>
                                <span class="flex-1 ml-3 whitespace-nowrap">Geneology Search</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={()=>{setSideBarOpen(false); setSettingsOpen(true)}} class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg aria-hidden="true"  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                                <span class="flex-1 ml-3 whitespace-nowrap">Edit Profile</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={()=>{setSideBarOpen(false); logout()}} class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"></path></svg>
                                <span class="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    </aside>


                    <div class="relative flex h-16 items-center justify-between">
                        <button data-collapse-toggle="navbar-default" type="button" onClick={()=>setSideBarOpen(true)} class="inline-flex items-center p-2 mx-1.5 text-sm text-gray-500 rounded-lg md:hidden hover:bg-blue-500 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <svg class="w-6 h-6" aria-hidden="true" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                        </button>
                    <img className="md:w-12 md:h-12 h-10 w-10 mr-2" src={logo} alt="logo"></img>
                    <span className="text-white text-lg md:text-2xl font-bold">Buganda Geneology</span>
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
                                <button type="button" onClick={()=>{window.screen.width > 1000 ? setDropDownOpen((prevState) => !prevState) : setDropDownOpen(false)}} class="flex items-center text-white justify-center rounded-full" id="user-menu-button">
                                
                                <div class="md:mr-10 hidden md:block">
                                    <span>{currentUser.email}</span>
                                </div>
                                <img class="h-9 w-9 rounded-full" src={`${profilePic ? profilePic : "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"}`} alt=""/>
                                </button>
                            </div>

                            <div id="dropdown" onMouseLeave={()=>setDropDownOpen(false)} class={`${dropDownOpen ? "" : "hidden" } absolute right-0 top-10 z-10 py-2 w-48 bg-white rounded-lg text-gray-800 shadow-xl`}>
                                    <a onClick={()=> setSettingsOpen(true)} class="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">Account Settings</a>
                                    <a onClick={logout} class="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                </nav>
            <SettingsModal open={settingsOpen} closeFunc={()=> setSettingsOpen(false)}></SettingsModal>
            </div>
        </div>
    )
}


