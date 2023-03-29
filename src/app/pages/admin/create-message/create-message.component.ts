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
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.css'],
})
export class CreateMessageComponent implements OnInit {
  createMessageForm = this.fb.group({
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
    this.MsmSrv.getAllMessages().subscribe((res) => (this.messages=(res)))
      }

  onCreateMessage(): void {
    const formValue = this.createMessageForm.value;
    this.MsmSrv.newMessage(formValue as Message).subscribe((res) =>
      this.MsmSrv.getAllMessages().subscribe((res) => (this.messages = res))
    );
  }
}
