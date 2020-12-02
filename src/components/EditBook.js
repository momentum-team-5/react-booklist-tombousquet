import { useState } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import axios from 'axios'
import clsx from 'clsx'

export default function EditBook ({ auth, onEdit }) {
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [authors, setAuthors] = useState('')
  const [status, setStatus] = useState('')
  const [feedbackMsg, setFeedbackMsg] = useState('')

  function handleEdit (e) {
    e.preventDefault()
    axios.put('https://books-api.glitch.me/api/books/' + id, {
      title: title,
      authors: authors,
      status: status
    }, [auth])
      .then(response => {
        setFeedbackMsg({ type: 'success', message: 'The book was edited successfully.' })
        onEdit({ title, authors, status })
        console.log(response)
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
      <h1 className='ma2'>Edit Book Entry</h1>
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
      <form onSubmit={handleEdit}>
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