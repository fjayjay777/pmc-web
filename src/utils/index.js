import { useEffect, useState } from 'react';

/**
 * CleanObject removes the empty parts of the request
 * eg. localhost:3000/class?name=&id=12
 * name= is empty here but will be passed to the backend
 * this function removes name=
 */
export const cleanObject = (object) => {
  const result = { ...object };
  object.keys(object).forEach((key) => {
    const value = object[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

/**
 * IsFalsy checks if the value is 0 or false
 */
export const isFalsy = (value) => (value === 0 ? false : !!value);

/**
 * UseMount mounts data (render) once only when the page loaded
 * use this whenever the data only loads once per load
 */
export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};

/**
 * UseDebounce prevents the behavior that whenever the input is typed, a request is sent
 * eg. when user enter words in input box (search box), requests will be sent whenever a letter is typed
 * this prevents the requests being sent before user finish typing
 */
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};