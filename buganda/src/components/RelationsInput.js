import React from 'react'
import { useState , useEffect} from 'react'
import GenericTextInput from './GenericTextInput'
import DropDownSelect from './DropDownSelect'
import RelationDisplay from './RelationDisplay'

export default function({defaultValues, setValue}) {
    //stores list of objects where each object has the necessary properperties for a relation: firstName, LastName, relationType, and highlight
    const [relations, setRelations] = useState([])

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [relationType, setRelationType] = useState('')

    useEffect(() => {
        setValue(relations)
    }
    , [relations])

    //update default values
    //has to use a hook if the default value is coming from unloaded user data
    useEffect(() => {
        if (defaultValues) {
            setRelations(defaultValues)
            setValue(defaultValues)
        }
    }, [defaultValues])

    //appends a new relation to the relations state if the user has entered a first and last Name
    function addRelation() {
        let newElement = {
            firstName: firstName,
            lastName: lastName,
            relationType: relationType,
            highlight: false
            }
        
        if (firstName != "" && lastName != "" && !((relations.map((element) => JSON.stringify(element))).includes(JSON.stringify(newElement)))) {
            setRelations(prevArray => [...prevArray, newElement])
        }
    }

    //removes a given relation at the specified index
    function removeRelation(index) {
        setRelations(prevArray => prevArray.slice(0, index).concat(prevArray.splice(index+1)))
    }

    //used to ensure all relations are diplayed with the same case
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }


    return (
        <div className="py-3 bg-gray-50 rounded-lg border border-gray-300 px-3">
            <div className="inline flex space-x-3">
                <div>
                    <GenericTextInput label="First Name" defaultValue="" setValue={setFirstName}/>
                </div>
                <div>
                    <GenericTextInput label="Last Name" defaultValue="" setValue={setLastName}/>
                </div>
                <div className="w-2/5">
                    <DropDownSelect label="Relation" defaultValue="Parent" options={["Parent", "GrandParent", "Aunt/Uncle", "Cousin", "Sibling"]} setValue={setRelationType}/>
                </div>
            </div>
            
            <button onClick={addRelation} className="mt-4 w-full text-white bg-gray-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Add</button>
            
            <label className="block font-bold mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white">Relatives</label>
            
            <div className="pl-2">
                {relations.map((relation, i) => (
                    <RelationDisplay index={i} name={capitalize(relation.firstName) + " " + capitalize(relation.lastName)} relationType={relation.relationType} highlight={relation.highlight} deleter={removeRelation}/>
                ))}
            </div>
        </div>
    )

}