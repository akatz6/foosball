import { User } from "@/models/user";

export const getters = {
  getUsers(state: any): User {
    return state.userArr;
  },
  getTeamSize(state: any): number {
    return state.teamSize;
  },
  getPoints(state: any): number {
    return state.points;
  },
  getRandom(state: any): boolean {
    return state.random;
  },
  getProgressBarLength(state: any): string {
    return state.progressBarLength;
  },
  getTeamOne(state: any): User {
    return state.teamOne;
  },
  getTeamTwo(state: any): User {
    return state.teamTwo;
  },
  getTeamWinner(state: any): User {
    return state.teamWinner;
  },
  getFreshData(state: any): boolean {
    return state.fresh;
  },
};
