import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {CommonModule} from '@angular/common';
import {UserService} from '../../shared/services/user.service';

@Component({
  selector: 'app-role',
  imports: [CommonModule, FormsModule],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent implements OnInit {
  users: any[] = [];
  roles: any[] = ['admin', 'editor', 'writer', 'reader'];


  constructor(private authService: AuthService, private userService: UserService) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe((users: any) => this.users = users);
  }

  onRoleChange(user: any) {
    this.authService.updateUserRole(user._id, user.role).subscribe(() => {
      alert(`Rôle de ${user.username} changé en ${user.role}`);
    });
  }
}
