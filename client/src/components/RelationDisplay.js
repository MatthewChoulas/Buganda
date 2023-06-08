import React from 'react'
import { useState } from 'react'

export default function DropDown({index, name, relationType, highlight, deleter}) {
    const highlightColor = highlight ? "bg-green-400" : "bg-gray-400"
    const [deleteActive, setDeleteActive] = useState(false)
    const [deleteColor, setDeleteColor] = useState("currentColor")

    return (
        <div onMouseEnter={()=> setDeleteActive(true)} onMouseLeave={()=> setDeleteActive(false)} class="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-1 my-1">
            {deleteActive && <svg onClick={()=> deleter(index)} onMouseEnter={()=> setDeleteColor("#1D4ED8")} onMouseLeave={()=> setDeleteColor("currentColor")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={deleteColor} className="w-6 h-6 text-black-900 hover:text-blue-400" >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>}
            {!deleteActive && <span class={`${highlightColor} h-2 w-2 m-2 rounded-full`}></span>}
            <div class="flex-grow font-sm px-4">{name}</div>
            <div class={`text-sm ${deleteActive ? "text-blue-400" : "text-gray-400"} font-normal tracking-wide`}>{relationType}</div>
        </div>
    )
}