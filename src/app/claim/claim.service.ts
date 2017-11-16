import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Claim } from './claim';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ClaimService {

    private URL_REPORT = '/claim';

    constructor(private http: HttpClient) { }

    initReport(claim: Claim): Observable<Claim> {
        return this.http.post(this.URL_REPORT, claim).map(data => data['data'] as Claim);
    }

}
