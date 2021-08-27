import {Category} from 'src/models/Category';

import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {environment} from "../environments/environment";

interface CategoryApi {

  id: number;
  name: string;
  parent: CategoryApi;
  children: CategoryApi[];

}


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  testTitle: string;



  // categoryURL =  environment.URL + 'category';
  categoryURL =  "http://10.10.8.253:8090/" + 'category';

  constructor(private http: HttpClient) {
  }

  public getAPICategoryTree(): Observable<Category> {
    return this.http.get<Category>(this.categoryURL + '/tree');
  }

  public createCategory(newName: string, _parent: Category): Observable<Category> {

    let parentId = _parent.id;
    let serchParams = new HttpParams()
    .set('name', newName)
    .set('parentId', JSON.stringify(parentId));


    return this.http.post<Category>(this.categoryURL, serchParams);
  }

  delete(categoryId: number): Observable<any> {
    return this.http.delete(this.categoryURL + '/' + encodeURIComponent(categoryId));
  }

  getById(id: number): Observable<any> {
    return this.http.get<Category>(this.categoryURL + '/' + id);
  }

  getByIndex(parent: Category, index: number): Category {
    return parent.children[index];
  }

  setTitle(string: string) {
    this.testTitle = string;
  }

  getTitle(): string {
    return this.testTitle;
  }


}
