<template>
  <RouterLink :to="`/posts/${item.id}`" :title="`View the photo by ${item.user.name}`">
    <v-row>
      <v-col>
        <v-list-item-avatar size="80">
          <img class="post_image" :src="item.url" :alt="`Photo by ${item.user.name}`" />
        </v-list-item-avatar>
      </v-col>
    </v-row>
  </RouterLink>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      inteval: 0
    };
  },
  methods: {}
};
</script>
<style scoped>
.post_image {
  height: 70px;
  width: 70px;
  object-fit: cover;
}
.post_interval {
  position: relative;
}
.num {
  font-size: 30px;
  color: orange;
}
span {
  color: gray;
}
</style>
