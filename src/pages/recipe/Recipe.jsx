import './Recipe.css';
import useFetch from './../../hooks/useFetch';
import { useParams } from 'react-router-dom';

export default function Recipe() {

  const { id } = useParams();
  const { data: recipe, isPending, error} = useFetch(`http://localhost:3000/recipes/${id}`)

  return (
    <div className='recipe'>
      { error && <p className='error'>{error}</p>}
      { isPending && <p className='loading'>Loading...</p>}

      {
        recipe && <h1>{recipe.title}</h1>
      }
    </div>
  )
}
