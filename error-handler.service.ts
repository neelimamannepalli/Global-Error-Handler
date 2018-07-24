import { Injectable, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { environment } from '../../../environments/environment';

@Injectable()
export class ErrorHandlerService {
    public appError$: EventEmitter<any>;
    public authError$: EventEmitter<any>;

    constructor() {
        this.appError$ = new EventEmitter();
        this.authError$ = new EventEmitter();
     }

    public Error(message?: string) {
        this.appError$.emit(message || '');
    }

    public UnAuthorized(message?: string) {
        this.authError$.emit(message || '');
    }
}
