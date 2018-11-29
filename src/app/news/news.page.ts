import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  data: any;
  articles: any;
  filter_val: any;
  constructor(private newsService: NewsService, private router: Router) {
    this.initializeItems();
  }

  ngOnInit() {
    // this.initializeItems();    
  }

  initializeItems() {
    this.newsService
      .getData('top-headlines?country=us&category=business')
      .subscribe(data => {
        this.data = data;
      });
  }

  onInput(ev: any) {
    this.initializeItems();
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.data.articles = this.data.articles.filter((article) => {
        return (article.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  single_page(article) {
    this.newsService.selected_article = article;
    this.router.navigate(['/news-single'])
  }

}
