import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

const URL = 'SDF';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html'
})

export class ReportComponent implements OnInit {

    public uploader: FileUploader = new FileUploader({ url: URL });
    public hasBaseDropZoneOver = false;
    public hasAnotherDropZoneOver = false;

    ngOnInit(): void {
    }

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    public fileOverAnother(e: any): void {
        this.hasAnotherDropZoneOver = e;
    }
}
