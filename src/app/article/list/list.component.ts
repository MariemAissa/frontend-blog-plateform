import {Component, OnInit} from '@angular/core';
import {ArticleService} from '../../shared/services/article.service';
import {AuthService} from '../../shared/services/auth.service';
import {RouterModule} from '@angular/router';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-list',
  imports: [RouterModule, NgxDatatableModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  articles:any;
  currentUser: any;
  columns: any;

  constructor(
    public authService: AuthService,
    private articleService: ArticleService
) {}

  ngOnInit() {
    this.currentUser = this.authService.getUser(); // id, role, etc.
    this.loadArticles();
  }

  loadArticles() {
    this.articleService.getAll().subscribe((data) => {
      this.articles = data;
    });
  }

  // Règles d'édition
  canEdit(article: any): boolean {
    if (!this.currentUser) return false;

    const role = this.currentUser.role;
    // Admin & Éditeur peuvent modifier tous les articles
    if (role === 'admin' || role === 'editor') return true;
    // Rédacteur ne peut modifier que ses articles
    if (role === 'writer') return article.author._id === this.currentUser._id;

    return false;
  }

  // Règle suppression
  canDelete(): boolean {
    return this.currentUser && this.currentUser.role === 'admin';
  }

  editArticle(article: any) {
    // Naviguer vers la page d'édition ou ouvrir un modal
    console.log('Edit article', article);
  }

  deleteArticle(article: any) {
    if (confirm(`Supprimer l'article "${article.title}" ?`)) {
      this.articleService.delete(article._id).subscribe(() => {
        this.loadArticles();
      });
    }
  }
}
