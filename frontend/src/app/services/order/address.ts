export class Address {
  public givenname: string = '';
  public surname: string = '';
  public streetHousenumber: string = '';
  public postCode: string = '';
  public city: string = '';

  constructor(givenname: string, surname: string, streetHousenumber: string, postCode: string, city: string) {
    this.givenname = givenname;
    this.surname = surname;
    this.streetHousenumber = streetHousenumber;
    this.postCode = postCode;
    this.city = city;
  }


}
