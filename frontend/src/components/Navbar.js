import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/Auth.Context'

export const Navbar = () => {

    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (
        <nav>
            <div className="nav-wrapper blue darken-1">
                <span href="/" className="brand-logo">Web App</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create">Create Page</NavLink></li>
                    <li><NavLink to="/orders">Orders Page</NavLink></li>
                    <li><NavLink to="/links">Links Page</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Log out</a></li>
                </ul>
            </div>
        </nav>
        
    )
}