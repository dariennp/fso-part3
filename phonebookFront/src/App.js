import { useState, useEffect } from 'react'
import ShowPerson from './ShowPerson'
import PersonForm from './PersonForm'
import Filter from './Filter'
import Notification from './Notification'
import personService from './services/persondb'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter]= useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const addPersons = () => {
 
    personService
    .getAll()
    .then(initialPeople => {

      setPersons(initialPeople)
  
    })
  }

  useEffect(addPersons,[])

  let personsToShow=persons.filter(person => person.name.toLowerCase().includes(newFilter))
  

  const addName = (event) => {
    event.preventDefault()
    

    const found = persons.find(person => person.name === newName)

    if (found)
    {
      const con = window.confirm(`${newName} has already been added,replace the current number with a new one?`)

      if (con)
      {
        const updatedPerson = {...found,number: newNumber}

        personService
        .update(updatedPerson)
        .then(newEntry => {
          setPersons(persons.map(person => person.id === found.id ? updatedPerson : person ))
          setNewName('')
          setNewNumber('')
        })
      }

    }
    else
    {
      const newPerson = {
        name: newName,
        number: newNumber,
      }

      personService
      .create(newPerson)
      .then(newEntry => {
        setPersons(persons.concat(newEntry))
        setErrorMessage(`${newPerson.name} has been added`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
        
      })
      
    }

  }

  const removePerson = (id,name) => {
    const r = window.confirm(`Delete ${name } ?`)
    if (r)
    {
      personService.remove(id)
      .catch(error => {
        setErrorMessage(`${name} has already been removed from the server`)
      })
      setPersons(persons.filter(p => p.id !== id))
    }
  }
  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification className="error" message={errorMessage}/>
      <Filter newFilter={newFilter} handleFilter={handleFilter} />
      
      <h2> Add new person </h2>
      <PersonForm addName={addName} newName={newName} handleName={handleName} newNumber={newNumber} handleNumber={handleNumber} />

      <h2>Numbers</h2>
      <ShowPerson personsToShow={personsToShow} removePerson={removePerson}/>
      
    </div>
  )
}

export default App