import { createStore, applyMiddleware, combineReducers } from 'redux'

import { logger, promise } from '../redux/middleware'
import categories from './_reducers/categories'
import transaction from './_reducers/transaction'
import menus from './_reducers/menus'
import orders from './_reducers/orders'
import carts from './_reducers/carts'

const reducers = combineReducers({
    categories,
    transaction,
    menus,
    orders,
    carts
})

const store = createStore(
    reducers,
    applyMiddleware(logger, promise)
)

export default store