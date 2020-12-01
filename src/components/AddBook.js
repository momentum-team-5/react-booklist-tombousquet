import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import clsx from 'clsx'

export default function AddBook ({ auth, onAdd }) {
  const [title, setTitle] = useState('')
  const [authors, setAuthors] = useState([])
  const [status, setStatus] = useState('')
  const [feedbackMsg, setFeedbackMsg] = useState('')

  function handleSubmit (e) {
    e.preventDefault()
    axios.post('https://books-api.glitch.me/api/books', {
      title: title,
      authors: authors,
      status: status
    })
      .then(response => {
        setFeedbackMsg({ type: 'success', message: 'The book was added successfully.' })
        onAdd({ title, authors, status })
      })
      .catch(error => {
        setFeedbackMsg({ type: 'error', message: 'The book information you entered is not valid' })
        console.log(error)
      })
  }

  if (!auth) {
    return <Redirect to='/' />
  }

  return (
    <div>
      <h1 className='ma2'>New Book Entry</h1>
      {
        feedbackMsg &&
        (
          <div className={clsx(
            {
              'bg-red': (feedbackMsg.type === 'error'),
              white: (feedbackMsg.type === 'error'),
              'bg-green': (feedbackMsg.type === 'success')
            }
          )}
          >
            {feedbackMsg.message}
          </div>
        )
      }
      <form onSubmit={handleSubmit}>
        <div className='flex'>
          <div className='mh2 mv2'>
            <label className='mv2 b' htmlFor='title'>Title</label>
            <input
              required
              type='text'
              id='title'
              value={title}
              onChange={event => setTitle(event.target.value)}
              name='bookTitle'
              component='input'
              placeholder='Book Title'
            />
          </div>
          <div className='mh2 mv2'>
            <label className='mv2 b' htmlFor='authors'>Authors</label>
            <input
              required
              type='text'
              id='authors'
              value={authors}
              onChange={event => setAuthors(event.target.value)}
              name='bookAuthors'
              component='input'
              placeholder='Book Authors'
            />
          </div>
          <div className='mh2 mv2'>
            <label className='mv2 b' htmlFor='status'>Status</label>
            <input
              required
              type='text'
              id='status'
              value={status}
              onChange={event => setStatus(event.target.value)}
              name='bookStatus'
              component='input'
              placeholder='Book Status'
            />
          </div>
          <button className='mh2 mv2' type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}
