import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { LoggerService } from './logger.service';
import { NotificationService } from './notification.service';
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
constructor(private injector: Injector) { }
handleError(error) {
    const loggingService = this.injector.get(LoggerService);
    const notificationService = this.injector.get(NotificationService);
    const message = error.message ? error.message : error.toString();
    // log on the server
    loggingService.error(message);
    // notificationService.showError(message);
    // throw error;
  }
}
