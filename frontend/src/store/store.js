import {legacy_createStore as createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import { reducers } from './reducers'

const saveToLocalStorage = (store) => {
    try {
        const serializedStore = JSON.stringify(store);
        window.localStorage.setItem("store", serializedStore)
    } catch (error) {
        console.log(error)
    }
}
const loadFromLocalStorage = (store) => {
    try {
        const serializedStore = window.localStorage.getItem('store')
        if (serializedStore===null) {return undefined}
        return JSON.parse(serializedStore)
    } catch (error) {
        console.log(error)
        return undefined
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE__ || compose
const peristedState = loadFromLocalStorage();

const store = createStore(reducers, peristedState, composeEnhancers(applyMiddleware(thunk)))

store.subscribe(()=>saveToLocalStorage(store.getState()))

export default store