import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import clsx from 'clsx'

export default function AddBook ({ auth }) {
  const [title, setTitle] = useState('')
  const [authors, setAuthors] = useState('')
  const [status, setStatus] = useState('')
  const [feedbackMsg, setFeedbackMsg] = useState('')

  function handleSubmit (e) {
    e.preventDefault()
    axios.post('https://books-api.glitch.me/api/books', {
      title: title,
      authors: authors.split(/\s*,\s*/),
      status: status
    }, { auth })
      .then(response => {
        setFeedbackMsg({ type: 'success', message: 'This book was added successfully.' })
        console.log(response)
      })
      .catch(error => {
        setFeedbackMsg({ type: 'error', message: 'The book information you entered is not valid' })
        console.log(error)
      })
  }

  if (feedbackMsg.type === 'success') {
    return (
      <div>
        <Redirect exact to='/' />
      </div>
    )
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
        <div>
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
            <select
              required
              id='status'
              value={status}
              onChange={event => setStatus(event.target.value)}
              name='bookStatus'
            >
              <option value='null'>Choose from below</option>
              <option value='toread'>To Read</option>
              <option value='reading'>Reading</option>
              <option value='read'>Read</option>
            </select>

          </div>
          <button className='mh2 mv2' type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}
