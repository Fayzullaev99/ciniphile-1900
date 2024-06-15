import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

function useGetData(path,watch) {
  const [data,setData] = useState(null)
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState('')

  function getData() {
    setLoading(true)
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_DB_TOKEN}`
        }
      }
      fetch(`${import.meta.env.VITE_DB_URL}${path}?language=ru-RU`, options)
        .then(response => response.json())
        .then(response => {
            setData(response)
            setLoading(false)
        })
        .catch(err => {
            setError(err)
            setLoading(false)
        });
  }
  useEffect(()=>{
    getData()
  },[watch])
  return [data,loading,error]
}

export default useGetData