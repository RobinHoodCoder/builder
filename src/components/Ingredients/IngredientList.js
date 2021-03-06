import React from 'react';

import './IngredientList.css';
import Ingredient from './Ingredient';
// import store from '../../redux/';

const IngredientList = React.memo((props) => {
  console.log('Rerender of Ingredient list', new Date().getSeconds());
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
});
IngredientList.displayName = 'Ingredient List';
export default IngredientList;
