import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Create from './pages/create/Create';
import Home from './pages/home/Home';
import Recipe from './pages/recipe/Recipe';
import Search from './pages/search/Search';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <BrowserRouter>
          <Switch>
            
            <Route exact path='/'>
              <Home />
            </Route>

            <Route path='/create'>
              <Create/>
            </Route>

            <Route path='/search'>
              <Search/>
            </Route>

            <Route path='/recipe/:id'>
              <Recipe/>
            </Route>
          </Switch>
        </BrowserRouter>

      </header>
    </div>
  );
}

export default App;