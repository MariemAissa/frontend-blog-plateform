// profile.component.ts
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Profile {
  username: string;
  age: number;
  location: string;
  bio: string;
  education: string;
  friends: number;
  photos: number;
  comments: number;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  activeTab = signal<'posts' | 'favorites'>('posts');
  profile = signal<Profile>({
    username: 'Puneethheanth',
    age: 27,
    location: 'Bucharest, Romania',
    bio: 'this is my short biography',
    education: 'University of Computer Science',
    friends: 22,
    photos: 10,
    comments: 89
  });

  setActiveTab(tab: 'posts' | 'favorites') {
    this.activeTab.set(tab);
  }
}
