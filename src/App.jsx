import { useEffect, useState } from "react";
import LoginForm from "./App/LoginForm";
import Site from "./App/Site";
import './index.css'

export function App() {
    const [user, setUser] = useState(null)
    useEffect(() => {
        const user = localStorage.getItem('userId')
        if (user) {
            setUser(JSON.parse(user))
        }
    }, [])
    return (
        user ? <Site /> : <LoginForm onConnect={setUser} />
    )
}