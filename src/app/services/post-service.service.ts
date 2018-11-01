import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostData } from '../models/post-data';
import { Subject } from 'rxjs';
import { Post } from '../models/post';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postUpdateListener: Subject<any> = new Subject<any>();
  posts: Post[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  createPost(post: { title: string, content: string, userId: string }) {
    this.http
      .post<{status: string, data: Post}>('http://localhost:3000/api/posts/create', post)
      .subscribe(response => {
        console.log(response);
        if (response.status === 'success') {
          this.posts.push(response.data);
          this.postUpdateListener.next([...this.posts]);
          this.router.navigate(['/']);
        }
      });
  }

  getAllPosts() {
    this.http
      .get<PostData>('http://localhost:3000/api/posts/all')
      .subscribe(response => {
        if (response.status === 'success') {
          this.posts = response.data;
          this.postUpdateListener.next([...this.posts]);
        }
      });
  }

  getPost(postId: string) {
    this.http
      .get<PostData>('http://localhost:3000/api/posts/get/' + postId)
      .subscribe(response => {
        console.log(response);
      });
  }

  updatePost(post: { title: string; content: string }, postId: string) {
    this.http
      .put<PostData>('http://localhost:3000/api/posts/update/' + postId, post)
      .subscribe(response => {
        console.log(response);
      });
  }

  deletePost(postId: string) {
    this.http.delete<{postId: string, userId: string}>('http://localhost:3000/api/posts/delete/' + postId)
          .subscribe((response) => {
            console.log(response);
          });
  }

  postListener() {
    return this.postUpdateListener.asObservable();
  }

  getPosts() {
    console.log('get all the posts');
    return [...this.posts];
  }
}
