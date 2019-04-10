export class User {
  public name: string;
  public firstname: string;
  public email: string;
  public pwd: string;
  public type: string;
  public token: string;
  public _id: string;


  constructor(_id: string, firstname: string, name: string, email: string, pwd: string, type: string ) {
    this._id = _id;
    this.firstname = firstname;
    this.name = name;
    this.email = email;
    this.pwd = pwd;
    this.type = type;
  }




}
