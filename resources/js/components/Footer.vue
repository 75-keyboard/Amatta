<template>
  <v-footer height="50px" color="white" :fixed="true" :padless="true">
    <v-bottom-navigation grow color="orange">
      <v-btn @click="home">
        <v-icon>mdi-fridge-outline</v-icon>
      </v-btn>
      <v-btn @click="message">
        <v-icon>mdi-bell-outline</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-footer>
</template>
<script>
export default {
  methods: {
    async logout() {
      await this.$store.dispatch("auth/logout");
    },
    home() {
      this.$router.push(`/`);
    },
    message() {
      this.$router.push(`/messages`);
    }
  },
  computed: {
    isLogin() {
      return this.$store.getters["auth/check"];
    }
  }
};
</script>
<style scoped>
v-footer {
  text-align: center;
  margin: 0px, 10px, 0px, 0px;
  position: fixed;
}
</style>
