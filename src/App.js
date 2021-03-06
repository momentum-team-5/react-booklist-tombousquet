import './App.css'
import 'tachyons'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import BookList from './components/BookList'
import BookDetail from './components/BookDetail'
import AddBook from './components/AddBook'
import EditBook from './components/EditBook'
import AddNote from './components/AddNote'
import { useLocalStorage } from './hooks'

function App () {
  const [auth, setAuth] = useLocalStorage('book_auth', null)

  return (
    <Router>
      <div className=''>
        <ul className=' ma1 pa0 flex'>
          <li className='nav'>
            <h2 className='ma2 underline'>
              <Link className='black' to='/'>Home</Link>
            </h2>
          </li>
          <li className='nav'>
            <h2 className='mv2 mh2 underline black'>
              <Link to='/add'>Add a book</Link>
            </h2>
          </li>
          {auth && (
            <li className='nav'>
              <h2 className='ma2 ml2 logged'>Logged in as {auth.username} | <Link to='/login' className='nav' onClick={() => setAuth(null)}>Log out</Link></h2>
            </li>
          )}
        </ul>
        <Switch>
          <Route path='/status/:status'>
            <BookList auth={auth} />
          </Route>
          <Route path='/books/:id'>
            <BookDetail auth={auth} />
          </Route>
          <Route path='/edit/:id'>
            <EditBook auth={auth} />
          </Route>
          <Route path='/add'>
            <AddBook auth={auth} />
          </Route>
          <Route path='/note/:id/add'>
            <AddNote auth={auth} />
          </Route>
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
