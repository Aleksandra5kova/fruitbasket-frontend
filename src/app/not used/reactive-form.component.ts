import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { PostsService } from './posts.service';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html'
})
export class ReactiveFormComponent implements OnInit {

  post: FormGroup;

  constructor(private postsService: PostsService){}

  ngOnInit() {
    this.post = new FormGroup({
      userid: new FormControl(''),
      title: new FormControl(''),
      body: new FormControl('')
    });
  }

}
