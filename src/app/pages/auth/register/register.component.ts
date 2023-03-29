import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {FormBuilder} from '@angular/forms'
import { Router} from '@angular/router'
import { User } from 'src/app/shared/models/user.interface';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = this.fb.group(
    {
      username:[''],
      password:[''],
      email:[''],
      fullname:[''],
    }
  )
  constructor(private router:Router, private toastr: ToastrService, private authSvc: AuthService, private fb: FormBuilder) {

  }

  onRegister():void {
    const formValue = this.registerForm.value
    this.authSvc.register(formValue as User).subscribe(res => {
      if (res){
        this.toastr.success('Welcome', 'Succes')

        this.router.navigate(['login']);
      }
    })

  }

}
