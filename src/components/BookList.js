import { Link, Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import clsx from 'clsx'

export default function BookList ({ auth }) {
  const [books, setBooks] = useState([])

  useEffect(() => {
    axios.get('https://books-api.glitch.me/api/books', {
      auth: auth
    })
      .then(response => {
        setBooks(response.data.books)
      })
  }, [auth])

  if (!auth) {
    return <Redirect to='/login' />
  }
  return (
    <div className='BookList'>
      <h1 className='mh2 mv3'>Book List</h1>
      <div className='key flex'>
        <h3 className='reading ma2'>Reading</h3>
        <h3 className='toread ma2'>To Read</h3>
        <h3 className='read ma2'>Read</h3>
      </div>
      {books.map(book => (
        <div
          key={book._id} className={clsx('ma2 book flex', {
            reading: book.status === 'reading',
            toread: book.status === 'toread',
            read: book.status === 'read'
          })}
        >
          <h2 className='ma2 underline flex'>
            <Link to={'/books/' + book._id}>
              {book.title || 'No Title'}
            </Link>
          </h2>
          <p className='ma3 i flex'>Written by {book.authors}</p>
        </div>
      ))}
    </div>
  )
}
