import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Level } from './log-level';
import { Stream } from 'stream';
import { UserService } from '@shared/user/user.service';
import { User } from '@shared/user/user';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RestClientService } from '@shared/rest-services/index';

const CONSOLE_DEBUG_METHOD = console['debug'] ? 'debug' : 'log';

export class ServerErrorMessage {
    Source: string;
    Url: string;
    Message: string;
    Optional1: string;
    Optional2: string;
}

@Injectable()
export class LoggerService {
    // Set log level
    // TODO: Use some form of external configuration
    private level: Level = Level.INFO;

    private currentUser: User;
    currentUrl: string;
    logUrl = '/api/Error';
    constructor(
        private restClientService: RestClientService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) {
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                this.currentUrl = val.url;
            }
        });
        this.userService.currentUser.subscribe(user => this.currentUser = user);
    }

    error(message: any, ...optionalParams: any[]) {
        if (this.isErrorEnabled()) {
            console.error.apply(console, arguments);
            const serverErrorMessage = new ServerErrorMessage();
            serverErrorMessage.Url = this.currentUrl;
            serverErrorMessage.Source = 'CERSWeb';
            serverErrorMessage.Message = message;
            this.logErrormessageOnServer(serverErrorMessage);
        }
    }

    warn(message: any, ...optionalParams: any[]) {
        this.isWarnEnabled() && console.warn.apply( console, arguments );
    }

    info(message?: any, ...optionalParams: any[]) {
        this.isInfoEnabled() && console.info.apply( console, arguments );
    }

    debug(message: any, ...optionalParams: any[]) {
        this.isDebugEnabled() && ( <any> console )[ CONSOLE_DEBUG_METHOD ].apply( console, arguments );
    }

    log(message: any, ...optionalParams: any[]) {
        this.isLogEnabled() && console.log.apply( console, arguments );
    }

    isErrorEnabled = (): boolean => this.level >= Level.ERROR;
    isWarnEnabled = (): boolean => this.level >= Level.WARN;
    isInfoEnabled = (): boolean => this.level >= Level.INFO;
    isDebugEnabled = (): boolean => this.level >= Level.DEBUG;
    isLogEnabled = (): boolean => this.level >= Level.LOG;

    private logErrormessageOnServer(message: ServerErrorMessage): void {
        this.restClientService.post(this.logUrl, message)
            .subscribe(
            res => {
                console.log('Logged error message on the server');
            },
            err => {
                console.log('Could not log error message');
            });
    }
}

