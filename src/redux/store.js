import { createStore, applyMiddleware, combineReducers } from 'redux'

import { logger, promise } from '../redux/middleware'
import categories from './_reducers/categories'
import transaction from './_reducers/transaction'
import menus from './_reducers/menus'

const reducers = combineReducers({
    categories,
    transaction,
    menus
})

const store = createStore(
    reducers,
    applyMiddleware(logger, promise)
)

export default store