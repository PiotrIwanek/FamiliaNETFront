import {User} from "../models/User";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  URL =  environment.URL + 'user';
  // URL =  "http://10.10.8.253:8090/" + 'user';

constructor(private http : HttpClient) {
}

  public getAll (){
  return this.http.get(this.URL).pipe(
    map( function (data: User[]) { data.map( data => new User(data.id ,data.name ,data.surename , data.login ,data.password ,data.role)) } )
  )
  }


  public getById( id : number){
  return this.http.get(this.URL + "/" + encodeURIComponent(id)).pipe( map(function (data: User){ return User.fromData(data)}));
  }

  public createUser(user : User){
  return this.http.post( this.URL , user);
}

}
