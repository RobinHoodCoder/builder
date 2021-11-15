import React, { useCallback, useEffect, useReducer } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import { deleteItem } from '../../api/api';
import './Ingredients.css';
import ErrorModal from '../UI/ErrorModal';
import useHttp from '../../hooks/useHttp';

const url = 'https://react-hooks-update-76090-default-rtdb.europe-west1.firebasedatabase.app/ingredients';


const ingredientsReducer = (currentIngredients, action) => {
  console.log(action, currentIngredients);
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
  // const [httpState, dispatchHttp] = useReducer(httpReducer, { loading: false, error: null });
  const [ingredients, dispatch] = useReducer(ingredientsReducer, []);

  const {
    isLoading,
    error,
    data,
    sendRequest,
    reqExtra,
    reqIdentifier,
  } = useHttp();
  /*
   * const [error, setError] = useState(undefined);
   * const [loading, setLoading] = useState(undefined);
   */

  useEffect(() => {
    // When we have response data we need to set it in the state
    if (!isLoading && !error) {
      if (reqIdentifier === 'REMOVE_INGREDIENT') {
        console.log(data, { data }, 'DELETE');
        dispatch({
          type: 'DELETE',
          id: reqExtra,
        });
      } else if (reqIdentifier === 'ADD_INGREDIENT') {
        console.log(data, { data }, 'Huu');
        dispatch({
          type: 'ADD',
          ingredient: {
            ...data.id,
            ...reqExtra,
          },
        });
      }
    }
  }, [
    data,
    error,
    isLoading,
    reqExtra,
    reqIdentifier,
  ]);

  console.log('Rerender of Ingredients');

  const addIngredientHandler = (ingredient) => {
    sendRequest({
      url: `${url}.json`,
      method: 'POST',
      body: ingredient,
      reqExtra: ingredient,
      identifier: 'ADD_INGREDIENT',
    });
  };

  const removeIngredientHandler = useCallback((ingredientID) => {
    sendRequest({
      url: `${url}/${ingredientID}.json`,
      method: 'DELETE',
      body: null,
      reqExtra: ingredientID,
      identifier: 'REMOVE_INGREDIENT',
    });
  }, [sendRequest]);

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    dispatch({
      type: 'SET',
      ingredients: filteredIngredients,
    });
  }, []);

  return (
    <div className="App">
      {!!error && (
        <ErrorModal
          onClose={() => {}}
        >
          {error}
        </ErrorModal>
      )}
      <IngredientForm
        loading={isLoading}
        onAddIngredient={addIngredientHandler}
      />

      <section>
        <Search
          onLoadIngredients={filteredIngredientsHandler}
        />
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
