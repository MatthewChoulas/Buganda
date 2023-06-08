import React from 'react'
import {useState, useEffect} from 'react'
import { useAuth } from '../contexts/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import GenericTextInput from '../components/GenericTextInput'
import DropDownSelect from '../components/DropDownSelect'
import GenericRadioInput from '../components/GenericRadioInput'
import UserProfile from '../components/UserProfile'

export default function Search() {

    const { currentUser } = useAuth()

    //Search field states
    const [minSearchDepth, setMinSearchDepth] = useState("")
    const [maxSearchDepth, setMaxSearchDepth] =  useState("")
    const [searchKeyword, setSearchKeyword] = useState("")
    const [genderFilter, setGenderFilter] = useState("")
    const [clanFilter, setClanFilter] = useState("")
    const [sortingValue, setSortingValue] = useState("")

    const [profiles, setProfiles] = useState([])

    async function handleSearch() {
        await fetch("/api/search", {
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                currentUser: currentUser.uid,
                filters: {
                    minDepth: minSearchDepth,
                    maxDepth: maxSearchDepth,
                    keyword: searchKeyword,
                    gender: genderFilter,
                    clan: clanFilter,
                },
                sorting: sortingValue
            })
        }).then(response => response.json())
        .then(data => setProfiles(data))
    }

    console.log(profiles)


    return (
        <div> 
            <div className="w-screen w-max-screen overflow-auto min-h-screen flex flex-col">
                <Navbar></Navbar> 
                <div className=" flex flex-col items-center justify-center px-6 py-8 mx-auto w-full">
                    <h1 className="my-4 text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                        Geneology Search
                    </h1>

                    <div className="flex gap-4">
                        <div className="mt-8 py-3 bg-gray-50 rounded-lg border border-gray-300 px-3 max-w-[10rem] w-[12rem]">
                            <GenericRadioInput label="Sort By:" defaultValue="Min Depth" id="sortingRadioSelect" options={["Min Depth", "Max Depth", "Clan"]} setValue={setSortingValue}></GenericRadioInput>
                        </div>

                        <div className="mt-8 py-3 bg-gray-50 rounded-lg border border-gray-300 px-3 w-[38rem]">
                            <div className="inline flex space-x-3">
                                <div className="w-2/6">
                                    <GenericTextInput label="Keyword" defaultValue="" setValue={setSearchKeyword}/>
                                </div>
                                <div className="w-1/6">
                                    <GenericTextInput label="Min Depth" defaultValue={"0"} setValue={setMinSearchDepth} numberInput={true}/>
                                </div>
                                <div className="w-1/6">
                                    <GenericTextInput label="Max Depth" defaultValue={"1000"} setValue={setMaxSearchDepth} numberInput={true}/>
                                </div>
                                <div className="w-1/6">
                                    <DropDownSelect label="Gender" defaultValue="All" options={["All", "Male", "Female"]} setValue={setGenderFilter}/>
                                </div>
                                <div className="w-1/6">
                                    <DropDownSelect label="Clan" defaultValue="All" options={["All", "Njovu"]} setValue={setClanFilter}/>
                                </div>
                            </div>
                            
                            <button onClick={handleSearch} className="mt-4 w-full text-white bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Search</button>
                        
                        </div>
                    </div>
                    <span className=" mt-8 h-0.5 w-full bg-gray-300 lg:w-[75vw]"></span>
                    <div className="flex flex-col gap-4 ">
                        {profiles.map((person) => 
                            <UserProfile name={person.firstName + " " + person.lastName} location={person.city} phoneNumber={person.phoneNumber} gender={person.gender} clan={person.clan} depth={person.depth} age={person.age} description={person.description} photo={person.photo} ></UserProfile>
                            )}
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}
