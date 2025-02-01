import React, { useState } from 'react'
import PropTypes, { instanceOf } from 'prop-types'
import { Alert } from '../ui/Alert'
import { ApiError, apiFetch } from '../utils/api'
import Button from '../ui/Button'

function LoginForm({ onConnect }) {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setLoading(true)
        const formData = new FormData(e.target)
        const data = {
            username: formData.get('username'),
            password: formData.get('password')
        }
        try {
            const response = await apiFetch('/login_check', {
                method: 'POST',
                body: JSON.stringify(data)
            })
            localStorage.setItem('token', response.token)
            localStorage.setItem('userId', response.user_id)
            onConnect(true)
        } catch (e) {
            if (e instanceof ApiError) {
                setError(e.errors)
            } else {
                console.error(e)
            }
            setLoading(false)
        }
    }

    return (
        <div className="container mt-4 vh-100 align-content-center">
            <div className="card w-50 shadow m-auto">
                <div className="card-body">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        {error && <Alert>{error}</Alert>}
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input id="username" className="form-control" required type="text" name="username" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input id="password" className="form-control" required type="password" name="password" />
                        </div>
                        <Button loading={loading} className={'mt-3'} type='submit'>Se Connecter</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

LoginForm.propTypes = {
    onConnect: PropTypes.func.isRequired
}

export default LoginForm