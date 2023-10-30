import { useEffect } from 'react'
import axios from 'axios'

const PageOne = () => {
    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const result = await axios.get('http://localhost:8800/books')
                console.log(result.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllBooks()
    }, [])
    

  return (
    <div>PageOne</div>
  )
}

export default PageOne