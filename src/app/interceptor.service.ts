import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable()
export class KyoInterceptor implements HttpInterceptor {

    constructor(private _message: NzMessageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const newReq = req.clone({ url: 'http://localhost:8081' + req.url });
        const observable = next.handle(newReq);

        return observable.do(e => {
            if (e instanceof HttpResponse) {
                const response = <HttpResponse<any>>e;
                const code = response.body['code'];
                console.log(response);
                if (code !== '999999') {
                    this.errorNotification(response.body['msg']);
                }
            }
        });
    }

    errorNotification = (msg) => {
        this._message.create('error', msg, { nzDuration: 4000 });
    }

}
