import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  public static setItem(key: string, item: string): void {
    localStorage.setItem(key, item);
  }

  public static getItem(key: string): string {
    return localStorage.getItem(key);
  }

  public static removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
