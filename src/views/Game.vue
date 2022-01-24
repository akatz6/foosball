<template>
  <div>
    <play />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Play from "../components/Play.vue";
export default defineComponent({
  name: "Game",
  components: { Play },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.scores {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 200px;
  font-size: 200px;
}

.textdesc {
  margin-top: 5px;
  text-align: center;
}
</style>
