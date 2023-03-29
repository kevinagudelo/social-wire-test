import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {
  GetAllMessageResponse,
  Message,
} from 'src/app/shared/models/message.interface';
import { User } from 'src/app/shared/models/user.interface';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-my-message',
  templateUrl: './my-message.component.html',
  styleUrls: ['./my-message.component.css'],
})
export class MyMessageComponent implements OnInit {
  myMessageForm = this.fb.group({
    title: [''],
    text: [''],
  });

  messages!: GetAllMessageResponse[] ;
  constructor(
    private router: Router,
    private MsmSrv: AdminService,
    private fb: FormBuilder
  ) {
  }
  ngOnInit(): void {
    this.MsmSrv.getMyMessages().subscribe((res) => (this.messages=(res)))
      }

  onMyMessage(): void {
    const formValue = this.myMessageForm.value;
    this.MsmSrv.newMessage(formValue as Message).subscribe((res) =>
      this.MsmSrv.getAllMessages().subscribe((res) => (this.messages = res))
    );
  }
}
