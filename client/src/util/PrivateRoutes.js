import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export function PrivateRoutes( {component: Component, ...rest}) {
    const { currentUser } = useAuth()

    return (
        currentUser ? <Outlet/> : <Navigate to="/login"/>
    )
}