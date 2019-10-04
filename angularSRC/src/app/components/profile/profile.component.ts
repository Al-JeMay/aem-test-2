import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  name:String;
  user:Object;

  constructor(
    private authService:AuthService,
    private router:Router,
  ){}

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      this.name = profile.user.name;
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
