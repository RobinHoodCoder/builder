import React from 'react';

const Ingredient = (props) => {
  return (
    <li
      key={props.id}
      onClick={() => props.onRemoveItem(props.id)}
    >
      <span>{props.title}</span>
      <span>{props.amount}x</span>
    </li>
  );
};
export default Ingredient;
