import React, { useState } from 'react'
import { Link } from 'react-router'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth } from './firebase'
import { useNavigate } from 'react-router'
import { googleProvider } from './firebase'

export const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const handleSignIn = async () => {
        if (!email || !password) {
            setError('Email and password cannot be empty.');
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/')
        } catch (error) {
            setError(`Error: ${error}`)
        }
    }

    const handleSignInWithGmail = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
            navigate('/')
        } catch (error) {
            setError(`Error: ${error}`)
        }
    }

    return (
        <div className="signin-signup-container">
            <h1>Sign In</h1>
            <input type="email" placeholder="email..." onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="password..." onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSignIn}>Sign In</button>
            <p>or</p> 
            <button onClick={handleSignInWithGmail}>Sign In with Gmail</button>
            {error && <p className="error">{error}</p>}
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
    )
}