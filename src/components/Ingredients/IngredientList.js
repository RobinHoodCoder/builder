import React from 'react';

import './IngredientList.css';
import Ingredient from './Ingredient';

const IngredientList = (props) => {
  return (
    <section className="ingredient-list">
      <ul>
        {props.ingredients.map((ig, index) => (
          <Ingredient
            key={index}
            {...props}
            {
            ...ig
            }/>
        ))}
      </ul>
    </section>
  );
};

export default IngredientList;
