import './App.css'
import 'tachyons'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import BookList from './components/BookList'
import Nav from './components/Nav'
import { useLocalStorage } from './hooks'

function App () {
  const [auth, setAuth] = useLocalStorage('book_auth', null)

  return (
    <Router>
      <div className='account'>
        {auth && (
          <div className='ma2'>
            <span>Logged in as {auth.username}</span> | <button onClick={() => setAuth(null)}>Log out</button>
          </div>
        )}
        <Switch>
          <Route path='/signup'>
            <Register auth={auth} onRegister={setAuth} />
          </Route>
          <Route path='/login'>
            <Login auth={auth} onLogin={setAuth} />
          </Route>
          <Route path='/'>
            <BookList auth={auth} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
