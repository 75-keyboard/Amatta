<template>
  <div v-if="clicked">
    <output v-if="preview">
      <img :src="preview" alt class="only_image" @click="togglePhoto" />
    </output>
  </div>
  <div v-else class="photo-form">
    <v-card class="vc">
      <Navbar post-title="食材を登録" />
      <v-card-text v-show="loading" class="panel">
        <Loader>Sending your photo...</Loader>
      </v-card-text>
      <v-card-text v-show="! loading">
        <v-file-input
          label="File input"
          filled
          prepend-icon="mdi-camera"
          @change="onFileChange"
          color="orange"
        ></v-file-input>
        <output v-if="preview">
          <img :src="preview" alt class="post_image" @click="togglePhoto" />
        </output>

        <h2>いつリマインドする？(必須)</h2>
        <v-row>
          <v-chip-group active-class="orange--text" v-model="interval">
            <v-col cols="4">
              <v-chip value="+1 day" x-large>&nbsp;&nbsp;&nbsp;&nbsp;明日&nbsp;&nbsp;&nbsp;&nbsp;</v-chip>
            </v-col>
            <v-col cols="4">
              <v-chip value="+3 days" x-large>&nbsp;&nbsp;&nbsp;3日後&nbsp;&nbsp;&nbsp;</v-chip>
            </v-col>
            <v-col cols="4">
              <v-chip value="+7 days" x-large>1週間後</v-chip>
            </v-col>
          </v-chip-group>
        </v-row>
        <v-textarea
          filled
          label="メモ(任意)"
          auto-grow
          v-model="memo"
          color="orange"
          rows="1"
          row-height="15"
        ></v-textarea>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions v-show="! loading">
        <v-spacer></v-spacer>
        <v-btn @click="submit">登録</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
export default {
  components: {
    Loader,
    Navbar
  },
  data() {
    return {
      loading: false,
      preview: null,
      photo: null,
      name: "",
      interval: "",
      memo: "",
      clicked: false
    };
  },
  methods: {
    onFileChange(event) {
      console.log(event);
      //   if (event.target.files.length === 0) {
      //     this.reset();
      //     return false;
      //   }

      //   if (!event.target.files[0].type.match("image.*")) {
      //     this.reset();
      //     return false;
      //   }

      const reader = new FileReader();

      reader.onload = e => {
        console.log(e.target);
        this.preview = e.target.result;
      };

      reader.readAsDataURL(event);
      this.photo = event;
    },
    reset() {
      this.preview = "";
      this.photo = null;
      this.$el.querySelector('input[type="file"]').value = null;
    },
    async submit() {
      this.loading = true;
      const formData = new FormData();
      formData.append("photo", this.photo);
      formData.append("name", this.name);
      formData.append("interval", this.interval);
      formData.append("memo", this.memo);
      const response = await axios.post("/api/posts", formData);

      this.loading = false;
      //   this.$store.commit("message/setContent", {
      //     content: "写真が投稿されました！",
      //     timeout: 6000
      //   });
      this.$router.push(`/`);
    },
    togglePhoto() {
      this.clicked = !this.clicked;
    }
  }
};
</script>
<style scoped>
.post_image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}
.only_image {
  width: 100%;
  height: 100%;
}
.vc {
  top: 50px;
}
</style>
