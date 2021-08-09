import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {FileDTO} from "../models/FileDTO";

@Injectable({
  providedIn: 'root'
})
export class FileDBService{

  URL = 'http://localhost:8080/v1/file';


  constructor(private  http : HttpClient) {
  }

  public getFiles(){
   return  this.http.get<FileDTO>(this.URL);
  }

  public addFile (file : File){
    let body = new FormData();
    body.append("file",file)
   return  this.http.post<FileDTO>(this.URL , body);
  }

  public delete (id : string){
    return  this.http.delete(this.URL + "/" + encodeURIComponent(id));
  }

}
