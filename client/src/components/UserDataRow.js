import React from 'react'
import { useState } from 'react'

export default function UserDataRow({name, photo, clan, location, date, deleter, userId, dataChange}) {

    return (
        <div className="h-16 hover:bg-gray-100 w-full border-b-2 border-gray-200 pl-6 flex text-gray-500 text-sm items-center">
            <span class="w-1/4 font-semibold flex gap-6 items-center text-base">
                <img src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?cs=srgb&dl=pexels-mohamed-abdelghaffar-771742.jpg&fm=jpg" className="h-9 w-9 rounded-full"></img>
                <span>{name}</span>
            </span>
            <span class="w-1/6">{clan}</span>
            <span class="w-1/6">{location}</span>
            <span class="w-1/6">{date}</span>
            <span class="w-1/4 inline">

            <button type="button" class="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 mx-1 py-2.5 focus:outline-none">Remove</button>
            <button type="button" class="text-white bg-yellow-300 hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-100 font-medium rounded-lg text-sm px-4 mx-1 py-2.5 focus:outline-none">Edit</button>
            <button type="button" class="text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 mx-1 py-2.5 focus:outline-none">Aprove</button>
        
            </span>
        </div>
    )
}