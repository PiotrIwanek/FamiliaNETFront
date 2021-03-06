import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {FileDTO} from "../models/FileDTO";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FileDBService {

  URL = environment.URL + 'file';

  // URL =  "http://10.10.8.253:8090/" + 'file';

  constructor(private http: HttpClient) {
  }

  public getFiles() {
    return this.http.get<FileDTO>(this.URL);
  }

  public addFile(file: File) {
    let body = new FormData();
    body.append("file", file);
    return this.http.post<FileDTO>(this.URL, body);
  }

  public addChartFile(file: File) {
    let body = new FormData();
    body.append("file", file);
    return this.http.post<FileDTO>(this.URL + "/addChartFile", body);
  }

  public getChartFile() {
    return this.http.get<FileDTO>(this.URL + "/getChartFile");
  }


  public delete(id: string) {
    return this.http.delete(this.URL + "/" + encodeURIComponent(id));
  }

}
