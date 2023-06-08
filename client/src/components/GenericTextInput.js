import React from 'react'
import { useState, useEffect} from 'react'

export default function GenericTextInput({label, defaultValue, placeHolder, setValue, numberInput=false, displayRequired=false}) {
    const [textValue, setTextValue] = useState()
    function handleUpdate(e) {
        const numVal =  Number(e.target.value)

        //if the input is for numbers the the value is only updated if the user entered a positive integer
        if (numberInput) {
            if (Number.isInteger(numVal) && numVal >= 0) {
                setValue(e.target.value)
                setTextValue(e.target.value)
            }
        } else {
            setValue(e.target.value)
            setTextValue(e.target.value)
        }
        
    } 

    //update default values
    //has to use a hook if the default value is coming from unloaded user data
    useEffect (() => {
        setTextValue(defaultValue)
        setValue(defaultValue)
    }
    , [defaultValue])


    return (

        <div>  
            <div>
                <label className="inline-block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
                {displayRequired && <span className="ml-1 text-red-500">*</span>}
            </div>
            <input value={textValue} onChange={handleUpdate} className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeHolder} required=""></input>
        </div>
    )
}