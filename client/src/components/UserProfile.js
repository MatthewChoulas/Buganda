import React from "react"
import { useState, useEffect } from "react"

export default function UserProfile({name, location, phoneNumber, gender, age, depth, clan, description, photo}) {
    console.log(depth)
    return (
		<div className="flex w-screen items-center justify-center m-4 mt-8">
            <div className="w-[22rem] md:w-[36rem] flex rounded-xl shadow-2xl shadow-blue-200 bg-gray-50 overflow-hidden">
                    <div className="flex flex-col bg-blue-600 w-[5rem] md:w-[12rem] py-6 items-center" >
                        <p className="text-white text-center  pb-4 text-base md:text-lg">{name}</p>
                        <img className="md:h-24 md:w-24 h-16 w-16 rounded-full" src={photo} alt=""/>
                    </div>
                    <div className="flex flex-col bg-gray-100 w-[17rem] md:w-[24rem] pl-4 md:pl-8 text-sm md:text-base">
                        <div className="grid gap-y-3 gap-x-8 pt-4 grid-cols-4 mb-1">
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

                        <div className="pt-2">
                            <span className="font-semibold pr-3">Personal Description: </span>
                            <span className="">{description}</span>
                        </div>
                </div>
            </div>
</div>
  	)
}