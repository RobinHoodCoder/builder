import React, { useCallback, useReducer, useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import { deleteItem } from '../../api/api';
import './Ingredients.css';
import ErrorModal from '../UI/ErrorModal';
const url = 'https://react-hooks-update-76090-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json';

const ingredientsReducer = (currentIngredients = [], action) => {
  switch (action.type) {
  case 'SET' :
    return action.ingredients;
  case 'ADD':
    return [
      ...currentIngredients,
      action.ingredient,
    ];
  case 'DELETE' :
    return currentIngredients.filter(ingredient => ingredient.id !== action.id);
  default:
    throw new Error('Should not happen');
  }
};

function Ingredients() {
  const [ingredients, dispatch] = useReducer(ingredientsReducer, []);

  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(undefined);


  const addIngredientHandler = async (ingredient) => {
    setLoading(true);
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

      if (response.ok) {
        setLoading(false);
        dispatch(
          {
            type: 'ADD',
            ingredient: {
              ...ingredient,
              id: data.name,
            },
          }
        );
      }
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const removeIngredientHandler = (ingredientID) => {
    if (ingredientID) {
      deleteItem(ingredientID)
        .then(() => {
          dispatch({
            type: 'DELETE',
            id: ingredientID,
          });
        });
    }
  };

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    dispatch({
      type: 'SET',
      ingredients: filteredIngredients,
    });
  }, []);

  return (
    <div className="App">
      {!!error?.message && (
        <ErrorModal
          onClose={() => setError(null)}
        >
          {error.message}
        </ErrorModal>
      )}
      <IngredientForm
        loading={loading}
        onAddIngredient={addIngredientHandler}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        {/* Need to add list here! */}
      </section>
      <h2>Loaded Ingredients</h2>
      {
        ingredients?.length && (

          <IngredientList
            ingredients={ingredients}
            onRemoveItem={removeIngredientHandler}
          />
        )
      }
    </div>
  );
}

export default Ingredients;
