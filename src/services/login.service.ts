import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class LoginService{

  URL =  environment.URL + 'login';

  constructor(private http : HttpClient) {
  }

  logIn( name : string , password : string){
    let param = new HttpParams()
    .set('name', name)
    .set('password',password);

    return this.http.post(this.URL , param );
  }
}
