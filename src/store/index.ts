import { createStore } from 'vuex';
import createPersistedSatte from 'vuex-persistedstate'

import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const store = createStore({
    state,
    getters,
    actions,
    mutations,
    plugins: [createPersistedSatte()]
})

export default store;