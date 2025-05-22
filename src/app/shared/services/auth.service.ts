import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  signup(data: any) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  refreshToken() {
    const refresh = localStorage.getItem('refresh_token');
    return this.http.post<{ accessToken: string }>(`${this.baseUrl}/refresh-token`, { refresh });
  }

  getUserRole(): string | null {
    const token = localStorage.getItem('access_token');
    if (!token) return null;

    const decoded: any = jwtDecode(token);
    return decoded.role || null;
  }

  getUser(): any {
    const token = localStorage.getItem('access_token');
    if (!token) return null;
    return jwtDecode(token);  // Assure-toi d’avoir importé jwt-decode
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }


  getRole(): string {
    return this.getUser()?.role ?? '';
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  isEditor(): boolean {
    return ['admin', 'editor'].includes(this.getRole());
  }

  isAuthor(article: any): boolean {
    return article.author?._id === this.getUser()?._id;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  setUserRole(role: any) {
    // this.roleSubject.next(role);
    localStorage.setItem('role', role);
  }


  getUsers(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:5000/api/roles/all');
  }

  updateUserRole(userId: string, role: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/users/${userId}/role`, { role });
  }



}
