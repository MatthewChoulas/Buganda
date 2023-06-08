import React from "react"
import { useState, useEffect } from "react"
import "./components.css"

export default function ToggleSelect({label, defaultValue, setValue}) {
    const [toggleState, setToggleState] = useState(false)

    function handleUpdate(event) {
        setToggleState(event.target.checked)
        setValue(event.target.checked)
    }

    //update default values
    //has to use a hook if the default value is coming from unloaded user data
    useEffect(() => {
        setToggleState(defaultValue)
        setValue(defaultValue)
    }, [defaultValue])


    return (
		<div className=" flex flex-col">
			<p className="inline-block mb-5 text-sm font-medium text-gray-900 dark:text-white">{label}</p>
			
            <label className="switch">
                <input checked={toggleState} type="checkbox" onChange={handleUpdate}/>
                <span className="slider round"></span>
            </label>
            
		</div>
  	)
}