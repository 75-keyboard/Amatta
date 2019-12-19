import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth";
import message from "./message";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        auth,
        message
    }
});

export default store;
