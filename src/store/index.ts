import Vuex from 'vuex'


export default new Vuex.Store({

    state: {
        BarHeight:0
    },
    getters: {
        token: (state) => {
            return state["common"].token
        }
    },
    mutations: {
        SetStatusBarHeight(state, statusBarHeight) {
            state.BarHeight = statusBarHeight
        }
    }
})
