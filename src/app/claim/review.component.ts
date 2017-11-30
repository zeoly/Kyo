import { Component, OnInit } from '@angular/core';
import { ClaimService } from './claim.service';
import { Document } from './document';
import { Claim } from './claim';
import { NzModalService } from 'ng-zorro-antd';
import { ClaimDetailComponent } from './claim-detail.component';

@Component({
    selector: 'app-review',
    templateUrl: './review.component.html'
})

export class ReviewComponent implements OnInit {

    claimList: Claim[] = [];

    constructor(
        private claimService: ClaimService,
        private modalService: NzModalService
    ) { }

    ngOnInit(): void {
        this.claimService.getClaimList().subscribe(claimList => {
            this.claimList = claimList;
        });
    }

    openClaimDetail(claim: Claim): void {
        const subscription = this.modalService.open({
            title: '审核详情',
            width: 1200,
            content: ClaimDetailComponent,
            footer: false,
            componentParams: {
                claim: claim
            }
        });
    }
}
