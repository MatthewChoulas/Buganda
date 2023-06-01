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

    const [minSearchDepth, setMinSearchDepth] = useState("")
    const [maxSearchDepth, setMaxSearchDepth] =  useState("")
    const [searchKeyword, setSearchKeyword] = useState("")
    const [genderFilter, setGenderFilter] = useState("")
    const [sortingValue, setSortingValue] = useState("")


    return (
        <div> 
            <div className="w-screen w-max-screen overflow-hidden h-screen max-h-screen flex flex-col">
                <Navbar></Navbar> 
                <div className=" flex flex-col items-center justify-center px-6 py-8 mx-auto">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Geneology Search
                    </h1>

                    <div className="flex gap-4">
                        <div className="mt-8 py-3 bg-gray-50 rounded-lg border border-gray-300 px-3 max-w-[10rem] w-[12rem]">
                            <GenericRadioInput label="Sort By:" defaultValue="Min Depth" id="sortingRadioSelect" options={["Min Depth", "Max Depth", "Age"]} setValue={setSortingValue}></GenericRadioInput>
                        </div>

                        <div className="mt-8 py-3 bg-gray-50 rounded-lg border border-gray-300 px-3">
                            <div className="inline flex space-x-3">
                                <div className="w-2/5">
                                    <GenericTextInput label="Keyword" defaultValue="" setValue={setSearchKeyword}/>
                                </div>
                                <div className="w-1/5">
                                    <GenericTextInput label="Min Depth" defaultValue={"0"} setValue={setMinSearchDepth} numberInput={true}/>
                                </div>
                                <div className="w-1/5">
                                    <GenericTextInput label="Max Depth" defaultValue={"1000"} setValue={setMaxSearchDepth} numberInput={true}/>
                                </div>
                                <div className="w-1/5">
                                    <DropDownSelect label="Gender" defaultValue="Any" options={["Any", "Male", "Female"]} setValue={setGenderFilter}/>
                                </div>
                            </div>
                            
                            <button className="mt-4 w-full text-white bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Search</button>
                        
                        </div>
                    </div>
                    <span class=" mt-3 h-0.5 w-full bg-gray-300 lg:w-[75vw]"></span>
                    <div>
                        <UserProfile name="Clark Destep" location="Poolesville" phoneNumber="3012493920" gender="Male" clan="Njovu" age="40" description="I like Computer Science and want to bring CS Education to Buganda." photo="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"></UserProfile>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}
