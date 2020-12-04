import { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import axios from 'axios'

export default function BookDetail ({ auth }) {
  const { id } = useParams()
  const [book, setBook] = useState({})
  const [deleted, setDeleted] = useState(false)
  const [edit, setEdit] = useState(false)
  const [addNote, setAddNote] = useState(false)

  useEffect(() => {
    axios.get('https://books-api.glitch.me/api/books/' + id, {
      auth: auth
    })
      .then(response => {
        setBook(response.data.book)
      })
  }, [auth, id])

  function deleteBook () {
    axios.delete('https://books-api.glitch.me/api/books/' + id, {
      auth: auth
    })
      .then(response => {
        setDeleted(true)
      })
  }

  function editBook () {
    setEdit(true)
  }

  function newNote () {
    setAddNote(true)
  }

  const notes = book.notes

  if (!auth) {
    return <Redirect to='/login' />
  }

  if (deleted) {
    return <Redirect to='/' />
  }

  if (edit) {
    return <Redirect to={'/edit/' + book._id} />
  }

  if (addNote) {
    return <Redirect to={'/note/' + book._id + '/add'} />
  }

  return (
    <div>
      <h1 className='mh2 mv4'>Expanded Info for <span className='underline'>{book.title}</span></h1>
      <div className='pa3 mh2 mv4 detail'>
        <h2>Authored by: {book.authors}</h2>
        <h2>Added to {book.status} at {book.updated}</h2>
      </div>
      <div className='notes mh2 mv4'>
        <h2 className='mh3'>Notes taken on <span className='underline'>{book.title}</span>
        </h2>
        <div>
          {notes && notes.map((note, index) => (
            <div key={index}>
              <ul>
                <li>
                  <h3 className='ma2'>{note.note} - Page {note.page}</h3>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className='mh1'>
        <button className='mh2' onClick={editBook}>Edit this book</button>
        <button className='mh2' onClick={deleteBook}>Delete this book</button>
        <button className='mh2' onClick={newNote}>Add a note to this book</button>
      </div>
    </div>

  )
}
