import React, { useState } from 'react'

export default function SearchBar({ onSearch }){
  const [q, setQ] = useState('')

  function submit(e){
    e.preventDefault()
    if(!q) return
    onSearch(q)
    setQ('')
  }

  return (
    <form onSubmit={submit} className="flex gap-3">
      <input
        value={q}
        onChange={e=>setQ(e.target.value)}
        placeholder="Search city e.g. New York"
        className="flex-1 px-4 py-2 card"
      />
      <button className="px-4 py-2 card" type="submit">Search</button>
    </form>
  )
}
