import React from 'react'
import { useState, useEffect} from 'react'

export default function GenericTextInput({defaultValue, placeHolder, setValue}) {
    const [textValue, setTextValue] = useState()
    function handleUpdate(e) {
            setValue(e.target.value)
            setTextValue(e.target.value)
        }

    //update default values
    //has to use a hook if the default value is coming from unloaded user data
    useEffect (() => {
        setTextValue(defaultValue)
        setValue(defaultValue)
    }
    , [defaultValue])


    return (

        <div className='mt-4 flex items-center border border-gray-200 rounded-lg w-96 overflow-hidden'>  
            <svg className='text-gray-400 pl-3 ' xmlns="http://www.w3.org/2000/svg" fill={"currentColor"} height="1em" viewBox="0 0 512 512"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/></svg>
            <input value={textValue} onChange={handleUpdate} className="placeholder-gray-400 outline-0 w-full text-gray-900 sm:text-sm  block p-2.5 dark:text-white" placeholder={placeHolder} required=""></input>
        </div>
    )
}