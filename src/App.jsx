import { useEffect, useState } from 'react'
import { Suggestions } from './components/suggestions'
import './App.css'

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);

  const handleChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearch(query)
    if (query.length > 1) {
      const filteredData = users && users.length
      ? users.filter((user) => user.toLowerCase().indexOf(query) > -1 )
      : []
      setFilteredResults(filteredData);
      setShowResults(true)
    } else {
      setShowResults(false)
    }
  }

  const fetchResults = async () => {
    try {
      const response = await fetch('https://dummyjson.com/users')
      const data = await response.json()

      if (data && data.users && data.users.length) {
        setUsers(data.users.map((user) => user.firstName))
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchResults()
  }, [])

  console.log(users, filteredResults)

  return (
    <>
      <div className="searchContainer">
        <h1>Search any user here</h1>
        <input
          value={search}
          name='searchUsers'
          onChange={handleChange}
        />
        {
          showResults && <Suggestions data={filteredResults} />
        }
      </div>
    </>
  )
}

export default App
