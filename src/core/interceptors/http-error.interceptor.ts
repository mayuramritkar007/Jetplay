import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
// import { rootRoute } from '@angular/router/src/router_module';
import { Router } from '@angular/router';
// import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    error = false;
    constructor(
        private snackBar: MatSnackBar, 
        private router: Router, 
        // private spinner: NgxSpinnerService
    ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        // console.log('in intercept http req before return', request, 'Next', next);
        const gameKey = localStorage.getItem('GameKey');
        if (gameKey !== undefined && gameKey !== null && gameKey !== '') {

            request = request.clone({
                headers: request.headers.set('secret-key', gameKey)
            });
        }
        return next.handle(request)
            .pipe(
                map((event: HttpEvent<any>) => {

                    if (event instanceof HttpResponse) {
                        if (event.body.status.code !== 200) {
                            // console.log('event--->>>', event.body.data);

                            // this.spinner.hide();
                            if (event.body.status.code === 1000010 || event.body.status.code === 1000004
                                || event.body.status.code === 1000014) {
                                this.router.navigateByUrl('/login');
                            }

                            const extra = event.body.status.extra_data;
                            if (extra !== '' && typeof (extra) === typeof ('')) {
                                this.snackbarDisplay(extra);
                            } else {
                                // console.log('eeee', typeof (extra));
                                this.snackbarDisplay(event.body.status.message);
                                // if (event.body.data.message === 'Your session has expired.') {
                                //     this.router.navigateByUrl('/login');
                                // }
                            }
                            return throwError({ ngNavigationCancelingError: true });
                        }
                    }
                    return event;
                }),
                catchError((error: HttpErrorResponse) => {
                    let data = {};
                    data = {
                        statusText: error.statusText,
                        statusCode: error.status
                    };
                    console.log('catch error ------->', data);
                    this.snackbarDisplay('Internal Server Error. Please contact JetPlay team.');
                    return throwError({ ngNavigationCancelingError: true });
                })
            );

        //     .pipe(
        //         tap(
        //             event => this.handleResponse(request, event),
        //             // error => this.handleError(request, error)
        //         )
        //     ).pipe(catchError((error: HttpErrorResponse) => {
        //         this.handleError(request, error);
        //         return throwError(error.message);
        //     }));
        // if (!this.error) {
        //     return obj;
        // } else {
        //     return throwError({ ngNavigationCancelingError: true });
        // }


        // .pipe((event: HttpEvent<any>) => {
        //     if (event instanceof HttpResponse) {
        //         console.log('In Interceptor', event);
        //     }
        // });
        // .pipe(
        //     // retry(1),
        //     catchError((error: HttpErrorResponse) => {
        //         let errorMessage = '';
        //         console.log(error);
        //         if (error.error instanceof ErrorEvent) {
        //             // client-side error
        //             errorMessage = `Error: ${error.error.message}`;
        //         } else {
        //             // server-side error
        //             errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        //         }
        //         window.alert(errorMessage);
        //         return throwError(errorMessage);
        //     })
        // );
    }
    snackbarDisplay(data:any) {
        this.snackBar.open(data, 'Dismiss', { duration: 5000 });
    }

    // handleResponse(req: HttpRequest<any>, event) {
    //     if (event instanceof HttpResponse) {
    //         if (event.body.status.code !== 200) {
    //             window.alert(event.body.data.message);
    //             this.error = true;
    //         }
    //         // console.log('Request for ', req.url,
    //         //     ' Response Status ', event.status,
    //         //     ' With body ', event.body);
    //     }
    // }

    // handleError(req: HttpRequest<any>, event) {
    //     console.error('Request for ', req.url,
    //         ' Response Status ', event.status,
    //         ' With error ', event.error);
    // }


}
