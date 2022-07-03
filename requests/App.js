import { useState, useEffect } from 'react'

import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

useEffect(() => {
       axios
         .get('http://localhost:3001/api/notes')
         .then(res => {
           setNotes(res.data)
         })
     }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length + 1,
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>   
      <ul>
        {notesToShow.map(note => 
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App

// import { useState, useEffect } from 'react';
// import Filter from './components/Filter.js'
// import noteService from './services/Persons.js'
// import AddPerson from './components/AddPerson.js';
// import PhoneBook from './components/PhoneBook.js';
// import Notification from './components/Notification.js';
// import './index.css'


// const App = () => {
//   const [persons, setPersons] = useState([])
//   const [newName, setNewName] = useState('')
//   const [newNumber, setNewNumber] = useState('')
//   const [newFilter, setNewFilter] = useState('')
//   const [messageDetails, setMessage] = useState({})

//   // useEffect(() => {
//   //   noteService
//   //       .getAll()
//   //       .then(response => {
//   //         setPersons(response)
//   //     })
// 	//  }, [])
//   useEffect(() => {
//     axios
//       .get('http://localhost:3001/api/persons')
//       .then(res => {
//         setPersons(res.data)
//       })
//   }, [])
   
// 	const resetNotification = () => {
// 		setTimeout(() => {
// 			setMessage({})
// 		}, 3000)
// 	};

// 	const filteredPerson = !newFilter
// 	   ? persons
// 	   : persons.filter((person) =>
// 	   person.name.toLowerCase().includes(newFilter.toLowerCase()))
   
// const addName = (event) => {
//   event.preventDefault()
  
//   const newPerson = {
//     name: newName,
//     number: newNumber
//   }
  
//   const isFound = (persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase())) 
  
//   if (isFound){
//     let res = window.confirm(`${newName} already exists. To update a new number, click to confirm.`)
//     if (res) {
//       noteService
//         .update(isFound.id, newPerson)
//         .then(updatedPerson => {
//           setPersons(persons.map(person => person.id ? person : updatedPerson))
//           setMessage(
//             {message:`Successfully updated ${newName}'s number!`,
//             type: "success"})
//           resetNotification()
//           setNewNumber('')
//           setNewName('')
//         })
//     } else {
//       setPersons(persons)
//       setNewName('')
//       setNewNumber('')
//     }
//   } else {
//     noteService
//       .create(newPerson)
//       .then(newbie => {
//         setPersons(persons.concat(newbie))
//         setMessage({
//           message:`Successfully added ${newName} to the PhoneBook!`,
//           type: "success"})
//         })
//         resetNotification()
//         setNewName('')
//         setNewNumber('')
//   }
// }

// const updateNumber = (id, newObject) => {
//   noteService
//     .update(id, newObject)
//     .then(updatedPerson => {
//       setPersons(persons.map(person => person.id ? person : updatedPerson))
//       setNewNumber('')
//       setNewName('')
//       })
//   }
  
// const removePerson = id => {
//   noteService
//     .remove(id)
//     .then(removedPerson => {
//       setPersons(persons);
//       setMessage(
//         {message:`Successfully REMOVED!`,
//         type: "success"})
//         resetNotification()
//         setNewNumber('')
//         setNewName('')
//     })
//     .catch(event => {
//       setMessage(
//         {message:`the person was already deleted from server`,
//         type: "error"})
//         resetNotification()
//         setNewNumber('')
//         setNewName('')
//     })
// }
  
//   const handleNameChange = (event) => {
//     setNewName(event.target.value)
//   };
  
//   const handleNumberChange = (event) => {
//     setNewNumber(event.target.value)
//   };
  
//   const handleFilter = (event) => {
//     setNewFilter(event.target.value)
//   };

  
//   return (
//     <>
//       <h2>Phonebook</h2>
//         <div>
//          <Filter newFilter={newFilter} handleFilter={handleFilter} />
//         </div>

//       <h2>Add a new</h2>
//         <AddPerson 
//           addName={addName} 
//           newName={newName} 
//           newNumber={newNumber}
//           handleNameChange={handleNameChange} 
//           handleNumberChange={handleNumberChange} 
//           persons={persons} 
//         />
//       <br></br>
//         <Notification 
//           message={messageDetails.message}
//           type={messageDetails.type}/>
//         <PhoneBook 
//           persons={filteredPerson}
//           remove={removePerson}
//           update={updateNumber} />
//     </>
//   );
// };
// export default App
