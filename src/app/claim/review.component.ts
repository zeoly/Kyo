import { Component, OnInit } from '@angular/core';
import { ClaimService } from './claim.service';
import { Document } from './document';

@Component({
    selector: 'app-review',
    templateUrl: './review.component.html'
})

export class ReviewComponent implements OnInit {

    documents: Document[] = [];

    gridStyle = {
        width: '25%',
        textAlign: 'center',
        height: '200px',
        overflow: 'hidden',
    };

    constructor(private claimService: ClaimService) { }

    ngOnInit(): void {
        this.claimService.getDocuments('1da5f207-11a2-4e40-beb7-cf1dbed11fa7').subscribe(documents => {
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
