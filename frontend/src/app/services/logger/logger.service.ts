import {environment} from '../../../environments/environment';
import dateformat from 'dateformat';
import {Injectable} from '@angular/core';

/*
  In production mode nothing will be logged
 */
@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  public static consoleLog(logger: string, methodName: string, message: string): void {
    if (!environment.production)  {
      console.log(LoggerService.formatMessage(logger, methodName, message));
    }
  }

  public static consoleError(logger: string, methodName: string, message: string): void {
    if (!environment.production)  {
      console.error(LoggerService.formatMessage(logger, methodName, message));
    }
  }

  private static formatMessage(logger: string, methodName: string, message: string): string  {
    const formatted: string = logger + '.' + methodName + '()';
    return dateformat(new Date(), 'dd.mmm hh:MM:ss:l ') + formatted.padEnd(45) + message;
  }


}
