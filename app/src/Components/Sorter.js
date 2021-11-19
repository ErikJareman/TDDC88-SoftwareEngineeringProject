import React, { useState, useEffect } from 'react'

const movies = [
  {
    id: 1,
    name: 'Matrix',
    country: 9,
    collection: 300,
    releasedOn: 1999
  },
  {
    id: 2,
    name: 'Tere Nam',
    country: 3,
    collection: 101,
    releasedOn: 2004
  },
  {
    id: 3,
    name: 'Bahubali',
    country: 4,
    collection: 500,
    releasedOn: 1987
  }
]
let pdata

function App1 (props) {
  const [data, setData] = useState([])
  const [sortType, setSortType] = useState('name')
  pdata = props.patients

  useEffect(() => {
    const sortArray = type => {
      const types = pdata
      console.log(pdata)
      console.log(movies)
      const sortProperty = types[type]
      const sorted = [...pdata].sort((a, b) => b[sortProperty] - a[sortProperty])
      setData(sorted)
    }

    sortArray(sortType)
  }, [sortType])

  return (
    <div className="App">
      <select onChange={(e) => setSortType(e.target.value)}>
        <option value="Name">Country</option>
        <option value="collection">Collection</option>
        <option value="releasedOn">Release Date</option>
      </select>

      {data.map(movie => (
        <div key={movie.id} style={{ margin: '30px' }}>
          <div>{`Movie: ${movie.name}`}</div>
          <div>{`Country: ${movie.country}`}</div>
          <div>{`Collection: ${movie.collection}`}</div>
          <div>{`Year of Release: ${movie.releasedOn}`}</div>
        </div>
      ))}
    </div>
  )
}

export default App1
