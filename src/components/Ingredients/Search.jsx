import React, { useEffect, useState, memo } from 'react';

import Card from '../UI/Card';
import './Search.css';

const url = 'https://react-hooks-update-76090-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json';

// eslint-disable-next-line react/display-name
const Search = memo((props) => {
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState('');

  useEffect(() => {
    const query = !!enteredFilter?.length ? `?orderBy="title"&equalTo="${enteredFilter}"` : '';
    fetch(url + query)
      .then(response => response.json())
      .then((data) => {
        const loadedIngredients = [];
        if (!!data) {
          Object.entries(data)
            .forEach(([key, value]) => {
              loadedIngredients.push({
                id: key,
                amount: value.amount,
                title: value.title,
              });
            });
        }

        onLoadIngredients(loadedIngredients);
      })
      .catch((err) => {
        return console.error(err);
      });
  }, [enteredFilter, onLoadIngredients]);
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            value={enteredFilter}
            onChange={e => setEnteredFilter(e.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
