import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class PostsService {

    constructor(private http: Http) {}

    getPosts() {
        return this.http.get('https://jsonplaceholder.typicode.com/posts').map((response) => {
          return response.json();
        });
    }

    create(post) {
      const headers = new Headers({ 'Content-Type' : 'application/json' });
      const options = new RequestOptions({ headers : headers });

       return this.http.post('http://jsonplaceholder.typicode.com/posts', post , options ).map((response) => {
          return response.json();
        });
    }

}

// function(response) {
//   return response.json();
// }
// e isto so
// (response) => {
//           return response.json();
//         })
