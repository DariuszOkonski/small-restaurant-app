import './Recipe.css';
// import useFetch from './../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { useTheme } from './../../hooks/useTheme';
import { useEffect, useState } from 'react';
import { projectFirestore } from '../../firebase/config';

export default function Recipe() {  
  const { id } = useParams();
  const { mode } = useTheme();
  
  const [data, setData] = useState(null)  
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setIsPending(true);

    projectFirestore.collection('recipes').doc(id).get()
      .then((doc) => {
        if(!doc.exists) {
            setIsPending(false);
            setError('Could not find that recipe')
        } else {
          setIsPending(false);
          setError(false);
          setData(doc.data())
        }

      })
      .catch(err => {
        setError(err);
      })

  }, [id])
  

  return (
    <div className={`recipe ${mode}`}>
      { error && <p className='error'>{error}</p>}
      { isPending && <p className='loading'>Loading...</p>}

      {
        data && (
          <>
            <h2 className="page-title">{data.title}</h2>
            <p>Takes {data.cookingTime} to cook.</p>

            <ul>
              { data.ingredients.map(ing => <li key={ing}>{ing}</li>) }
            </ul>
            <p className="method">{data.method}</p>
          </>
        )
      }
    </div>
  )
}
