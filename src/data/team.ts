import { User } from "./user";

export class Team {
  public members: User[];
  public point: number;
  public name: string;

  constructor(name: string) {
    this.name = name;
    this.members = [];
    this.point = 0;
  }

  public addMember(user: User) {
    this.members = [...this.members, user];
  }

  public getUserById(user_id: string) {
    return this.members.find(member => member.id === user_id);
  }

  public removeMember(user_id: string) {
    const members = this.members.filter(member => member.id !== user_id);
    this.members = members;
  }
}
