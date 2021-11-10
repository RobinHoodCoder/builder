import React, { useEffect, useState } from 'react'

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
const url = 'https://react-hooks-update-76090-default-rtdb.europe-west1.firebasedatabase.app/react-hooks-update-76090-default-rtdb.json';

function Ingredients() {
  const [ingredients,setIngredients] = useState([]);
  const [error,setError] = useState(undefined);

  useEffect(() => {
    fetch(url)
     .then(response => response.json())
     .then(data => {
       const loadedIngredients = [];
       Object.entries(data).forEach(([key, value]) => {
       console.log([key,value])
         loadedIngredients.push({
           id: key,
           amount: value.amount,
           title: value.title,
         });
       });
       setIngredients(loadedIngredients);
     })
  },[])


  const addIngredientHandler = async(ingredient) => {
    try {
       const response = await fetch(url,
       {
         method: 'POST',
         body: JSON.stringify(ingredient),
         headers: {
           'Content-Type': 'application/json',
         }
       });

       const data = await response.json();
       console.log(data);

    } catch (error) {
      console.error(error);
      setError(error);
    }


    setIngredients(prevState => {
      return [...prevState, {id: Math.random().toString(), ...ingredient}]
    })
  };

  const removeIngredientHandler = (ingredientID) => {
    setIngredients(prevState => {
      return prevState.filter(ingredient => ingredient.id !== ingredientID)
    })
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler}/>
      <IngredientList ingredients={ingredients} onRemoveItem={removeIngredientHandler}/>

      <section>
        <Search />
        {error && <p>{error.message}</p>}
        {/* Need to add list here! */}
      </section>
    </div>
  );
}

export default Ingredients;
