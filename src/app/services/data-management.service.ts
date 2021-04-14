import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
}) 
export class DataManagementService {
    constructor(
        private http: HttpClient
    ) {}

    public async uploadDataAsync(file: File): Promise<void> {
        const formData: FormData = new FormData()
        formData.append('file', file, file.name)
        await this.http.post(environment.endpoints.data, formData).toPromise()
    }

    public downloadData(): void {
        this.http.get(environment.endpoints.data, {
            observe: 'response',
            responseType: 'blob'
        }).subscribe({
            next: response => {
                const url = window.URL.createObjectURL(response.body)
                const link = document.createElement('a')
                link.href = url
                link.download = `SmartLocker Data ${new Date().toLocaleString()}.txt`
                document.body.appendChild(link)
                link.click()
                link.remove()
            }
        })
    }

    public downloadBackup(): void {
        this.http.get(environment.endpoints.backup, {
            observe: 'response',
            responseType: 'blob'
        }).subscribe({
            next: response => {
                const url = window.URL.createObjectURL(response.body)
                const link = document.createElement('a')
                link.href = url
                link.download = `SmartLocker Backup ${new Date().toLocaleString()}.bak`
                document.body.appendChild(link)
                link.click()
                link.remove()
            }
        })
    }
}