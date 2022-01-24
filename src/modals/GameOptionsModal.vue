<template>
  <div>
    <button
      type="button"
      class="btn btn-danger"
      data-bs-toggle="modal"
      data-bs-target="#startGame"
    >
      Start Game
    </button>

    <div
      class="modal fade"
      id="startGame"
      tabindex="-1"
      aria-labelledby="startGameLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="startGameLabel">Game Settings</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p class="modalBodyHeading">Team Format</p>
            <div class="btn-group teamsFormat" role="group">
              <input
                type="radio"
                class="btn-check"
                value="2"
                name="teamFormat"
                id="btnradio1"
                autocomplete="off"
                checked
                @click="setTeamSize(4)"
              />
              <label class="btn btn-outline-primary" for="btnradio1">2x2</label>

              <input
                type="radio"
                class="btn-check"
                name="teamFormat"
                id="btnradio2"
                value="1"
                autocomplete="off"
                @click="setTeamSize(2)"
              />
              <label class="btn btn-outline-primary" for="btnradio2">1x1</label>
            </div>
            <p class="gamesText">Number of Games</p>
            <div class="btn-group" role="group">
              <input
                type="radio"
                class="btn-check"
                name="points"
                id="btnradio3"
                autocomplete="off"
                value="5"
                @click="setPoints(5)"
              />
              <label class="btn btn-outline-primary" for="btnradio3">5</label>

              <input
                type="radio"
                class="btn-check"
                name="points"
                id="btnradio4"
                autocomplete="off"
                checked
                value="3"
                @click="setPoints(3)"
              />
              <label class="btn btn-outline-primary" for="btnradio4">3</label>
              <input
                type="radio"
                class="btn-check"
                name="points"
                id="btnradio5"
                autocomplete="off"
                value="1"
                @click="setPoints(1)"
              />
              <label class="btn btn-outline-primary" for="btnradio5">1</label>
            </div>
          </div>
          <div class="randomPlayers">
            <input
              class="form-check-input"
              type="checkbox"
              id="check1"
              name="option1"
              value="something"
              @click="setRandom"
              checked
            />
            <label class="form-check-label">Randomize Teams</label>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <router-link to="/checkin">
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Next
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "GameOptionsModal",
  setup() {
    const store = useStore();
    let random = store.getters["foosball/getRandom"];

    const setPoints = (points: number) => {
      store.dispatch("foosball/setPoints", points);
    };

    const setTeamSize = (size: number) => {
      store.dispatch("foosball/setTeamSize", size);
    };

    const setRandom = () => {
      random = !random;
      store.dispatch("foosball/setRandom", random);
    };

    return {
      setPoints,
      setTeamSize,
      setRandom,
    };
  },
});
</script>

<style lang="scss" scoped>
.modal-body {
  text-align: left;
}
.form-check-label {
  padding-left: 10px;
}
.modalBodyHeading {
  margin-bottom: 0px;
}
.gamesText {
  margin-bottom: 0px;
}
.teamsFormat {
  margin-bottom: 15px;
}
.randomPlayers {
  display: flex;
  margin-left: 20px;
  padding-bottom: 10px;
}
</style>
