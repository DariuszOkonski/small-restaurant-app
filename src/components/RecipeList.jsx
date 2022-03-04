import { Link } from 'react-router-dom';
import './RecipeList.css';
import { useTheme } from './../hooks/useTheme';

export default function RecipeList({ recipes }) {
    const { mode } = useTheme();

    if(recipes.length === 0) {
        return (
            <div className='error'>
                No recipes to load...
            </div>
        )
    }

    return (
        <div className='recipe-list'>
            {
                recipes.map(recipe => (
                    <div key={recipe.id} className={`card ${mode}`}>
                        <h3>{ recipe.title }</h3>
                        <p>{ recipe.cookingTime }</p>

                        <div>
                            {recipe.method.substring(0, 50)}...
                        </div>

                        <Link to={`/recipe/${recipe.id}`} >Cook This...</Link>
                    </div>
                ))
            }
        </div>
    )
}
