import Vue from "vue";
import VueRouter from "vue-router";

// ページコンポーネントをインポートする
import Login from "./pages/Login";
import PostForm from "./pages/PostForm";
import PostDetail from "./pages/PostDetail";
import MessageList from "./pages/MessageList";
import Main from "./pages/Main";

import store from "./store";

// VueRouterプラグインを使用する
// これによって<RouterView />コンポーネントなどを使うことができる
Vue.use(VueRouter);

// パスとコンポーネントのマッピング
const routes = [
    {
        path: "/",
        component: Main
    },
    {
        path: "/posts",
        component: PostForm
    },
    {
        path: "/messages",
        component: MessageList
    },
    {
        path: "/posts/:id",
        component: PostDetail,
        props: true
    }
];

// VueRouterインスタンスを作成する
const router = new VueRouter({
    mode: "history", // ★ 追加
    routes
});

// VueRouterインスタンスをエクスポートする
// app.jsでインポートするため
export default router;
