import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/Auth.Context'
import { useHttp } from '../hooks/http.hook'
import { useHistory } from 'react-router-dom'

export const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const { request } = useHttp()
    const [link, setLink] = useState('')

    //не добавил useHistory 2.32.00

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const pressHandler = async event => {
        //console.log(auth.token)
        
        if (event.key === 'Enter') {
            //debugger
            try {
                const data = await request('/api/link/generate', 'POST', { from: link }, {
                    Authorization: `Bearer ${auth.token}`
                })
                console.log(data)
                history.push(`/detail/${data.link._id}`)
            }
            catch (e) {

            }
        }
    }

    return (
        <div className="">
            <div className="">
                {auth.token} {// для тесту убрать потом}
}
            </div>
            <div className="row">
                <div className="col s8 offset-s2 pd2r">
                    <div className="input-field">
                        <input
                            placeholder="Вставьте ссылку"
                            id="link"
                            type="text"
                            value={link}
                            onChange={e => setLink(e.target.value)}
                            onKeyPress={pressHandler}
                        />
                        <label htmlFor="link">Input заметку</label>
                    </div>
                </div>
            </div>
        </div>
    )

}