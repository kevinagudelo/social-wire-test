import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {FormBuilder} from '@angular/forms'
import { Router} from '@angular/router'
import { User } from 'src/app/shared/models/user.interface';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group(
    {
      username:[''],
      password:[''],
    }
  )
  constructor(private router:Router, private toastr: ToastrService,  private authSvc: AuthService, private fb: FormBuilder) {

  }
  ngOnInit(): void {

  }

  onLogin():void {
    const formValue = this.loginForm.value
    this.authSvc.login(formValue as User).subscribe(res => {
      if (res){
        this.toastr.success('Welcome', 'Succes')
        this.router.navigate(['create-message']);
      }
    })

  }

}
