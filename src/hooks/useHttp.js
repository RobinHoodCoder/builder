import { useCallback, useReducer } from 'react';
import { deleteItem } from '../api/api';

const httpReducer = (currHttpState, action) => {
  switch (action.type) {
  case 'SEND' :
    return {
      ...currHttpState,
      loading: true,
      data: null,
      extra: null,
      identifier: action.identifier,
    };
  case 'RESPONSE' :
    return {
      ...currHttpState,
      loading: false,
      data: action.responseData,
      extra: action.extra,
    };
  case 'ERROR' :
    return {
      ...currHttpState,
      loading: false,
      error: action.error.message,
    };
  case 'CLEAR' :
    return {
      ...currHttpState,
      loading: false,
      error: null,
    };
  default:
    throw new Error('This action type is not recognised');
  }
};

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, { loading: false, error: null });

  const sendRequest = useCallback(({
    url,
    method,
    body,
    reqExtra,
    identifier,
  }) => {
    dispatchHttp({ type: 'SEND', identifier });

    fetch(url,
      {
        method,
        body: !!body ? JSON.stringify(body) : null,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
      .then((response) => {
        dispatchHttp({
          type: 'RESPONSE',
          responseData: response,
          extra: reqExtra,
        });
      })
      .catch((error) => {
        dispatchHttp({
          type: 'ERROR',
          error,
        });
      });
  }, []);

  return {
    isLoading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    sendRequest,
    reqExtra: httpState.extra,
    reqIdentifier: httpState.identifier,
  };
};

export default (useHttp);
