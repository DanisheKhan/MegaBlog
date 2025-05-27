import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate("/login")
        } else if (!authentication && authStatus !== authentication) {
            navigate("/")
        }

        // Small delay for smooth transition
        setTimeout(() => {
            setLoader(false)
        }, 500)
    }, [authStatus, navigate, authentication])

    if (loader) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <div className="glass-container bg-[#182234]/60 p-6 rounded-xl border border-blue-900/30 shadow-xl backdrop-blur-lg">
                    <Loader type="spinner" text="Verifying authentication..." />
                </div>
            </div>
        )
    }

    return <>{children}</>
}

