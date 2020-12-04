import axios from 'axios'
import clsx from 'clsx'
import { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

export default function Login ({ auth, onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [feedbackMsg, setFeedbackMsg] = useState('')

  function handleSubmit (e) {
    e.preventDefault()
    axios.get('https://books-api.glitch.me/api/users', {
      auth: {
        username: username,
        password: password
      }
    })
      .then(response => {
        setFeedbackMsg({ type: 'success', message: 'Logged in.' })
        onLogin({ username, password })
      })
      .catch(error => {
        setFeedbackMsg({ type: 'error', message: 'That username or password is invalid.' })
        console.log(error)
      })
  }

  if (auth) {
    return <Redirect to='/' />
  }

  return (
    <div className='green'>
      <h1 className='ml4 white'>Welcome to BookTracker!</h1>
      <div className='Login user mh6 center mt6 rose'>
        <h1 className='f2 b white'>Log In or <Link to='/signup'>Sign Up</Link></h1>
        {
          feedbackMsg &&
          (
            <div className={clsx(
              {
                'bg-red': (feedbackMsg.type === 'error'),
                white: (feedbackMsg.type === 'error' | 'success'),
                'bg-green': (feedbackMsg.type === 'success')
              }
            )}
            >
              {feedbackMsg.message}
            </div>
          )
        }
        <form onSubmit={handleSubmit}>
          <div className='mv2'>
            <label className='db b mv2 white' htmlFor='username'>Username </label>
            <input
              required
              className='f5'
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='mv2'>
            <label className='db b mv2 white' htmlFor='password'>Password</label>
            <input
              required
              className='f5'
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='mv4 ph3'>
            <button type='submit'> Log In </button>
          </div>
        </form>
      </div>
    </div>
  )
}
