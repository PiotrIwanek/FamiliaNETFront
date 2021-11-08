import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  URL = environment.URL + 'login';

  // URL =  "http://10.10.8.253:8090/" + 'login';

  constructor(private http: HttpClient) {
  }

  logIn(login: string, password: string) {
    let param = new HttpParams()
    .set('login', login)
    .set('password', password);

    return this.http.post(this.URL, param);
  }
}
