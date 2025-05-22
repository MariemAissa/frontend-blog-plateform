import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private baseUrl = 'http://localhost:5000/api/art';

  constructor(private http: HttpClient) {}

  createArticle(article: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, article);
  }

  updateArticle(id: string, article: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, article);
  }

  getArticleById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getAll() {
    return this.http.get<any[]>(this.baseUrl+'/all');
  }

  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
