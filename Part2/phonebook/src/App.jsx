import { useState, useEffect } from 'react'
import PersonDisplay from './components/PersonDisplay'
import Filter from './components/Filter'
import NameForm from './components/NameForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filterName, setFilterName] = useState('')
  const [addedMessage, setAddedMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })    
  },[]) 

  const addPerson = (event) => { 
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber, 
    }
    console.log(personObject)

    const namesArray = persons.map(person => person.name)
    if (namesArray.includes(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const currentPerson = persons.find(p => p.name === personObject.name)
        const updatedPerson = {...currentPerson, number: personObject.number}
        
        personService
        .update(updatedPerson.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== updatedPerson.id ? p : returnedPerson))
          setNewName('')
          setNewNumber('')
          setAddedMessage(`${updatedPerson.name} phone number updated`)
          setTimeout(() => {setAddedMessage(null)},5000) // setting timout after updating state
        })
        .catch(error => {
          setErrorMessage(
            `Information of '${personObject.name}' has already been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          },5000)
          setPersons(persons.filter(p => p.name !== personObject.name))
        })

        return
      }
      
      
      

      
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setAddedMessage(`${returnedPerson.name} added`)
        setNewName('')
        setNewNumber('')
        setTimeout(() => {setAddedMessage(null)},5000)
      })
      .catch(error => {
        console.log("caught the error")
        console.log(error.response.data)
        console.log('data:')
        console.log(error.response.data.error)
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        },5000)
      })
  }

  const deletePersonOf = id => {
    
    if (window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
      console.log('delete confirmed')
      
      personService
        .deletePerson(id)
        .then (
        setPersons(persons.filter(person => person.id !== id))
        )
    }
    else {
      console.log('delete cancelled')
    }
    
    
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilterName(event.target.value)
    if (event.target.value == '') { setShowAll(true) }
    else { setShowAll(false) }
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(persons => (persons.name.toLowerCase().startsWith(filterName.toLowerCase())))


  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorNote message={errorMessage}/>
      <Notification message={addedMessage}/>
      <Filter filterName={filterName} handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <NameForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
       <PersonDisplay 
        personstoShow={personsToShow}
        deletePersonOf = {deletePersonOf}
        />
    </div>
  )
}

const ErrorNote = ({message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

export default App