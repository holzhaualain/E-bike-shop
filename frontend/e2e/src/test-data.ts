import {Login} from '../../src/app/services/user/login';

export class  TestData {
  public static LOGIN_NOK: Login = new Login('wrong@email.com', '1234223322233test');
  public static LOGIN_OK: Login = new Login('alain@aholzhauser.ch', 'aho');
  public static USERS: { name: string; firstname: string }[] = [
    {name: 'Ashley', firstname: 'Riot', },
    {name: 'Callo', firstname: 'Merlose', },
    {name: 'Aldous Byron', firstname: 'Bardorba', },
    {name: 'Jan', firstname: 'Rosencrantz', },
    {name: 'John', firstname: 'Hardin', },
    {name: 'Joshua Corrinne', firstname: 'Bardorba', },
    {name: 'Romeo', firstname: 'Guildenstern', },
    {name: 'Sydney', firstname: 'Losstarot', },
    {name: 'Olberic', firstname: 'Eisenberg', },
    {name: 'Tressa', firstname: 'Colozone', },
    {name: 'Primrose', firstname: 'Azelhart', },
    {name: 'Alfyn', firstname: 'Greengrass', },
    {name: 'Therion', firstname: 'Feiht', },
    {name: 'Haanit', firstname: 'Retnuh', },
  ];
  public static CUSTOMER_DATA:  { street: string; plz: string; city: string; phone: string }[] = [
    {street: 'Wiesenstrasse 2', plz: '8020', city: 'Zürich', phone: '+41 78 546 52 32' },
  ];
}
