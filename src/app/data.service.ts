import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {

  }

  getUsers(){
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }
  getUser(userId){
    return this.http.get('https://jsonplaceholder.typicode.com/users/' + userId);
  }
  getPosts(){
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }
  getDetail(postId){
    return this.http.get('https://jsonplaceholder.typicode.com/posts/'+ postId);
  }
  //getLocations(){
   //return this.http.get('http://localhost:4200/assets/object.json').map(res => res.json());;
  //}
  getLocations(): Observable<any> {
    return this.http.get("./assets/object.json");
}
  getLocation(locationId){
    return this.http.get('./assets/object.json'+ locationId);
  }
}
