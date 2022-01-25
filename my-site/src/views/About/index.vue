<template>
  <div class="about-container" v-loading="loading || !srcLoaded">
    <iframe
      v-if="src"
      class="about-content"
      :src="data"
      frameborder="0"
      @load="srcLoaded = true"
    ></iframe>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getAbout } from "@/api/about.js";
export default {
  data() {
    return {
      srcLoaded: false,
      data: "",
    };
  },
  computed: mapState("about", {
    src: "data",
    loading: "loading",
  }),
  created() {
    this.$store.dispatch("about/fetchAbout");
    getAbout().then((res) => {
      this.data = res;
    });
  },
};
</script>

<style scoped lang="less">
.about-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.about-content {
  width: 100%;
  height: 100%;
  display: block;
  box-sizing: border-box;
}
</style>
