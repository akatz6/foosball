<template>
  <div class="home">
    <players />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Players from "@/components/Players.vue";
export default defineComponent({
  name: "CheckIn",
  components: {
    Players,
  },
  setup() {
    return {};
  },
});
</script>
