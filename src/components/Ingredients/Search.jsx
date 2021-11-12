import React, { useEffect, useState, memo, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const url = 'https://react-hooks-update-76090-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json';

// eslint-disable-next-line react/display-name
const Search = memo((props) => {
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState('');
  const inputRef = useRef();


  useEffect(() => {
    const timer = setTimeout(() => {
      // If input same as 500ms ago...
      if (enteredFilter ===  inputRef.current?.value) {
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

            return onLoadIngredients(loadedIngredients);
          })
          .catch((err) => {
            return console.error(err);
          });

        return () => {
          clearTimeout(timer);
        };
      }
    }, 500);
  }, [enteredFilter, onLoadIngredients, inputRef]);
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={inputRef}
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
