import { useCallback, useReducer } from 'react';
import { deleteItem } from '../api/api';

const initialState = {
  loading: false,
  error: null,
  data: null,
  extra: null,
  identifier: null,
};

const httpReducer = (currHttpState, action) => {
  switch (action.type) {
  case 'SEND' :
    return {
      loading: true,
      error: null,
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
    return initialState;
  default:
    throw new Error('This action type is not recognised');
  }
};

const useHttp = (callback, deps) => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

  const clear = useCallback(() => {
    dispatchHttp({ type: 'CLEAR' });
  }, []);

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
          responseData: {
            ...(response && {
              id: !!response?.name ? response.name : null,
              ...response,
            }),
          },
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
    sendRequest,
    clear,
    isLoading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    reqExtra: httpState.extra,
    reqIdentifier: httpState.identifier,
  };
};

export default (useHttp);
