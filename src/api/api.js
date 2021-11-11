const baseUrl = 'https://react-hooks-update-76090-default-rtdb.europe-west1.firebasedatabase.app/ingredients';

export const deleteItem = (itemId) => {
  return fetch(`${baseUrl}/${itemId}.json`, {
    method: 'DELETE',
    Allow: '*',
    'Access-Control-Allow-Origin': '*',
  }).then(res => res.json())
    .catch(err => console.error(err));
};
