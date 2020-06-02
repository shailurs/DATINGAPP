import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()

export  class ErrorInterceptor implements HttpInterceptor{
    intercept(
        req: import('@angular/common/http').HttpRequest<any>,
        next: import('@angular/common/http').HttpHandler
        ): import('rxjs').Observable<import('@angular/common/http').HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                if (error.status === 401){
                    return throwError(error.statusText);
                }
                if (error instanceof HttpErrorResponse){
                    const applicatioError = error.headers.get('Application-Error');
                    if (applicatioError) {
                        return throwError(applicatioError);
                    }
                    const ServerError = error.error;
                    let modelStateErrors = '';
                    if (ServerError.errors && ServerError.errors === 'object'){
                        for (const key in ServerError.errors ){
                            if (ServerError.errors[key]){
                                modelStateErrors += ServerError.errors[key] + '\n';
                            }
                        }
                    }
                    return throwError(modelStateErrors || ServerError || 'server Error' );
                    }
            })
        );
    }


}

export const ErrorInterceptorProvider = {
        provider: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor,
        multi: true
    };

