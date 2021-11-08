import {User} from "../models/User";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  URL = environment.URL + 'user';

  // URL =  "http://10.10.8.253:8090/" + 'user';

  constructor(private http: HttpClient) {
  }

  public getAll() {
    return this.http.get<User[]>(this.URL);
  }


  public getById(id: number) {
    return this.http.get(this.URL + "/" + encodeURIComponent(id)).pipe(map(function (data: User) {
      return User.fromData(data)
    }));
  }

  public createUser(user: User) {
    return this.http.post<User>(this.URL, user);
  }

  public update(user: User) {
    return this.http.put<User>(this.URL + '/update/' + encodeURIComponent(user.id), user);
  }

  public delete(userId) {
    return this.http.delete(this.URL + '/delete/' + encodeURIComponent(userId));
  }
}
