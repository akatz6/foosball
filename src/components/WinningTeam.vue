<template>
  <div class="winningTeam">
    <div class="winningTeamDiv">
      <h3>Game Over</h3>
    </div>
    <br />
    <hr />
    <br />
    <div class="congradWinner">
      <h1 class="congradWinnerText">You Win</h1>
      <img src="../assets/celebrate.png" alt="celebrate" />
    </div>
    <teamImages :teams="teamWinner" :height="height" :width="height" />
    <router-link to="/"
      ><button type="button" class="btn btn-danger">
        Go To Standings
      </button></router-link
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import TeamImages from "./TeamImages.vue";
export default defineComponent({
  name: "WinningTeam",
  components: {
    TeamImages,
  },
  setup() {
    const store = useStore();
    const teamWinner = store.getters["foosball/getTeamWinner"];
    const height = "200px";
    return {
      teamWinner,
      height,
    };
  },
});
</script>

<style lang="scss" scoped>
.winningTeam {
  margin-top: 30px;
  width: 80%;
  margin: auto;
}
.winningTeamDiv {
  display: flex;
  margin-top: 30px;
}
.congradWinner {
  display: flex;
  justify-content: center;
}
.congradWinnerText {
  font-size: 150px;
}
img {
  height: 170px;
}
.btn-danger {
  width: 200px;
}
</style>
