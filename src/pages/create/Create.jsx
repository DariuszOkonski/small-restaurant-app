import './Create.css';
import { useState, useRef } from 'react';
import useFetch from './../../hooks/useFetch';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useTheme } from './../../hooks/useTheme';

export default function Create() {
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [cookingTime, setCookingTime] = useState('0')
  const [newIngredient, setNewIngredient] = useState('');
  const [ingredients, setIngredients] = useState([])  
  const ingredientInput = useRef(null)
  const history = useHistory();

  const { postData, data, error } = useFetch('http://localhost:3000/recipes', 'POST');
  const { mode } = useTheme();


  const handleSubmit = (e) => {
    e.preventDefault();
    postData({ title, ingredients, method, cookingTime: cookingTime + ' minutes' })
  }

  // redirect the user when we get data response
  useEffect(() => {
    if(data) {
      history.push('/');
    }   
  }, [data])
  

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim().toLowerCase();

    if(ing && !ingredients.includes(ing)) {
      setIngredients(prevIngredients => [...prevIngredients, ing])
    }    
    setNewIngredient('')
    ingredientInput.current.focus();
  }

  return (
    <div className={`create ${mode}`}>
      <h2 className="page-title">Add a New Recipe</h2>

      <form onSubmit={handleSubmit}>
        
        <label>
          <span>Recipe title:</span>
          <input 
            type="text" 
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>
      
        <label>
          <span>Recipe ingredients:</span>

          <div className="ingredients">
            <input 
              type="text" 
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button className="btn" onClick={handleAdd}>add</button>
          </div>
        </label>

        <p>
          Current ingredients: {ingredients.map(i => <em key={i}>{i}, </em>)}
        </p>

        <label>
          <span>Recipe method:</span>
          <textarea 
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>
      
        <label>
          <span>Cooking time (minutes):</span>
          <input 
            type="number" 
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>

        <button className='btn'>submit</button>
      </form>
    </div>
  )
}
