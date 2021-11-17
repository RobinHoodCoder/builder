const { FIREBASE_URL } = process.env;
const baseUrl = FIREBASE_URL;

export const deleteItem = (itemId) => {
  return fetch(`${baseUrl}/${itemId}.json`, {
    method: 'DELETE',
    Allow: '*',
    'Access-Control-Allow-Origin': '*',
  }).then(res => res.json())
    .catch(err => console.error(err));
};
