import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClaimService } from './claim.service';
import { Claim } from './claim';

const URL = 'http://localhost:8081/document/group/';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html'
})

export class ReportComponent implements OnInit {

    public uploader: FileUploader = new FileUploader({ url: URL, method: 'post' });

    validateForm: FormGroup;

    isReady: Boolean = false;

    claim: Claim = new Claim();

    _submitForm() {
        for (const i in this.validateForm.controls) {
            if (this.validateForm.controls[i]) {
                this.validateForm.controls[i].markAsDirty();
            }
        }
    }

    constructor(
        private formBuilder: FormBuilder,
        private claimService: ClaimService
    ) { }

    ngOnInit(): void {
        this.validateForm = this.formBuilder.group({
            reporterName: [null, [Validators.required]],
            reporterPhone: [null, [Validators.required]],
        });
    }

    next(): void {
        if (!this.validateForm.valid) {
            return;
        }
        this.claimService.initReport(this.claim).subscribe(claim => {
            this.claim = claim;
            this.isReady = true;
            this.uploader.setOptions({ url: URL + '/' + claim.documentGroupNo, method: 'post' });
        });
    }
}
