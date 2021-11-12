import React, { useCallback, useReducer } from 'react';

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

const httpReducer = (currHttpState, action) => {
  switch (action.type) {
  case 'SEND' :
    return {
      ...currHttpState,
      loading: true,
    };
  case 'RESPONSE' :
    return {
      ...currHttpState,
      loading: false,
    };
  case 'ERROR' :
    return {
      ...currHttpState,
      loading: false,
      error: action.error.message,
    };
  case 'CLEAR' :
    return {
      ...currHttpState,
      loading: false,
      error: null,
    };
  default:
    throw new Error('This action type is not recognised');
  }
};

function Ingredients() {
  const [httpState, dispatchHttp] = useReducer(httpReducer, { loading: false, error: null });
  const [ingredients, dispatch] = useReducer(ingredientsReducer, []);

  /*
   * const [error, setError] = useState(undefined);
   * const [loading, setLoading] = useState(undefined);
   */

  console.log('Rerender of Ingredients');


  const addIngredientHandler = async (ingredient) => {
    dispatchHttp({ type: 'SEND' });
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
        dispatchHttp({ type: 'RESPONSE' });
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
      dispatchHttp({ type: 'ERROR', error });
    }
  };

  const removeIngredientHandler = useCallback((ingredientID) => {
    if (ingredientID) {
      deleteItem(ingredientID)
        .then(() => {
          dispatch({
            type: 'DELETE',
            id: ingredientID,
          });
        });
    }
  }, []);

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    dispatch({
      type: 'SET',
      ingredients: filteredIngredients,
    });
  }, []);

  const clearError = () => {
    dispatchHttp({ type: 'CLEAR' });
  };

  return (
    <div className="App">
      {!!httpState.error?.message && (
        <ErrorModal
          onClose={clearError}
        >
          {httpState.error.message}
        </ErrorModal>
      )}
      <IngredientForm
        loading={httpState.loading}
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
