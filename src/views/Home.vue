<template>
  <div class="home">
    <rankings />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Rankings from "@/components/Rankings.vue";
export default defineComponent({
  name: "Home",
  components: {
    Rankings,
  },
  setup() {
    return {};
  },
});
</script>
