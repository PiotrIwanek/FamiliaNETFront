export class User {


  id: string;
  name: string;
  surename: string;
  login: string;
  password: string;
  role: string;

  constructor(id: string, name: string, surname: string, login: string, password: string, role: string) {
    this.id = id;
    this.name = name;
    this.surename = surname;
    this.login = login;
    this.password = password;
    this.role = role;
  }

  public static fromData(data: User) {
    return new User(data.id, data.name, data.surename, data.login, data.password, data.role);
  }

}
