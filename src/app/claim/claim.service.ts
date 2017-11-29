import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Claim } from './claim';
import { Observable } from 'rxjs/Observable';
import { Document } from './document';

@Injectable()
export class ClaimService {

    private URL_REPORT = '/claim';

    private URL_DOCUMENT = '/document/group/';

    constructor(private http: HttpClient) { }

    initReport(claim: Claim): Observable<Claim> {
        return this.http.post(this.URL_REPORT, claim).map(data => data['data'] as Claim);
    }

    getDocuments(groupNo: string): Observable<Document[]> {
        return this.http.get(this.URL_DOCUMENT + groupNo).map(data => data['data'] as Document[]);
    }

}
