import React, { useCallback, useEffect, useReducer } from 'react';


import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import './Ingredients.css';
import ErrorModal from '../UI/ErrorModal';
import useHttp from '../../hooks/useHttp';
import { FIREBASE_URL } from '../../config/consts';


const ingredientsReducer = (currentIngredients, action) => {
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
    clear,
  } = useHttp();
  /*
   * const [error, setError] = useState(undefined);
   * const [loading, setLoading] = useState(undefined);
   */

  useEffect(() => {
    // When we have response data we need to set it in the state
    if (!isLoading && !error) {
      if (reqIdentifier === 'REMOVE_INGREDIENT') {
        dispatch({
          type: 'DELETE',
          id: reqExtra,
        });
      } else if (reqIdentifier === 'ADD_INGREDIENT') {
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
      url: `${FIREBASE_URL}/ingredients/${ingredientID}.json`,
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
          onClose={clear}
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
