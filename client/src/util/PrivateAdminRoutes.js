import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export function PrivateAdminRoutes( {component: Component, ...rest}) {
    const { currentUser } = useAuth()

    return (
        currentUser.admin ? <Outlet/> : <Navigate to="/"/>
    )
}