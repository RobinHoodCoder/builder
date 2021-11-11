import React, { useCallback, useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import { deleteItem } from '../../api/api';
const url = 'https://react-hooks-update-76090-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json';

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState(undefined);

  const addIngredientHandler = async (ingredient) => {
    try {
      const response = await fetch(url,
        {
          method: 'POST',
          body: JSON.stringify(ingredient),
          headers: {
            'Content-Type': 'application/json',
          },
        });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setIngredients((prevState) => {
          return [
            ...prevState,
            {
              ...ingredient,
              id: response.name,
            },
          ];
        });
      }
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  const removeIngredientHandler = (ingredientID) => {
    if (ingredientID) {
      deleteItem(ingredientID)
        .then(() => {
          setIngredients((prevState) => {
            return prevState.filter(ingredient => ingredient.id !== ingredientID);
          });
        });
    }
  };

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    return setIngredients(filteredIngredients);
  }, []);

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler}/>
      {ingredients?.length && (
        <IngredientList
          ingredients={ingredients}
          onRemoveItem={removeIngredientHandler}
        />
      )
      }

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        {error && <p>{error.message}</p>}
        {/* Need to add list here! */}
      </section>
    </div>
  );
}

export default Ingredients;
