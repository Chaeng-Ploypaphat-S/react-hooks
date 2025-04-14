import { useEffect, useState } from 'react'
import axios from 'axios'

const useAPI = endpoint => {
    const [data, setData] = useState(null)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const response = await axios.get(endpoint)
            setData(response.data)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    return data
}

export default useAPI        