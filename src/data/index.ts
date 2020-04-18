// export const data = {
//   users: new Set(),
//   buzzes: new Set()
// }

import {Team} from "./team";
import {User} from "./user";

export class Data {
  public buzzes: Set<string>;
  public teams: Team[];

  constructor() {
    this.buzzes = new Set();
    this.teams = [];
  }

  addUser(user: User, team_name: string) {
    const teams = this.teams.filter(team => team.name === team_name);
    if (teams.length > 0) {
      return teams[0].addMember(user);
    }
    const team = new Team(team_name);
    team.addMember(user)
    this.teams = [...this.teams, team];
  }

  getUsers() {
    const teams_members = this.teams.map(team => team.members.map(member => ({...member, team: team.name})))
    return teams_members.reduce(function(prev, curr) {
      return prev.concat(curr);
    }, [])
  }

  incrementPoint(team_name: string) {
    const team = this.teams.find(team => team.name === team_name)
    if (team) {
      team.point += 1;
    }
  }

  decrementPoint(team_name: string) {
    const team = this.teams.find(team => team.name === team_name)
    if (team) {
      team.point -= 1;
    }
  }

  getBuzzes() {
    return [...this.buzzes].map(buzz => {
      const [name, team] = buzz.split('-');
      return { name, team };
    });
  }

  getTeams() {
    return this.teams;
  }

  getData() {
    return {
      users: this.getUsers(),
      buzzes: this.getBuzzes(),
      teams: this.getTeams(),
    };
  }

  resetBuzzes() {
    this.buzzes = new Set();
  }

  resetTeams() {
    this.teams = [];
  }

  resetAll() {
    this.resetBuzzes();
    this.resetTeams();
  }
}
