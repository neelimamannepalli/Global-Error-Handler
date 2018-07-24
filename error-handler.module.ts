import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AaAlertComponent } from './aa-alert/aa-alert.component';
import { LoggerService, NotificationService } from '@shared/error-handler-notify/services';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
// Toastr configuration
import {ToastOptions} from 'ng2-toastr';
export class CustomOption extends ToastOptions {
  animate = 'fade';
  toastLife = 10000;
  showCloseButton = true;
  positionClass = 'toast-bottom-right';
}

@NgModule({
    declarations: [
        AaAlertComponent
    ],
    imports: [
        CommonModule,
        ToastModule.forRoot(),
    ],
    providers: [
      LoggerService,
      NotificationService,
      {provide: ToastOptions, useClass: CustomOption}
    ],
    exports: [
        AaAlertComponent
    ]
})

export class ErrorHandlerModule { }

