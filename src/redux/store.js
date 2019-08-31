import { createStore, applyMiddleware, combineReducers } from 'redux'

import { logger, promise } from '../redux/middleware'
import categories from './_reducers/categories'

const reducers = combineReducers({
    categories
})

const store = createStore(
    reducers,
    applyMiddleware(logger, promise)
)

export default store