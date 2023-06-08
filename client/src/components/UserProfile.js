import React from "react"
import { useState, useEffect } from "react"

export default function UserProfile({name, location, phoneNumber, gender, age, depth, clan, description, photo}) {

    return (
		<div class="flex w-screen items-center justify-center m-4 mt-8">
            <div class="w-[36rem] flex rounded-xl shadow-2xl shadow-blue-200 bg-gray-50 overflow-hidden">
                <div class="flex flex-col bg-blue-600 w-[12rem] py-6 items-center" >
                    <p className="text-white pb-4 text-lg">{name}</p>
                    <img class="h-24 w-24 rounded-full" src={photo} alt=""/>
                    
                    <p className="text-white pt-4">{clan}</p>
                </div>
                <div className="flex flex-col bg-gray-100 w-[24rem] pt-2 pl-8">
                    <div className="grid gap-3 pt-4 grid-cols-4 mb-1">
                        <span className="font-semibold">Gender: </span>
                        <span className="">{gender}</span>
                        <span className="pl-7 font-semibold">Age: </span>
                        <span className="">{age}</span>
                        
                        <span className="font-semibold">Location: </span>
                        <span className="">{location}</span>
                        <span className="pl-7 font-semibold">Depth: </span>
                        <span className="">{depth}</span>

                        <span className="font-semibold">Phone: </span>
                        <span className="">{phoneNumber}</span>
                        <span className="pl-7 font-semibold">Clan: </span>
                        <span className="">{clan }</span>
                    </div>

                    <div className="pt-3">
                        <span className="font-semibold pr-3">Personal Description: </span>
                        <span className="">{description}</span>
                    </div>
                </div>
            </div>
</div>
  	)
}