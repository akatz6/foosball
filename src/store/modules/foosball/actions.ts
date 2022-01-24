import postJosn from "../../../../foosball_players.json";
import { User } from "@/models/user";

export const actions = {
  setData({ commit }: any) {
    commit("emptyUsersArray");
    postJosn["foosball_players"].forEach((element, id) => {
      const playerObj = {
        id,
        first_name: element.first_name,
        last_name: element.last_name,
        last_played: element.last_played,
        img: element.img,
        wins: element.wins,
        losses: element.losses,
      } as User;
      commit("setUsers", playerObj);
    });
  },
  updateUsersTable({ commit }: any, user: User[]) {
    commit("updateUsersTable", user);
  },
  setOrderByWinPercentageDesc({ commit }: any, payload: User[]) {
    payload = payload.sort(
      (a: any, b: any) =>
        b.wins / (b.losses + b.wins) - a.wins / (a.losses + a.wins)
    );
    commit("updateUsersTable", payload);
  },
  setOrderByWinPercentageAsc({ commit }: any, payload: User[]) {
    payload = payload.sort(
      (a: any, b: any) =>
        a.wins / (a.losses + a.wins) - b.wins / (b.losses + b.wins)
    );
    commit("updateUsersTable", payload);
  },
  // setOrderByPlayerNameDesc({ commit }: any, payload: User[]) {
  //   commit("setOrderByPlayerNameDesc", payload);
  // },
  // setOrderByPlayerNameASC({ commit }: any, payload: User[]) {
  //   commit("setOrderByPlayerNameASC", payload);
  // },
  setOrderByWinsDesc({ commit }: any, payload: User[]) {
    payload = payload.sort((a: any, b: any) => b.wins - a.wins);
    commit("updateUsersTable", payload);
  },
  setOrderByWinsAsc({ commit }: any, payload: User[]) {
    payload = payload.sort((a: any, b: any) => a.wins - b.wins);
    commit("updateUsersTable", payload);
  },
  setOrderByLossesDesc({ commit }: any, payload: User[]) {
    payload = payload.sort((a: any, b: any) => b.losses - a.losses);
    commit("updateUsersTable", payload);
  },
  setOrderByLossesAsc({ commit }: any, payload: User[]) {
    payload = payload.sort((a: any, b: any) => a.losses - b.losses);
    commit("updateUsersTable", payload);
  },
  setOrderByLastPlayedDesc({ commit }: any, payload: User[]) {
    //TODO need to finish logic
    commit("setOrderByLastPlayedDesc", payload);
  },
  setOrderByLastPlayedASC({ commit }: any, payload: User[]) {
    //TODO need to finish logic
    commit("setOrderByLastPlayedASC", payload);
  },
  setTeamSize({ commit }: any, size: number) {
    commit("setTeamSize", size);
  },
  setPoints({ commit }: any, points: number) {
    commit("setPoints", points);
  },
  setRandom({ commit }: any, random: boolean) {
    commit("setRandom", random);
  },
  setProgressBarLength({ commit }: any, payload: any) {
    const progressBar =
      payload.increaseBar + parseInt(payload.progressBarLength.value);
    commit("setProgressBarLength", progressBar.toString());
  },
  emptyProgressBar({ commit }: any) {
    commit("emptyProgressBar");
  },
  setTeamOne({ commit }: any, users: User[]) {
    commit("setTeamOne", users);
  },
  setTeamTwo({ commit }: any, users: User[]) {
    commit("setTeamTwo", users);
  },
  setTeamWinner({ commit }: any, users: User[]) {
    commit("setTeamWinner", users);
  },
  emptyTeams({ commit }: any) {
    commit("emptyTeams");
  },
  setFreshData({ commit }: any) {
    commit("setFreshData");
  },
};
