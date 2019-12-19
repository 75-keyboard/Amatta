<template>
  <div>
    <v-card class="vc">
      <Navbar post-title="通知リスト" />
      <v-list v-for="(message, index) in messages" :key="message.id">
        <v-list-item-group class="message downer" @click="removeMessage(message, index)">
          <RouterLink :to="`/posts/${message.post_id}`">
            <v-list-item>
              <v-alert dense outlined type="error" x-large icon="mdi-fire" class="hot_message">
                <v-row>
                  <span class="hot_message_content">冷蔵庫の中に賞味期限が近い商品があります！</span>
                </v-row>
              </v-alert>
            </v-list-item>
          </RouterLink>
        </v-list-item-group>
        <v-divider></v-divider>
      </v-list>
    </v-card>
    <v-btn class="mx-2 fb" fab dark color="orange" @click="p">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>
<script>
import Navbar from "../components/Navbar";
export default {
  components: {
    Navbar
  },
  data() {
    return {
      messages: [],
      dialog: false
    };
  },
  methods: {
    async fetchMessages() {
      const response = await axios.get("/api/messages");
      console.log(response.data.data);
      this.messages = response.data.data;
    },
    p() {
      this.$router.push(`/posts`);
    },

    async removeMessage(message, index) {
      const response = await axios.delete(`/api/messages/${message.id}`);
      this.messages.splice(index, 1);
    }
  },
  watch: {
    $route: {
      async handler() {
        await this.fetchMessages();
      },
      immediate: true
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
.fb {
  position: fixed;
  right: 5px;
  bottom: 60px;
}
.v-list {
  padding: 0px;
}
.downer {
  position: relative;
  top: 15px;
}
.message {
  height: 120px;
}
.hot_message_content {
  font-size: 1.5em;
}
</style>


