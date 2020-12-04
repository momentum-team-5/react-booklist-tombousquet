import { Link, NavLink, Redirect, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import clsx from 'clsx'

export default function BookList ({ auth }) {
  const [books, setBooks] = useState([])
  const { status } = useParams()

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

  let booksByStatus = books
  if (status) {
    booksByStatus = books.filter(book => book.status === status)
  }

  return (
    <div className='BookList'>
      <h1 className='mh2 mv3 gray'>Book List</h1>
      <div className='key flex'>
        <h3 className='all ma2 black'>
          <NavLink className='gray bg-black' to='/' exact>All Books</NavLink>
        </h3>
        <h3 className='reading ma2 blue sort'>
          <NavLink to='/status/reading'>Reading</NavLink>
        </h3>
        <h3 className='toread ma2 green sort'>
          <NavLink to='/status/toread'>To Read</NavLink>
        </h3>
        <h3 className='read ma2 rose sort'>
          <NavLink to='/status/read'>Read</NavLink>
        </h3>
      </div>
      {booksByStatus.map(book => (
        <div
          key={book._id} className={clsx('ma2 book flex', {
            reading: book.status === 'reading',
            toread: book.status === 'toread',
            read: book.status === 'read'
          })}
        >
          <h2 className='ma2 underline flex white'>
            <Link className='white' to={'/books/' + book._id}>
              {book.title || 'No Title'}
            </Link>
          </h2>
          <p className='ma3 i flex white'>Written by {book.authors}</p>
        </div>
      ))}
    </div>
  )
}
