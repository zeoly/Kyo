import { Component, OnInit, Input } from '@angular/core';
import { Claim } from './claim';
import { ClaimService } from './claim.service';
import { Document } from './document';

@Component({
    selector: 'app-claim-detail',
    templateUrl: './claim-detail.component.html'
})

export class ClaimDetailComponent implements OnInit {

    @Input()
    claim: Claim;

    private documents: Document[] = [];

    gridStyle = {
        width: '25%',
        textAlign: 'center',
        height: '200px',
        overflow: 'hidden',
    };

    constructor(
        private claimService: ClaimService
    ) { }

    ngOnInit(): void {
        this.claimService.getDocuments(this.claim.documentGroupNo).subscribe(documents => {
            console.log(documents);
            this.documents = documents;
            this.documents.forEach(doc => {
                doc.url = 'http://localhost:8081' + doc.url;
            });
        });
    }

    openNew(url: string): void {
        window.open(url);
    }
}
