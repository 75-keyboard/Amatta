<template>
  <v-alert class="mb-4" v-show="message">{{ message }}</v-alert>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      message: state => state.message.content
    })
  }
};
</script>
