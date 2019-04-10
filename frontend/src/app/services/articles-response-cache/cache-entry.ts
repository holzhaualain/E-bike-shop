import {HttpResponse} from '@angular/common/http';

export class CacheEntry {
  public url: string;
  public response: HttpResponse<any>;
  public lastRead: number;

  constructor(url: string, response: HttpResponse<any>, lastRead: number) {
    this.response = response;
    this.lastRead = lastRead;
  }
}
