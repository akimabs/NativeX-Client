import axios from 'axios'

import env from '../../env/env'

export const getMenusByCategory = (categoryId) => ({
    type: "GET_MENUS_CATEGORIES",
    payload: axios.get(env.host + "menus/" + categoryId)
})