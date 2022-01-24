<template>
  <div class="home">
    <winningTeam />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WinningTeam from "@/components/WinningTeam.vue";
export default defineComponent({
  name: "Winner",
  components: {
    WinningTeam,
  },
  setup() {
    return {};
  },
});
</script>
