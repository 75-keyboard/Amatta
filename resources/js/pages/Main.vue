<template>
  <div>
    <v-card class="vc">
      <Navbar />
      <div v-if="isLogin">
        <PostList />
      </div>
      <div v-else>
        <Login />
      </div>
    </v-card>
  </div>
</template>
<script>
import Navbar from "../components/Navbar";
import PostList from "./PostList";
import Login from "./Login";

export default {
  components: {
    Navbar,
    PostList,
    Login
  },
  computed: {
    isLogin() {
      return this.$store.getters["auth/check"];
    }
  }
};
</script>
<style scoped>
.vc {
  top: 50px;
  width: 100%;
  /* position: relative; */
}
</style>
