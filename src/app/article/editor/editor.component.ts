import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ArticleService} from '../../shared/services/article.service';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-article-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {
  articleForm!: FormGroup;
  isEditMode = false;
  articleId!: string;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      tags: this.fb.array([this.fb.control('')])
    });

    // Check if we're editing
    this.articleId = this.route.snapshot.paramMap.get('id')!;
    if (this.articleId) {
      this.isEditMode = true;
      this.articleService.getArticleById(this.articleId).subscribe(article => {
        this.articleForm.patchValue({
          title: article.title,
          content: article.content,
          image: article.image
        });
        this.tags.clear();
        article.tags.forEach((tag: any) => this.tags.push(this.fb.control(tag)));
      });
    }
  }

  get tags(): FormArray {
    return this.articleForm.get('tags') as FormArray;
  }

  addTag(): void {
    this.tags.push(this.fb.control(''));
  }

  removeTag(index: number): void {
    this.tags.removeAt(index);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      // Prévisualisation image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(): void {
    if (this.articleForm.invalid) return;

    //const formData = this.articleForm.value;
    const formData = new FormData();

    formData.append('title', this.articleForm.value.title);
    formData.append('content', this.articleForm.value.content);
    formData.append('tags', this.articleForm.value.tags);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    if (this.isEditMode) {
      this.articleService.updateArticle(this.articleId, formData).subscribe(() => {
        this.router.navigate(['/articles']);
      });
    } else {
      this.articleService.createArticle(formData).subscribe(() => {
        this.router.navigate(['/articles']);
      });
    }
  }
}
