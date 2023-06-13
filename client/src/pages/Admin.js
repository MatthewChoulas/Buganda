import React from 'react'
import {useState, useEffect} from 'react'
import { useAuth } from '../contexts/AuthContext'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import UserDataRow from '../components/UserDataRow'
import SearchBar from '../components/SearchBar'
import DropDownSelect from '../components/DropDownSelect'

export default function Admin() {

    const { currentUser, checkAdmin } = useAuth()
    const [tabState, setTabState] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const [searchDB, setSearchDB ] = useState("Geneology Database")
    const [searchDisabled, setSearchDisabled] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const [newUsers, setNewUsers] = useState([])
    const [pendingChanges, setPendingChanges] = useState([])

    useEffect(() => {
        checkAdmin(currentUser)
    }, [])  

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER}/api/adminGetNewUsers`, {
            method:"GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
        }).then(response => response.json())
        .then(data => setNewUsers(data))
    }, []) 

    useEffect( () => {
        fetch(`${process.env.REACT_APP_SERVER}/api/adminGetPendingChanges`, {
            method:"GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
        }).then(response => response.json())
        .then(data => setPendingChanges(data))
    }, []) 

    async function handleSearch() {
        setSearchDisabled(true)
        await fetch(`${process.env.REACT_APP_SERVER}/api/adminSearch`, {
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                searchTerm: searchTerm
            })
        }).then(response => response.json())
        .then(data => setSearchResults(data))
        setSearchDisabled(false)
        
    }

    console.log(pendingChanges)

    
    
    function removeNewUser(index) {
        setNewUsers(prevArray => prevArray.slice(0, index).concat(prevArray.splice(index+1)))
    }

    function removePendingChange(index) {
        setPendingChanges(prevArray => prevArray.slice(0, index).concat(prevArray.splice(index+1)))
    }

    function removeSearchResult(index) {
        setSearchResults(prevArray => prevArray.slice(0, index).concat(prevArray.splice(index+1)))
    }
    


    return (
        <div> 
            <div className="w-screen w-max-screen overflow-auto min-h-screen flex flex-col">
                <Navbar></Navbar> 
                <div className="w-[85vw] flex flex-col justify-center px-6 py-8 mx-auto ">
                    <h1 className="my-4 text-4xl self-center font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                        Admin Dashboard
                    </h1>

                   
           

                    <div className="self-start mt-6 mb-4 text-sm font-medium text-center border-b-[2px] text-gray-500 border-gray-200 dark:text-gray-400 dark:border-gray-700">
                        {tabState == 1 && (
                            <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 ">
                                <li className="mr-2 border-blue-600 border-b-2" onClick={() => {setTabState(1)}}>
                                <a href="#" className="inline-flex p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group" aria-current="page">
                                <svg aria-hidden="true" className="w-5 h-5 mr-2 text-blue-600 dark:text-gray-500 dark:group-hover:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path></svg>New Users
                                </a>

                                </li>
                                <li className="mr-2 hover:border-b-2 hover:border-gray-300" onClick={() => {setTabState(2)}}>
                                <a href="#" className="inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                                    <svg aria-hidden="true" className="w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path></svg>Pending Changes
                                </a>
                                </li>

                                <li className="mr-2 hover:border-b-2 hover:border-gray-300" onClick={() => {setTabState(3)}}>
                                
                                <a href="#" className="inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                                    <svg className="self-center w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" xmlns="http://www.w3.org/2000/svg" height="1em" fill="currentColor" viewBox="0 0 448 512"><path d="M448 80v48c0 44.2-100.3 80-224 80S0 172.2 0 128V80C0 35.8 100.3 0 224 0S448 35.8 448 80zM393.2 214.7c20.8-7.4 39.9-16.9 54.8-28.6V288c0 44.2-100.3 80-224 80S0 332.2 0 288V186.1c14.9 11.8 34 21.2 54.8 28.6C99.7 230.7 159.5 240 224 240s124.3-9.3 169.2-25.3zM0 346.1c14.9 11.8 34 21.2 54.8 28.6C99.7 390.7 159.5 400 224 400s124.3-9.3 169.2-25.3c20.8-7.4 39.9-16.9 54.8-28.6V432c0 44.2-100.3 80-224 80S0 476.2 0 432V346.1z"/></svg>Edit Database
                                </a>
                                </li>
                            </ul>
                        )}
                        {tabState == 2 && (
                            <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 ">
                            <li className="mr-2 hover:border-b-2 hover:border-gray-300" onClick={() => {setTabState(1)}}>
                            <a href="#" className="inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                            <svg aria-hidden="true" className="w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path></svg>New Users
                            </a>
                            </li>
                            <li className="mr-2 border-blue-600 border-b-2" onClick={() => {setTabState(2)}}>
                                <a href="#" className="inline-flex p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group" aria-current="page">
                                <svg aria-hidden="true" className="w-5 h-5 mr-2 text-blue-600 dark:text-gray-500 dark:group-hover:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" clipRule="evenodd"></path></svg>Pending Changes
                                </a>
                            </li>
                            <li className="mr-2" onClick={() => {setTabState(3)}}>
                            
                            <a href="#" className="inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                                <svg className="self-center w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" xmlns="http://www.w3.org/2000/svg" height="1em" fill="currentColor" viewBox="0 0 448 512"><path d="M448 80v48c0 44.2-100.3 80-224 80S0 172.2 0 128V80C0 35.8 100.3 0 224 0S448 35.8 448 80zM393.2 214.7c20.8-7.4 39.9-16.9 54.8-28.6V288c0 44.2-100.3 80-224 80S0 332.2 0 288V186.1c14.9 11.8 34 21.2 54.8 28.6C99.7 230.7 159.5 240 224 240s124.3-9.3 169.2-25.3zM0 346.1c14.9 11.8 34 21.2 54.8 28.6C99.7 390.7 159.5 400 224 400s124.3-9.3 169.2-25.3c20.8-7.4 39.9-16.9 54.8-28.6V432c0 44.2-100.3 80-224 80S0 476.2 0 432V346.1z"/></svg>Edit Database
                            </a>
                            </li>
                        </ul>
                        )}
                        {tabState == 3 && (
                            <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 ">
                            <li className="mr-2 hover:border-b-2 hover:border-gray-300" onClick={() => {setTabState(1)}}>
                            <a href="#" className="inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                            <svg aria-hidden="true" className="w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path></svg>New Users
                            </a>
                            </li>

                            <li className="mr-2 hover:border-b-2 hover:border-gray-300" onClick={() => {setTabState(2)}}>
                                <a href="#" className="inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                                    <svg aria-hidden="true" className="w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path></svg>Pending Changes
                                </a>
                            </li>

                            <li className="mr-2 border-b-2 border-blue-600" onClick={() => {setTabState(3)}}>
                            <a href="#" className="inline-flex p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group">
                            <svg className="self-center w-4 h-4 mr-2 text-blue-600 dark:text-gray-500 dark:group-hover:text-gray-300" xmlns="http://www.w3.org/2000/svg" height="1em" fill="currentColor" viewBox="0 0 448 512"><path d="M448 80v48c0 44.2-100.3 80-224 80S0 172.2 0 128V80C0 35.8 100.3 0 224 0S448 35.8 448 80zM393.2 214.7c20.8-7.4 39.9-16.9 54.8-28.6V288c0 44.2-100.3 80-224 80S0 332.2 0 288V186.1c14.9 11.8 34 21.2 54.8 28.6C99.7 230.7 159.5 240 224 240s124.3-9.3 169.2-25.3zM0 346.1c14.9 11.8 34 21.2 54.8 28.6C99.7 390.7 159.5 400 224 400s124.3-9.3 169.2-25.3c20.8-7.4 39.9-16.9 54.8-28.6V432c0 44.2-100.3 80-224 80S0 476.2 0 432V346.1z"/></svg> Edit Database
                            </a>
                            </li>
                        </ul>
                        )}
                    </div>

                    {tabState == 3 && (
                        <div className='mt-4 flex gap-6 text-gray-900'>
                        <SearchBar placeHolder={"Search"} defaultValue={""} setValue={setSearchTerm}/>
                        <button onClick={handleSearch} disabled={searchDisabled} className="w-40 text-white bg-blue-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Search</button>
                        </div>
                    )}
                    
                    <div className="mt-6 pl-6 flex text-gray-400 text-sm w-full"> 
                        <span className="w-1/4">NAME</span>
                        <span className="w-1/6">CLAN</span>
                        <span className="w-1/6">LOCATION</span>
                        <span className="w-1/6">CREATED</span>
                        <span className="w-1/4">ACTIONS</span>
                    </div>
                    <span className=" mt-2 h-0.5 bg-gray-200 w-full"></span>
                    {tabState == 1 && (
                        newUsers.map((result, index) => (
                            <UserDataRow deleter={removeNewUser} index={index} email={result?.email} userUID={result.id} name={result.firstName + " " + result.lastName} clan={result.clan} location={result.city} photo={result.photo} date={result?.lastUpdated} userId="123" type={"new"}/>
                            ))
                    )}
                    {tabState == 2 && (
                       pendingChanges.map((result, index) => (
                        <UserDataRow deleter={removePendingChange} index={index} email={result?.email} userUID={result.id} name={result.firstName + " " + result.lastName} clan={result.clan} location={result.city} photo={result.photo} date={result?.lastUpdated}  userId="123" type={"change"}/>
                        ))
                    )}
                    {tabState == 3 && (
                        searchResults.map((result, index) => (
                        <UserDataRow deleter={removeSearchResult} index={index} email={result?.email} userUID={result.id} name={result.firstName + " " + result.lastName} clan={result.clan} location={result.city} photo={result.photo} date={result?.lastUpdated} userId="123" type={"search"}/>
                        ))
                    )}

                    
                    
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}
