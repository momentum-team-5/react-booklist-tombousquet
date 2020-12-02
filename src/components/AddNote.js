import { useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import axios from 'axios'
import clsx from 'clsx'

export default function AddNote ({ auth }) {
  const { id } = useParams()
  const [note, setNote] = useState('')
  const [page, setPage] = useState('')
  const [feedbackMsg, setFeedbackMsg] = useState('')

  function handleSubmit (e) {
    e.preventDefault()
    axios.post('https://books-api.glitch.me/api/books/' + id + '/notes', {
      note: note,
      page: page
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
        <Redirect to={'/books/' + id} />
      </div>
    )
  }

  if (!auth) {
    return <Redirect to='/' />
  }

  return (
    <div>
      <h1 className='ma2'>New Note Entry</h1>
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
            <label className='mv2 b' htmlFor='title'>Note</label>
            <input
              required
              type='text'
              id='note'
              value={note}
              onChange={event => setNote(event.target.value)}
              name='bookNote'
              component='input'
              placeholder='Add note here'
            />
          </div>
          <div className='mh2 mv2'>
            <label className='mv2 b' htmlFor='authors'>Page #</label>
            <input
              required
              type='number'
              id='page'
              value={page}
              onChange={event => setPage(event.target.value)}
              name='notePage'
              component='input'
              placeholder='#'
            />
          </div>
          <button className='mh2 mv2' type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}
