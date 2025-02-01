import React, { useEffect } from 'react'
import { apiFetch } from '../utils/api'

export const Admin = () => {
    useEffect(() => {
        const token = "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"
        
        const response = apiFetch()
    }, [])
    return (
        <div>Admin</div>
    )
}
