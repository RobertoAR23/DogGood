import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getDogsForName } from '../../actions/index'
import './SearchBar.css'

export default function SearchBar() {
  const dispatch = useDispatch()
  const [name, setName] = useState("")

  function handleInputChange(e) {
    e.preventDefault()
    setName(e.target.value)
    // console.log(name)
  }
  
  function handleSubmit(e) {
    e.preventDefault()
    if (!name) {
      alert("No ha escrito nada")
    } else {
      dispatch(getDogsForName(name))
      setName("")
    }
  }
  

  return (
    <div className="search-bar">
      <input type="text" placeholder="Search..." value={name} onChange={(e) => handleInputChange(e)} />
      <button id="search-btn" type="submit" onClick={(e) => handleSubmit(e)}>Search</button> {/* Agregar el identificador id="search-btn" */}
    </div>
  )
}
