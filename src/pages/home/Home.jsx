import './Home.css';
import RecipeList from '../../components/RecipeList';
import { projectFirestore } from '../../firebase/config';
import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);


  useEffect(() => {
    setIsPending(true);
    
    // onSnapshot it is firestore method
    // onSnapshot is listening if there are any changes in db
    // if there is a change it brings those data again ex. after removing one element from db
    // there can't be also catch() element
    const unsub = projectFirestore.collection('recipes').onSnapshot((snapshot) => {
          if(snapshot.empty) {
            setError('No recipies to load');
            setIsPending(false);
          
          } else {
            let results = [];
            snapshot.docs.forEach(doc => {
              results.push({ id: doc.id, ...doc.data() })
            });

            setIsPending(false);
            setError(false);
            setData(results);
          }
      }, (err) => {
        setError(err.message);
        setIsPending(false);
      })

      return () => unsub();
      
  }, [])
  

  return (
    <div className='home'>
      { error && <p className='error'>{error}</p>}
      { isPending && <p className='loading'>Loading...</p>}
      
      {
        data && <RecipeList recipes={data} />
      }
    </div>
  )
}
