import { useCallback, useState } from 'react'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            //узнать про метод fetch
            const response = await fetch(url, { method, body, headers })
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Error http.hook, 14 string')
            }

            setLoading(false)

            return data
        } catch (e) {
            //console.log("Error2", e.message)
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = useCallback( () => setError(null), [])

    return { loading, request, error, clearError }
}
