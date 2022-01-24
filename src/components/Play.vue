<template>
  <div class="page">
    <div class="home">
      <h1>Game On!</h1>
      <br />
      <hr />
      <br />
      <div class="scoreRow">
        <div>
          <div class="border" @click="teamOneScoresPoint">
            <h1 class="scores">
              {{ teamOneScore }}
            </h1>
          </div>
          <p class="textdesc">Click to record win</p>
        </div>
        <h1 class="minus">-</h1>
        <div>
          <div class="border" @click="teamTwoScoresPoint">
            <h1 class="scores">
              {{ teamTwoScore }}
            </h1>
          </div>
          <p class="textdesc">Click to record win</p>
        </div>
      </div>
    </div>
    <div class="teamImageDiv">
      <teamImages :teams="teamOne[0]" :height="height" :width="height" />
      <h2 class="vsText">VS</h2>
      <teamImages :teams="teamTwo[0]" :height="height" :width="height" />
    </div>
    <div class="outerCancelButton">
      <router-link to="/"
        ><button type="button" class="btn btn-light">
          Cancel Game
        </button></router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import moment from "moment";
import TeamImages from "./TeamImages.vue";
export default defineComponent({
  name: "Play",
  components: { TeamImages },
  setup() {
    const store = useStore();
    const teamOne = store.getters["foosball/getTeamOne"];
    const teamTwo = store.getters["foosball/getTeamTwo"];
    if (!teamOne.length || !teamTwo.length) {
      window.location = "/#" as any;
    }
    const points = store.getters["foosball/getPoints"];
    const teamOneScore = ref(0);
    const teamTwoScore = ref(0);
    const getImage = (imagePath: unknown) => {
      return require("@/assets/" + imagePath);
    };
    const height = "100px";
    const teamOneScoresPoint = () => {
      teamOneScore.value++;
      if (teamOneScore.value === points) {
        const usersArr = computed(() => store.getters["foosball/getUsers"]);
        store.dispatch("foosball/emptyTeams");
        for (let i = 0; i < teamOne[0].length; i++) {
          teamOne[0][i].wins += 1;
          teamOne[0][i].last_played = moment().format("MMM DD YYYY");
        }
        store.dispatch("foosball/updateUsersTable", usersArr.value);
        for (let i = 0; i < teamTwo[0].length; i++) {
          teamTwo[0][i].losses += 1;
          teamTwo[0][i].last_played = moment().format("MMM DD YYYY");
        }
        store.dispatch("foosball/setTeamWinner", teamOne[0]);
        window.location = "/#/winner" as any;
      }
    };
    const teamTwoScoresPoint = () => {
      teamTwoScore.value++;
      if (teamTwoScore.value === points) {
        const usersArr = computed(() => store.getters["foosball/getUsers"]);
        store.dispatch("foosball/emptyTeams");
        for (let i = 0; i < teamTwo[0].length; i++) {
          teamTwo[0][i].wins += 1;
          teamTwo[0][i].last_played = moment().format("MMM DD YYYY");
        }
        store.dispatch("foosball/updateUsersTable", usersArr.value);
        for (let i = 0; i < teamTwo[0].length; i++) {
          teamOne[0][i].losses += 1;
          teamOne[0][i].last_played = moment().format("MMM DD YYYY");
        }
        store.dispatch("foosball/setTeamWinner", teamTwo[0]);
        window.location = "/#/winner" as any;
      }
    };
    return {
      teamOneScore,
      teamTwoScore,
      teamOne,
      teamTwo,
      getImage,
      teamOneScoresPoint,
      teamTwoScoresPoint,
      height,
    };
  },
});
</script>

<style lang="scss" scoped>
.page {
  margin-top: 30px;
}
.home {
  width: 80%;
  margin: auto;
  text-align: left;
}

.scoreRow {
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin: auto;
}

.outerCancelButton {
  margin: auto;
}

.btn-light {
  width: 200px;
}

.border {
  height: 300px;
  width: 200px;
  border: black 2px dotted;
}
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

.vsText {
  align-self: center;
}

.minus {
  align-items: center;
  font-size: 200px;
}
.teamImageDiv {
  display: flex;
  justify-content: center;
}
</style>
