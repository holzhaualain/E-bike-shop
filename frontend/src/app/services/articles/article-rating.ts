export class ArticleRating {
  public articleID: string = '';
  public rateUp: boolean;

  constructor(articleID: string, rateUp: boolean) {
    this.articleID = articleID;
    this.rateUp = rateUp;
  }
}
