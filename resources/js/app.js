import Vue from "vue";
import router from "./router";
import App from "./App.vue";
import store from "./store";

import "./bootstrap.js";

// bootstrap
// import BootstrapVue from "bootstrap-vue";
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap-vue/dist/bootstrap-vue.css";
// Vue.use(BootstrapVue);

import vuetify from "./vuetify";

const createApp = async () => {
    await store.dispatch("auth/currentUser");

    new Vue({
        el: "#app",
        vuetify,
        router,
        store,
        components: { App },
        template: "<App />"
    });
};

createApp();
