<template>
  <div class="choosePlayer">
    <h1>Player Check-in</h1>
    <br />
    <div>
      <p>{{ status }}</p>
      <div class="progress">
        <div
          class="progress-bar barLength"
          role="progressbar"
          aria-valuenow="0"
          aria-valuemin="0"
          aria-valuemax="100"
          :style="{ width: progressBarLength }"
        ></div>
      </div>
    </div>
    <div class="selectedPlayers">
      <div>
        <teamImages :teams="teamOne" :height="height" :width="height" />
      </div>
      <h2 class="vsText">VS</h2>
      <div>
        <teamImages :teams="teamTwo" :height="height" :width="height" />
      </div>
    </div>
    <div v-if="!random">
      <h5>Choose a player</h5>
      <div class="potentialPlayers">
        <div v-for="(user, index) in usersArr" :key="index" class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="userTracker[index]"
            v-on:change="selectedUser(index)"
          />
          <label class="form-check-label" for="flexRadioDefault1">
            {{ user.first_name + " " + user.last_name }}
          </label>
        </div>
      </div>
    </div>
    <div v-if="overMaxPlayers" class="alert alert-warning" role="alert">
      {{ teamSize }} is the max players. Please deselect players
    </div>
    <div class="buttonGroup">
      <div class="outerButton">
        <button
          type="button"
          class="btn btn-danger buttonLength"
          @click="starGame"
        >
          Start Game
        </button>
      </div>
      <div class="outerButton">
        <router-link to="/"
          ><button type="button" class="btn btn-light buttonLength">
            Cancel Game
          </button></router-link
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";
import TeamImages from "./TeamImages.vue";
export default defineComponent({
  name: "Players",
  components: { TeamImages },
  setup() {
    const userTracker = ref([]) as any;
    const store = useStore();
    const random = store.getters["foosball/getRandom"];
    store.dispatch("foosball/emptyProgressBar");
    const status = ref("Ready");
    const usersArr = computed(() => store.getters["foosball/getUsers"]);
    const teamOne = ref([]) as any;
    const teamTwo = ref([]) as any;
    const randomNumbers = ref([]) as any;
    const teamSize = computed(() => store.getters["foosball/getTeamSize"]);
    let chosenUser = 0;
    let overMaxPlayers = ref(false);
    const height = "200px";
    const progressBarLength = computed(
      () => store.getters["foosball/getProgressBarLength"]
    );
    const increaseBar = 100 / teamSize.value;
    const progressBarObj = {
      increaseBar,
      progressBarLength,
    };
    if (random) {
      while (randomNumbers.value.length < teamSize.value) {
        const randomNumber = Math.floor(Math.random() * usersArr.value.length);
        if (!randomNumbers.value.includes(randomNumber)) {
          randomNumbers.value.push(randomNumber);
        }
      }

      for (let i = 0; i < randomNumbers.value.length; i++) {
        teamOne.value.push(usersArr.value[randomNumbers.value[i]]);
        store.dispatch("foosball/setProgressBarLength", progressBarObj);

        status.value = `player {i + 1} joined`;
        i++;
        teamTwo.value.push(usersArr.value[randomNumbers.value[i]]);
        store.dispatch("foosball/setProgressBarLength", progressBarObj);
        status.value = `player {i + 1} joined`;
      }
      status.value = `Game On!`;
    }

    const selectedUser = (index: number) => {
      const foundTeamOne = teamOne.value.find(
        (element: any) => element.id === usersArr.value[index].id
      );
      if (foundTeamOne) {
        teamOne.value = teamOne.value.filter(
          (element: any) => element.id !== usersArr.value[index].id
        );
        chosenUser--;
        const progressBarObjDec = {
          increaseBar: increaseBar * -1,
          progressBarLength,
        };
        store.dispatch("foosball/setProgressBarLength", progressBarObjDec);
        status.value = `player ${chosenUser} joined`;
        return;
      }

      const foundTeamTwo = teamTwo.value.find(
        (element: any) => element.id === usersArr.value[index].id
      );
      if (foundTeamTwo) {
        teamTwo.value = teamTwo.value.filter(
          (element: any) => element.id !== usersArr.value[index].id
        );
        chosenUser--;
        const progressBarObjDec = {
          increaseBar: increaseBar * -1,
          progressBarLength,
        };
        store.dispatch("foosball/setProgressBarLength", progressBarObjDec);
        status.value = `player ${chosenUser} joined`;
        return;
      }
      if (chosenUser < teamSize.value) {
        if (teamOne.value.length <= teamTwo.value.length) {
          teamOne.value.push(usersArr.value[index]);
        } else {
          teamTwo.value.push(usersArr.value[index]);
        }
        chosenUser++;
        status.value = `player ${chosenUser} joined`;
        if (chosenUser === teamSize.value) {
          status.value = `Game On!`;
        }
        store.dispatch("foosball/setProgressBarLength", progressBarObj);
      } else {
        userTracker.value[index] = false;
        overMaxPlayers.value = true;
        setTimeout(() => {
          overMaxPlayers.value = false;
        }, 2000);
      }
    };

    const starGame = () => {
      store.dispatch("foosball/emptyTeams");
      store.dispatch("foosball/setTeamOne", teamOne.value);
      store.dispatch("foosball/setTeamTwo", teamTwo.value);
      window.location = "/#/game" as any;
    };
    return {
      status,
      progressBarLength,
      teamOne,
      teamTwo,
      random,
      usersArr,
      selectedUser,
      teamSize,
      overMaxPlayers,
      userTracker,
      starGame,
      height,
    };
  },
});
</script>

<style lang="scss" scoped>
.choosePlayer {
  text-align: left;
  width: 80%;
  margin: 0 auto;
  padding-top: 30px;
}
.selectedPlayers {
  display: flex;
  justify-content: space-evenly;
  padding-top: 50px;
  height: 500px;
}
.potentialPlayers {
  display: flex;
  flex-wrap: wrap;
}
.vsText {
  align-self: center;
}
.form-check {
  width: 200px;
}
.alert {
  width: 60%;
  margin: auto;
}
.buttonGroup {
  display: inline-grid;
  width: 100%;
  margin-top: 30px;
}
.buttonLength {
  width: 200px;
}
.outerButton {
  margin: auto;
}
</style>
