import { Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})

export class ArticlesComponent implements OnInit {
  page: string | null = "1";
  API = 'https://hacker-news.firebaseio.com/v0/';
  lista_articulos: any[] = [];
  titulares: any[] = [];
  lower_limit: number = 0;
  upper_limit: number = 0;
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
  }
  getStories() {
    if (Number(this.page) == 0) this.page = "1";
    this.lower_limit= (Number(this.page)-1)*50;
    this.upper_limit = (Number(this.page)) * 50;
    this.titulares = [];
    this.http
      .get<any>(this.API + 'beststories.json')
      .pipe(map((response) => response))
      .subscribe(
        (data) => {
          this.lista_articulos = data;
        },
        (err) => console.error(err),
        () => {
          for (
            let index = this.lower_limit;
            index < this.upper_limit;
            index++
          ) {
            this.http
              .get<any>(
                this.API + 'item/' + this.lista_articulos[index] + '.json'
              )
              .pipe(map((response) => response))
              .subscribe((data) => {
                this.titulares.push(data);
              });
          }
        }
      );
  }
  refreshPage() {
    this.page = String(Number(this.page) + 1);
    this.getStories();
  }
  backPage() {
    if (Number(this.page) > 1) {
      this.page = String(Number(this.page) - 1);
      this.getStories();
    }
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const varpage = params.get('page');
      this.page = varpage;
    });
    this.getStories();
  }
  showStory(id: String) {
    this.router.navigate(['story/',id]);
  }
}
