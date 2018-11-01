import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { PostService } from '../../../services/post-service.service';
import { AuthService } from '../../../services/auth-service.service';
import { AuthData } from '../../../models/auth-data';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  postForm: FormGroup;
  isLoading = false;
  userId: string;

  constructor(private postService: PostService, private authService: AuthService) {}

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.postForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      content: new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    if (this.postForm.invalid) {
      return;
    }
    this.isLoading = true;

    const post = {
        title: this.postForm.value.title,
        content: this.postForm.value.content,
        userId: this.userId
      };
    this.postService.createPost(post);
  }
}
