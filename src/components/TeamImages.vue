<template>
  <div class="teamImgDiv">
    <div v-for="(user, index) in teams" :key="index" class="teamImgLoop">
      <img
        :src="getImage(user.img)"
        class="imgSpacing"
        :alt="user.img"
        :style="{ height: height, width: width }"
      />
      <h5 class="nameOfUser">
        {{ user.first_name + " " + user.last_name }}
      </h5>
      <p class="winLoss">
        {{ user.wins + " - " + user.losses }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "TeamImages",
  props: ["teams", "height", "width"],
  components: {},
  setup() {
    const getImage = (imagePath: unknown) => {
      return require("@/assets/" + imagePath);
    };
    return {
      getImage,
    };
  },
});
</script>

<style lang="scss" scoped>
.imgSpacing {
  height: 200px;
  width: 200px;
  margin-right: 10px;
  border-radius: 100px;
}
.teamImgDiv {
  display: flex;
  justify-content: center;
}
.teamImgLoop {
  margin: 30px;
}
.nameOfUser {
  text-align: center;
  margin-top: 30px;
}
.winLoss {
  text-align: center;
}
</style>
