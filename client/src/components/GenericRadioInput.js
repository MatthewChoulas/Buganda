import React from 'react'
import { useState, useEffect} from 'react'

export default function GenericTextInput({label, id, defaultValue, options, setValue}) {
    const [radioValue, setRadioValue] = useState()
    function handleUpdate(e) {
        var value = ""

        //get all radio buttons in the given component
        const selects = document.getElementsByClassName("radio " + id)

        //find the value of the one which is checked
        for (const select of selects) {
            if (select.checked) {
                value = select.value
            }
        }

        setValue(value)
        setRadioValue(value)
    } 

    //update default values
    //has to use a hook if the default value is coming from unloaded user data
    useEffect(() => {
        setRadioValue(defaultValue)
        setValue(defaultValue)
    }, [defaultValue])

    return (

        <div className="">
			<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
			<form onChange={handleUpdate}>
                <div className="flex flex-wrap">
                    <div className="w-full px-1 flex flex-col">
                        { options.map (option => (
                            <div className="mb-2 mr-4 inline">
                                <input type="radio" id={option} name="Selection" value={option} checked={option==radioValue} className={`radio ${id}`}/>
                                <p className="ml-3 inline">{option}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </form>
		</div>
    )
}