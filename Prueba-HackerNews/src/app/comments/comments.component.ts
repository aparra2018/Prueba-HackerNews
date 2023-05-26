import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  constructor(private http: HttpClient, private route: ActivatedRoute) {}
  id: String | undefined;
  got_comments: boolean = false;
  story_data: any;
  comment_list: any[] = [];
  comment_data: any[] = [];
  API = 'https://hacker-news.firebaseio.com/v0/';
  getComments() {
    this.http
      .get<any>(this.API + 'item/' + this.id + '.json')
      .pipe(map((response) => response))
      .subscribe(
        (data) => {
          this.story_data = data;
        },
        (error) => console.log(error),
        () => {
          for (let key in this.story_data.kids) {
            this.http
              .get<any>(this.API + 'item/' + this.story_data.kids[key] + '.json')
              .pipe(map((response) => response))
              .subscribe(
                (data) => {
                  this.comment_data.push(data);
                },
                (error) => console.log(error)
              );
          }
          this.got_comments = true;
        }
      );
  }
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const getId = params.get('id');
      this.id = String(getId);
      this.getComments();
    });
  }
}
