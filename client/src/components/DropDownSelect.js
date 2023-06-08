import React from 'react'
import { useState, useEffect } from 'react'

export default function DropDown({label, defaultValue, options, setValue}) {
    const [selectValue, setSelectValue] = useState(defaultValue)
    function handleUpdate(e) {
        const value = e.target.options[e.target.selectedIndex].text
        setSelectValue(value)
        setValue(value)
    }

    //update default values
    //has to use a hook if the default value is coming from unloaded user data
    useEffect(() => {
        setSelectValue(defaultValue)
        setValue(defaultValue)
    }, [defaultValue])

    return (

        <div >
			<label className="inline-block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
			<select name="option" onChange={handleUpdate} value={selectValue} id="options" className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                { options.map (option => (
                    <option value={option}>{option}</option>
                ))}
            </select>
		</div>
    )
}