import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';
import LoadingIndicator from '../UI/LoadingIndicator';

const IngredientForm = React.memo((props) => {
  const [userInput, setUserInput] = useState('');
  const [amount, setAmount] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAddIngredient({ title: userInput, amount });
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {!!props.loading && <LoadingIndicator/>}
          </div>
        </form>
      </Card>
    </section>
  );
});
IngredientForm.displayName = 'Ingredient Form';
export default IngredientForm;
