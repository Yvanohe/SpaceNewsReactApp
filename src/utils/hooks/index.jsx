import { useState, useEffect } from 'react'

export function useFetch(url) {
    const [data, setData] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState([false, "no error"]);

    useEffect(() => {
        if (!url) {
            setLoading(false)
            return
        }
        setLoading(true)
        async function fetchData() {
            try {
                const response = await fetch(url)
                const data = await response.json()
                setData(data)
            } catch (err) {
                setError([true, err.toString()])
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [url])
    return { isLoading, data, error }
}


