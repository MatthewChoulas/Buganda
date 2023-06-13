import React from "react"
import {useState} from "react"

export default function KingProfile(props) {
    const {photo, year, name, description} = props
    const [hoverState, setHoverState] = useState(false)

    const [dropDownOpen, setDropDownOpen] = useState(false)

    return (
    <div>
        {(!hoverState) && <div className="self-center md:w-[18rem] flex rounded-xl bg-white shadow-lg overflow-hidden" onMouseEnter={()=>setHoverState(true)} onMouseLeave={()=>setHoverState(false)}>
            <div className="flex flex-col" >
                <img className="md:h-[23rem]" src={photo}></img>
                <div className="mx-6">
                    <p className="mb-3 mt-6 text-sm text-gray-500">{year} </p>
                    <div className="flex gap-3 mb-6">
                        <p className="text-lg font-semibold relative">{name} 
                            <span className={`text-2xl font-semibold absolute ${dropDownOpen ? "-top-2.5 -right-6" : "-right-4 -top-0.5 -rotate-90" }`}>⌄</span>
                        </p>
                        
                    </div>
                    {dropDownOpen && <p className="ml-2 mb-6 -mt-3 text-sm">{description}</p>}
                </div>
            </div>
        </div>}

        {hoverState && <div className="self-center md:w-[18rem] flex rounded-xl -translate-y-1 -translate-x-1 bg-white shadow-2xl overflow-hidden" onMouseEnter={()=>setHoverState(true)} onMouseLeave={()=>setHoverState(false)}>
            <div className="flex flex-col" >
                <img className="md:h-[23rem]" src={photo}></img>
                <div className=" mx-6">
                    <p className="mb-3 mt-6 text-sm text-gray-500">{year}</p>
                <div className="flex gap-3 cursor-pointer mb-6" onClick={()=>setDropDownOpen(!dropDownOpen)}>
                    <p className="text-lg font-semibold relative text-amber-500">{name}
                    <span className={`text-2xl font-semibold absolute ${dropDownOpen ? "-top-2.5 -right-6" : "-right-4 -top-0.5 -rotate-90" }`}>⌄</span>
                    </p>
                </div>
                {dropDownOpen && <p className="ml-2 mb-6 -mt-3 text-sm">{description}</p>}
                </div>
            </div>
        </div>}
    </div>
    )
}