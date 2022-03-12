import { Link } from 'react-router-dom'

import Button from 'react-bootstrap/Button'

export function Header() {
  return (
    <div className='header'>
      <Button variant="danger">
        <Link to={'/'}>
          Voltar 
        </Link>
      </Button>
    </div>
  )
}