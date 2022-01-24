import { User } from "@/models/user";

export const state = () => ({
  userArr: [] as User[],
  teamOne: [] as User[],
  teamTwo: [] as User[],
  teamWinner: [] as User[],
  teamSize: 4 as number,
  points: 3 as number,
  random: true as boolean,
  fresh: true as boolean,
  progressBarLength: "0%" as string,
});
