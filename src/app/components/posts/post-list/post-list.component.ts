import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth-service.service';
import { PostService } from '../../../services/post-service.service';
import { PostData } from '../../../models/post-data';
import { Post } from '../../../models/post';
import { AuthData } from '../../../models/auth-data';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: Post[];
  isLoading = false;
  isLoggedIn = false;
  userData: AuthData;

  constructor(private postService: PostService, private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.isLoggedIn = this.authService.getAuth();
    this.userData = this.authService.getAuthData();
    this.postService.getAllPosts();
    this.postService.postListener().subscribe((posts) => {
      this.posts = posts;
      this.isLoading = false;
    });
  }

}
