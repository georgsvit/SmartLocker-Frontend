import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ReportType } from "../domain/report-type";

@Injectable({
    providedIn: 'root'
}) 
export class ReportsService {
    constructor(
        private http: HttpClient
    ) {}
    
    public downloadAccountingReport(): void {
        this.downloadFile(ReportType.Accounting)
    }

    public downloadServiceReport(): void {
        this.downloadFile(ReportType.Service)
    }

    public downloadViolationReport(): void {
        this.downloadFile(ReportType.Violation)
    }
    
    private downloadFile(type: ReportType): void {
        let url: string
        let fileName: string

        switch (type) {
            case ReportType.Accounting:
                url = environment.endpoints.accountingReport
                fileName = `Accounting Register: ${new Date().toLocaleString()}.txt`
                break;
            case ReportType.Service:
                url = environment.endpoints.serviceReport
                fileName = `Service Register: ${new Date().toLocaleString()}.txt`
                break;
        
            case ReportType.Violation:
                url = environment.endpoints.violationReport
                fileName = `Violation Register: ${new Date().toLocaleString()}.txt`
                break;
        }

        this.http.get(url, {
            observe: 'response',
            responseType: 'blob'
        }).subscribe({
            next: response => {
                console.log(response)
                const url = window.URL.createObjectURL(response.body)
                const link = document.createElement('a')
                link.href = url
                link.download = fileName
                document.body.appendChild(link)
                link.click()
                link.remove()
            }
        })        
    }

}