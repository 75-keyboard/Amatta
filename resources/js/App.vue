<template>
  <v-app>
    <Message />
    <RouterView />
    <Footer v-if="isLogin" />
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Message from "./components/Message.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    Navbar,
    Message,
    Footer
  },
  computed: {
    isLogin() {
      return this.$store.getters["auth/check"];
    }
  }
};
</script>
