<template>
  <div>
    <div v-if="posts.length">
      <v-list v-for="(post, index) in posts" :key="post.id">
        <v-list-item-group>
          <v-list-item>
            <v-row>
              <v-col cols="7">
                <v-list-item-group>
                  <Post :item="post" />
                </v-list-item-group>
              </v-col>
              <v-col cols="5" class="downer">
                <v-row>
                  <v-col cols="8">
                    <RouterLink
                      :to="`/posts/${post.id}`"
                      :title="`View the photo by ${post.user.name}`"
                    >
                      <v-list-item-content v-if="calInterval(post.created_at, post.dead_at) == 0">
                        <span class="hot_message_content">くさった！</span>
                      </v-list-item-content>
                      <v-list-item-content
                        v-else-if="calInterval(post.created_at, post.dead_at) < 1"
                      >
                        <span class="hot_message_content">今日！</span>
                      </v-list-item-content>
                      <v-list-item-content v-else>
                        <span>
                          あと
                          <span class="num">{{calInterval(post.created_at, post.dead_at)}}</span>&nbsp;日
                        </span>
                      </v-list-item-content>
                    </RouterLink>
                  </v-col>
                  <v-col cols="4">
                    <v-list-item-content align-content-center>
                      <v-dialog v-model="dialog" persistent max-width="350">
                        <template v-slot:activator="{ on }">
                          <v-btn icon v-on="on" @click="selectPost(post, index)">
                            <v-icon>mdi-food-fork-drink</v-icon>
                          </v-btn>
                        </template>
                        <v-card>
                          <img src="../clap1.svg" />

                          <v-card-actions>
                            <div class="flex-grow-1"></div>
                            <v-btn
                              color="green darken-1"
                              text
                              @click="removePost()"
                              centered
                            >閉じる</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-list-item-content>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-list-item>

          <v-divider></v-divider>
        </v-list-item-group>
      </v-list>
    </div>
    <div v-else>
      <img src="../reizouko.svg" class="reizo" />
    </div>
    <v-btn class="mx-2 fb" fab dark color="orange" @click="p">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>
<script>
import Post from "../components/Post.vue";

export default {
  components: {
    Post
  },
  data() {
    return {
      posts: [],
      dialog: false,
      selectedPost: 1,
      selectedIndex: 1,
    };
  },
  methods: {
    async fetchPosts() {
      const response = await axios.get("/api/posts");
      //   console.log(response);
      this.posts = response.data.data;
    },
    p() {
      this.$router.push(`/posts`);
    },
    calInterval(created_at, dead_at) {
      let sub_date =
        Date.parse(dead_at.replace(/-/g, "/")) -
        Date.parse(created_at.replace(/-/g, "/"));
      sub_date /= 3600 * 1000 * 24;
      return Math.ceil(sub_date);
    },
    async selectPost(post, index) {
	this.selectedIndex = index;
	this.selectedPost = post;
    },
    async removePost() {
      this.dialog = false;

      console.log("Delete", this.selectedIndex,  this.selectedPost.id);
      const response = await axios.delete(`/api/posts/${this.selectedPost.id}`);
      this.posts.splice(this.selectedIndex, 1);
      //   this.$router.go({ path: this.$router.currentRoute.path, force: true });
    },

  },
  watch: {
    $route: {
      async handler() {
        await this.fetchPosts();
      },
      immediate: true
    }
  }
};
</script>
<style scoped>
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
.reizo {
  height: 600px;
  width: 300px;
  margin: 0px 0px 0px 30px;
}
.num {
  font-size: 30px;
  color: orange;
}
</style>


