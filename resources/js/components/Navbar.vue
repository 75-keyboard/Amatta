<template>
  <v-app-bar color="white" :fixed="true">
    <v-toolbar-title class="title">{{ postTitle ? postTitle : defaultTitle }}</v-toolbar-title>
    <div class="flex-grow-1"></div>
    <div v-if="isLogin" class="navbar__menu">
      <!-- <RouterLink to="/posts">
        <v-btn icon>
          <v-icon>mdi-bell-circle-outline</v-icon>
        </v-btn>
      </RouterLink>
      <RouterLink to="/posts">
        <v-btn icon>
          <v-icon>mdi-plus-circle-outline</v-icon>
        </v-btn>
      </RouterLink>-->
      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title @click="logout">ログアウト</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>
</template>
<script>
export default {
  props: ["postTitle"],
  data() {
    return { defaultTitle: "Amatta!" };
  },
  methods: {
    async logout() {
      await this.$store.dispatch("auth/logout");
      this.$router.push("/");
    }
  },
  computed: {
    isLogin() {
      return this.$store.getters["auth/check"];
    },
    username() {
      return this.$store.getters["auth/username"];
    }
  }
};
</script>
<style>
nav {
  height: 5rem;
}
.title {
  text-align: center;
  color: orange;
}
a {
  text-decoration: none;
}
</style>
