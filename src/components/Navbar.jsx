import { Link } from 'react-router-dom';
import './Navbar.css';


export default function Navbar() {
  return (
    <div className='navbar'>
        <nav>
            <Link to='/' className='brand'>
                <h3>small restaurant app</h3>
            </Link>

            <Link to='/create'>Create Recipe</Link>
        </nav>
    </div>
  )
}
