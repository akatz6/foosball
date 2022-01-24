<template>
  <div class="sort">
    {{ columnName }}
    <div class="sortAlignment">
      <div class="sortButton" @click="sortUp">
        <i class="fas fa-caret-square-up"></i>
      </div>
      <div class="sortButton" @click="sortDown">
        <i class="fas fa-caret-square-down"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "SortTable",
  props: ["column"],
  components: {},
  setup(props: any) {
    const store = useStore();
    const columnName = ref(props.column);
    let descValue = "";
    let ascValue = "";
    const usersArr = computed(() => store.getters["foosball/getUsers"]);
    switch (columnName.value) {
      case "Wins":
        descValue = "foosball/setOrderByWinsDesc";
        ascValue = "foosball/setOrderByWinsAsc";
        break;
      case "Losses":
        descValue = "foosball/setOrderByLossesDesc";
        ascValue = "foosball/setOrderByLossesAsc";
        break;
      case "Win%":
        descValue = "foosball/setOrderByWinPercentageDesc";
        ascValue = "foosball/setOrderByWinPercentageAsc";
        break;
    }

    const sortUp = () => {
      store.dispatch(descValue, usersArr.value);
    };

    const sortDown = () => {
      store.dispatch(ascValue, usersArr.value);
    };
    return {
      columnName,
      sortUp,
      sortDown,
    };
  },
});
</script>

<style lang="scss" scoped>
.sort {
  display: flex;
}
.sortButton {
  padding-left: 3px;
}
.sortAlignment {
  margin-left: 10px;
  display: flex;
}
</style>
