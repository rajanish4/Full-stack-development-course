import { useState, useEffect } from 'react'
import noteService from './services/notes'
//import { Display, Filter, PersonForm, Persons } from './components/Displays'
//import { Notification, ErrorNotification } from './components/Notification'
import Displays from './components/Displays'
import Notifs from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [addedMessage, setAddedMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const hook = () => {
    noteService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  }
  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    const i = persons.findIndex(p => p.name === newName)
    if (i > -1) {
      console.log('entry exists at index', i)
      const person = persons[i]
      const id = person.id
      console.log(`person is ${person.name}, id is ${id}`)
      if (window.confirm(`${person.name} already added to the phonebook, replace the old number with the new one?`)){
        const changedPerson = { ...person, number: newNumber }
        noteService
        .update(id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          setAddedMessage(
            `Changed number of ${returnedPerson.name} `
          )
          setTimeout(() => {
            setAddedMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log('failed')
          setErrorMessage(`Information of ${changedPerson.name} has already been removed from the server.`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== id))
        })
      }
    }
    else{
      const personObject = {
        name: newName, number: newNumber//, id:persons.length + 1
      }
    noteService
    .create(personObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
      setAddedMessage(
        `Added ${returnedPerson.name} `
      )
      setTimeout(() => {
        setAddedMessage(null)
      }, 5000)
    })
    }
  }
  const deletePerson = id => {
    //const note = notes.find(n => n.id === id)
    //const changedNote = { ...note, important: !note.important }
    const delPerson = persons.filter(p => p.id === id)
    if (window.confirm(`Delete ${delPerson[0].name} ?`)){
      noteService.remove(id)
      setPersons(persons.filter(p => p.id !== id))
    }
      // .catch(error => {
      //   alert(
      //     `the person id '${persons.id}' was already deleted from server`
      //   )
      //   setPersons(persons.filter(p => p.id !== id))
      // })
  }
  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handlePersonChangeNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handlePersonFilter = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notifs.Notification message={addedMessage} />
      <Notifs.ErrorNotification error={errorMessage} />
      <Displays.Filter newFilter={newFilter} 
      handlePersonFilter={handlePersonFilter}/>
      <Displays.PersonForm addPerson={addPerson} newName={newName}
      handlePersonChange={handlePersonChange} newNumber={newNumber}
      handlePersonChangeNumber={handlePersonChangeNumber}/>
      <h2>Numbers</h2>
      <Displays.Persons persons={persons} newFilter={newFilter} deletePerson={deletePerson} /> 
    </div>
  )
}

export default App