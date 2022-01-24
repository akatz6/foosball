import { User } from "@/models/user";

export const mutations = {
  setUsers(state: any, payload: User) {
    state.userArr.push(payload);
  },
  emptyUsersArray(state: any) {
    state.userArr = [];
  },
  setTeamOne(state: any, payload: User) {
    state.teamOne.push(payload);
  },
  emptyTeams(state: any) {
    state.teamOne = [];
    state.teamTwo = [];
  },
  setTeamTwo(state: any, payload: User) {
    state.teamTwo.push(payload);
  },
  updateUsersTable(state: any, payload: User[]) {
    state.userArr = payload;
  },
  setOrderByPlayerNameDesc(state: any, payload: User[]) {
    //TODO need to finish logic
    payload = payload.sort((a: any, b: any) => {
      return b.last_name < a.last_name ? 1 : 0;
    });
    state.userArr = payload;
  },
  setOrderByPlayerNameASC(state: any, payload: User[]) {
    //TODO need to finish logic
    payload = payload.sort((a: any, b: any) => a.last_name - b.last_name);
    state.userArr = payload;
  },
  setTeamSize(state: any, size: number) {
    state.teamSize = size;
  },
  setPoints(state: any, points: number) {
    state.points = points;
  },
  setRandom(state: any, random: boolean) {
    state.random = random;
  },
  setProgressBarLength(state: any, value: string) {
    state.progressBarLength = value + "%";
  },
  emptyProgressBar(state: any) {
    state.progressBarLength = "0%";
  },
  setTeamWinner(state: any, user: User[]) {
    state.teamWinner = user;
  },
  setFreshData(state: any) {
    state.fresh = !state.fresh;
  },
};
