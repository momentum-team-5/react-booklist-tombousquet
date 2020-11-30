import { Redirect } from 'react-router-dom'

export default function BookList ({ auth }) {
  if (!auth) {
    return <Redirect to='/login' />
  }

  return (
    <ul>
      <li> User Books </li>
    </ul>
  )
}
