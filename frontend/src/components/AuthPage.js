import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/Auth.Context'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const { loading, request, error, clearError } = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    //название любое
    //попробовать добавить зависимость в юзЭффект на изменение form, и вывести в консоль console.log(form). просто посмотреть как работает
    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form })
            message(data.message)
        } catch (e) {

        }
    }
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form })
            //message(data.message)
            auth.login(data.token, data.userId)
        } catch (e) {

        }
    }


    return (
        <div>
            <div>
                <h1> Auth page </h1>
            </div>
            <div className="row">
                <div className="col s6 offset-s3">
                    <div className="card blue darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Autorization</span>
                            <div>
                                <div className="input-field">
                                    <input
                                        placeholder="Email"
                                        id="email"
                                        type="text"
                                        name="email"
                                        value={form.email}
                                        onChange={changeHandler} />
                                </div>
                                <div className="input-field">
                                    <input
                                        placeholder="Password"
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={form.password}
                                        onChange={changeHandler} />

                                </div>
                            </div>
                        </div>
                        <div className="card-action">
                            <button className="btn yellow darken-4 mr10" onClick={loginHandler} disabled={loading}>Log in</button>
                            <button className="btn light-green accent-3 mr10" onClick={registerHandler} disabled={loading}>Registration</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )

}