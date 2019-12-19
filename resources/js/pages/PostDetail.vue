<template>
  <v-card class="vc">
    <Navbar post-title="食材情報" />
    <v-card-text>
      <div v-if="post" class="photo-detail">
        <div v-if="clicked">
          <img :src="post.url" class="only_image" alt @click="togglePhoto" />
        </div>
        <div v-else class="photo-detail">
          <h2>{{ post.name }}</h2>
          <figure class="post-detail__pane post-detail__image my-auto">
            <img :src="post.url" class="post_image" alt @click="togglePhoto" />
            <figcaption class="cap_right">追加した日: {{ post.created_at }}</figcaption>
          </figure>
          <div class="post-detail__pane">
            <v-alert dense outlined type="error" x-large icon="mdi-fire" class="hot_message">
              <v-row>
                <span v-if="getInterval() < 1" class="hot_message_content">今すぐ料理しなきゃやばい！</span>
                <span v-else class="hot_message_content">
                  あと
                  <span class="num">{{getInterval()}}</span>&nbsp;日で使い切りましょう！
                </span>
              </v-row>
            </v-alert>
            <v-card color="#E5E5E5">
              <v-card-title class="text__gray">
                <h6>メモ欄</h6>
              </v-card-title>
              <v-card-text>
                <div>{{ post.memo }}</div>
              </v-card-text>
            </v-card>
          </div>
        </div>
      </div>
    </v-card-text>
    <v-btn class="mx-2 fb" fab dark color="orange" @click="p">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
import Navbar from "../components/Navbar";
export default {
  components: {
    Navbar
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      post: null,
      clicked: false
    };
  },
  methods: {
    async fetchPost() {
      const response = await axios.get(`/api/posts/${this.id}`);
      console.log(response);
      this.post = response.data;
    },
    togglePhoto() {
      this.clicked = !this.clicked;
    },
    getInterval() {
      console.log(this.post);
      let sub_date =
        Date.parse(this.post.dead_at.replace(/-/g, "/")) -
        Date.parse(this.post.created_at.replace(/-/g, "/"));
      sub_date /= 3600 * 1000 * 24;
      return Math.ceil(sub_date);
    },
    p() {
      this.$router.push(`/posts`);
    }
  },
  watch: {
    $route: {
      async handler() {
        await this.fetchPost();
      },
      immediate: true
    }
  }
};
</script>
<style scoped>
.post_image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  margin: 50px 0px 0px 0px;
}
.only_image {
  width: 100%;
  height: 100%;
  margin: 50px 0px 0px 0px;
}

.fb {
  position: fixed;
  right: 5px;
  bottom: 60px;
}
.v-list {
  padding: 0px;
}

.hot_message {
  margin: 15px 0px;
  width: 100%;
}

.hot_message_content {
  text-align: center;
  width: 100%;
}

.cap_right {
  text-align: right;
}
</style>
