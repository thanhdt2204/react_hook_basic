import deepEqual from "fast-deep-equal/es6";
import { useEffect, useReducer, useRef } from 'react';
import { storage } from '../utils/constant';
import rootReducer, { initialState } from './reducers/rootReducer';

export function usePersistedReducer() {

    const [state, dispatch] = useReducer(rootReducer, initialState, init);
    const prevState = usePrevious(state);

    function init() {
        const stringState = localStorage.getItem(storage.STORAGE_KEY);
        if (stringState) {
            try {
                return JSON.parse(stringState);
            } catch (error) {
                return initialState;
            }
        } else {
            return initialState;
        }
    }

    useEffect(() => {
        const isChangeState = !deepEqual(prevState, state);
        if (isChangeState) {
            const stringifiedState = JSON.stringify(state);
            localStorage.setItem(storage.STORAGE_KEY, stringifiedState);
        }
    }, [state])

    return { state, dispatch }
}

export function usePrevious(value) {
    const ref = useRef()
    useEffect(() => {
        ref.current = value
    })
    return ref.current
}