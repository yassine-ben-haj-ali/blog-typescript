import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'


const Search = () => {
  const [search, setSearch] = useState('')
  const [blogs, setBlogs] = useState([])

  const { pathname } = useLocation()

  return (
    <div className="search w-100 position-relative me-4">
      <input type="text" className="form-control me-2 w-100"
      value={search} placeholder="Enter your search..."
      onChange={e => setSearch(e.target.value)}  />

      {
        search.length >= 2 &&
        <div className="position-absolute pt-2 px-1 w-100 rounded"
        style={{
          background: '#eee', zIndex: 10,
          maxHeight: 'calc(100vh - 100px)',
          overflow: 'auto'
        }}>
        </div>
      }
    </div>
  )
}

export default Search