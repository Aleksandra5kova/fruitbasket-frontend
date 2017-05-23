import { Component, OnInit } from '@angular/core';
import { PostsService} from './posts.service';

@Component({
  selector: 'app-post-form',
  templateUrl:  './post-form.component.html'
})
export class PostsFormComponent implements OnInit {
  posts;
  post = {
    userId: '',
    id: '',
    title: '',
    body: ''
  };

  constructor(private service: PostsService) {}

  addPost() {
      this.service.create(this.post).subscribe(post => {
        this.posts.push(post);
      });
      this.post.userId = '';
      this.post.title = '';
      this.post.body = '';
    }

    ngOnInit() {
       this.service.getPosts().subscribe(posts => {
         this.posts = posts;
      });
    }

}
