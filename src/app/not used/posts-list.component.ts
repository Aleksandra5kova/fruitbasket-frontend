import { Component, OnInit } from '@angular/core';

import { PostsService } from './posts.service';

@Component({
    selector: 'app-posts-list',
    templateUrl: './posts-list.component.html'
})
export class PostsListComponent implements OnInit {
    posts;

    constructor(private service: PostsService) {}

    ngOnInit() {
       this.service.getPosts().subscribe(posts => {
         this.posts = posts;
      });
    }

}
