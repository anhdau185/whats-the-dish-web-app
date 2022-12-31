// consumed only by reducers
export const SET_APP_LOADING = '@state/SET_APP_LOADING';
export const UPDATE_API_CALL_FETCH_CATEGORIES = '@state/UPDATE_API_CALL_FETCH_CATEGORIES';
export const UPDATE_API_CALL_FETCH_DISHES = '@state/UPDATE_API_CALL_FETCH_DISHES';

// consumed only by epics
export const FETCH_COMPLETED = '@api/FETCH_COMPLETED'; // generic signal for when an api call is successfully completed
export const FETCH_FAILED = '@api/FETCH_FAILED'; // generic signal for when an api call failed
export const FETCH_DISHES_API = '@api/FETCH_DISHES_API';
export const FETCH_CATEGORIES_API = '@api/FETCH_CATEGORIES_API';
