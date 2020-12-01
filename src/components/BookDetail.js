import { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import axios from 'axios'

export default function BookDetail ({ auth }) {
  const { id } = useParams()
  const [book, setBook] = useState({})
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    axios.get('https://books-api.glitch.me/api/books/', {
      auth: auth
    })
      .then(response => {
        const books = response.data.books
        setBook(books.find(book => book._id === id))
      })
  }, [auth])

  function deletePost () {
    axios.delete('https://books-api.glitch.me/api/books/' + id, {
      auth: auth
    })
      .then(response => {
        setDeleted(true)
      })
  }

  if (!auth) {
    return <Redirect to='/login' />
  }

  if (deleted) {
    return <Redirect to='/' />
  }

  return (
    <div>
      <h1>Expanded Info for <span className='underline'>{book.title}</span></h1>
      <h2>Authored by: {book.authors}</h2>
      <h2>Added to {book.status} at {book.updated}</h2>
      <h2>{book.notes}</h2>
      <div>
        <button onClick={deletePost}>Delete this book</button>
      </div>
    </div>

  )
}
