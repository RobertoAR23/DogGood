import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getDogsForName } from '../../actions/index'
import './SearchBar.css'

export default function SearchBar({ currentPage, setCurrentPage }) {
  const dispatch = useDispatch()
  const [name, setName] = useState("")

  function handleInputChange(e) {
    e.preventDefault()
    setName(e.target.value)
  }
  
  function handleSubmit(e) {
    e.preventDefault()
    if (!name) {
      alert("Please, enter a name")
    } else {
      dispatch(getDogsForName(name, 1)) // pasa la página 1 como segundo argumento
      setName("")
      setCurrentPage(1) // actualiza la página actual en el componente padre
    }
  }

  return (
    <div className="search-bar">
      <input type="text" placeholder="Search..." value={name} onChange={handleInputChange} />
      <button id="search-btn" type="submit" onClick={handleSubmit}>Search</button>
    </div>
  )
}
