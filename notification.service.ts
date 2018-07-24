import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { NotificationType } from './notification-type';
@Injectable()
export class NotificationService {
    private userMessageSource = new Subject<UserNotification>();
    public userMessage$ = this.userMessageSource.asObservable();

    constructor(
    ) {

    }

    showSuccess(message: string) {
        this.userMessageSource.next({ Message: message, NotificationType: NotificationType.SUCCESS });
    }
    showError(message: string) {
        this.userMessageSource.next({ Message: message, NotificationType: NotificationType.ERROR });
    }
    showWarning(message: string) {
        this.userMessageSource.next({ Message: message, NotificationType: NotificationType.WARN  });
    }
    showInfo(message: string) {
        this.userMessageSource.next({ Message: message, NotificationType: NotificationType.INFO  });
    }
}

export class UserNotification {
    NotificationType: NotificationType;
    Message: string;
}
