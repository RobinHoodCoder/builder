import React, { useCallback, useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import { deleteItem } from '../../api/api';
import './Ingredients.css';
import ErrorModal from '../UI/ErrorModal';
const url = 'https://react-hooks-update-76090-default-rtdb.eurdope-west1.firebasedatabase.app/ingredients.json';

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
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
      console.log(response);

      if (response.ok) {
        setLoading(false);
        setIngredients((prevState) => {
          return [
            ...prevState,
            {
              ...ingredient,
              id: data.name,
            },
          ];
        });
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
        {error && <p>{error.message}</p>}
        {/* Need to add list here! */}
      </section>
      <h2>Loaded Ingredients</h2>
      <IngredientList
        ingredients={ingredients}
        onRemoveItem={removeIngredientHandler}
      />
    </div>
  );
}

export default Ingredients;
