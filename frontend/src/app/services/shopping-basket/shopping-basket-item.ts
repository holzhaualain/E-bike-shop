export class ShoppingBasketItem {
  public shoppingBasketID: string = '';
  public articleID: string = '';
  public articleName: string =  '';
  public articleBrand: string =  '';
  public articlePrice: number =  null;
  public imageURL: string =  '';
  public articlePriceSum: number =  null;
  public articleAvailability: boolean =  null;
  public articleAmount: number =  null;
  public itemNumber: string =  null;
  public articleQueryParameter: string =  '';

  constructor(shoppingBasketID: string, articleID: string, articleAmount: number) {
    this.shoppingBasketID = shoppingBasketID;
    this.articleID = articleID;
    this.articleAmount = articleAmount;
  }



}
