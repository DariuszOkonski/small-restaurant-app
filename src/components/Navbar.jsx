import { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Searchbar from './Searchbar';
import { ThemeContext } from './../context/ThemeContext';


export default function Navbar() {
  const { color } = useContext(ThemeContext)
  
  console.log(color)

  return (
    <div className='navbar' style={{ background: color }}>
        <nav>
            <Link to='/' className='brand'>
                <h3>small restaurant app</h3>
            </Link>

            <Searchbar />

            <Link to='/create'>Create Recipe</Link>
        </nav>
    </div>
  )
}
