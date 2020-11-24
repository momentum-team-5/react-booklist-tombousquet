import './App.css'
import 'tachyons'
import { useState } from 'react'

function App () {
  const [username, setUsername] = useState('')
  const [userPassword, setUserPassword] = useState('')

  function handleSubmit (e) {
    e.preventDefault()
  }

  return (
    <div className='app'>
      <h1>Book List</h1>
      <div className='login'>
        <form onSubmit={handleSubmit}>
          <label className='user'>
            Username {' '}
            <input
              type='username'
              name={'user-' + username}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </form>
        <form className='ma2'>
          <label className='password'>
            Password {' '}
            <input
              type='password'
              name={'password-' + userPassword}
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </label>
        </form>
        <button
          className='login-button ma2'
          type='submit'
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default App
