import React from 'react'
import { useState } from 'react'
import SettingsModal from './SettingsModal'
import app from '../util/firebase'

export default function UserDataRow({index, email, userUID, name, clan, location, date, deleter, type}) {

    const [settingsOpen, setSettingsOpen] = useState(false)
    const [approvalLoading, setApprovalLoading] = useState(false)
    const [removeLoading, setRemoveLoading] = useState(false)

    async function handleApprove() {
        setApprovalLoading(true)
        try {
            await fetch(`${process.env.REACT_APP_SERVER}/api/adminApproveData`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                body: JSON.stringify({currentUser: userUID})
        })
        } catch (e) {
            console.log(e)
        }

        
        setApprovalLoading(false)
        deleter(index)
    }

    async function handleRemove() {
        setRemoveLoading(true)
        try {
            await fetch(`${process.env.REACT_APP_SERVER}/api/adminRemoveRequest`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                body: JSON.stringify({currentUser: userUID})
        })
        } catch (e) {
            console.log(e)
        }

        
        setRemoveLoading(false)
        deleter(index)
    }

    async function handleDelete() {
        setRemoveLoading(true)
        try {
            await fetch(`${process.env.REACT_APP_SERVER}/api/adminDeleteData`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                body: JSON.stringify({currentUser: userUID})
        })
        } catch (e) {
            console.log(e)
        }

        
        setRemoveLoading(false)
        deleter(index)
    }

    return (
        <div className="h-16 hover:bg-gray-100 w-full border-b-2 border-gray-200 pl-6 flex text-gray-500 text-sm items-center">
            <span className="w-1/4 font-semibold flex gap-6 items-center text-base">
                <span>{name}</span>
            </span>
            <span className="w-1/6">{clan}</span>
            <span className="w-1/6">{location}</span>
            <span className="w-1/6">{date}</span>
            <span className="w-1/4 inline">

            <button type="button" onClick={type=="search" ? handleDelete : handleRemove} disabled={removeLoading} className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 mx-1 py-2.5 focus:outline-none">{type=="search" ? "Delete" : "Remove"}</button>
            <button type="button" onClick={()=> setSettingsOpen(true)} className="text-white bg-yellow-300 hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-100 font-medium rounded-lg text-sm px-4 mx-1 py-2.5 focus:outline-none">Edit</button>
            {type != "search" && <button type="button" onClick={handleApprove} disabled={approvalLoading} className="text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 mx-1 py-2.5 focus:outline-none">Aprove</button>}
        
            </span>

            {(userUID != null) && <SettingsModal userEmail={email} userUID={userUID} open={settingsOpen} closeFunc={()=> setSettingsOpen(false)} updateApproved={type=="search"}></SettingsModal>}
        </div>
    )
}