import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable()
export class KyoInterceptor implements HttpInterceptor {

    constructor(private _message: NzMessageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // const newReq = req.clone({ url: '/api' + req.url });
        const newReq = req.clone({ url: 'http://localhost:8081' + req.url });
        const observable = next.handle(newReq);

        // return observable.do(e => {
        //     console.log('test');
        //     console.log(e);
        //     if (e instanceof HttpResponse) {
        //         const response = <HttpResponse<any>>e;
        //         console.log(response);
        //     } else if (e instanceof HttpErrorResponse) {
        //         const response = <HttpErrorResponse>e;
        //         const msg = response.error['msg'];
        //         this.errorNotification(msg);
        //         console.log(response);
        //     }
        // });

        return observable.catch((err: any, caught) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status !== 200) {
                    console.log('err.error =', err.error, ';');
                    const msg = err.error['msg'];
                    this.errorNotification(msg);
                }
                return Observable.throw(err);
            }
        });
    }

    errorNotification = (msg) => {
        this._message.create('error', msg, { nzDuration: 4000 });
    }

}
