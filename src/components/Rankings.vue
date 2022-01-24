<template>
  <div class="home">
    <div class="topRow">
      <h1>Standings</h1>
      <gameOptionsModal />
    </div>
    <table class="table table-striped table-bordered table-sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col" class="alignLeft">Player</th>
          <th scope="col">
            <sort-table :column="'Wins'" />
          </th>
          <th scope="col">
            <sort-table :column="'Losses'" />
          </th>
          <th scope="col">
            <sort-table :column="'Win%'" />
          </th>
          <th scope="col">Last Played</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in usersArr" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td class="alignLeft">
            <img :src="getImage(user.img)" class="imgSpacing" :alt="user.img" />
            <!-- <img :src="require(`@/assets/${user.img}`)" alt=""> -->
            {{ user.first_name + " " + user.last_name }}
          </td>
          <td>{{ user.wins }}</td>
          <td>{{ user.losses }}</td>
          <td>
            {{
              user.wins === 0
                ? 0
                : ((user.wins / (user.losses + user.wins)) * 100).toFixed(0) +
                  "%"
            }}
          </td>
          <td>{{ user.last_played }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import SortTable from "./SortTable.vue";
import GameOptionsModal from "../modals/GameOptionsModal.vue";
export default defineComponent({
  name: "Rankings",
  components: {
    SortTable,
    GameOptionsModal,
  },
  setup() {
    const store = useStore();
    const refreshData = store.getters["foosball/getFreshData"];
    if (refreshData) {
      store.dispatch("foosball/setData");
      store.dispatch("foosball/setFreshData");
    }

    store.dispatch("foosball/setTeamSize", 4);
    store.dispatch("foosball/setPoints", 3);
    store.dispatch("foosball/setRandom", true);
    const usersArr = computed(() => store.getters["foosball/getUsers"]);
    store.dispatch("foosball/setOrderByWinPercentageDesc", usersArr.value);

    const getImage = (imagePath: unknown) => {
      return require("@/assets/" + imagePath);
    };

    return {
      usersArr,
      getImage,
    };
  },
});
</script>

<style lang="scss" scoped>
.topRow {
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 0 auto;
}

.alignLeft {
  text-align: left;
}
.table {
  width: 80%;
  margin: 50px auto;
}
.imgSpacing {
  height: 20px;
  width: 20px;
  margin-right: 10px;
  border-radius: 25px;
}
</style>
