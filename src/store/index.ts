import { createStore } from "vuex";
import foosball from "./modules/foosball";

export default createStore({
  modules: {
    foosball,
  },
});
