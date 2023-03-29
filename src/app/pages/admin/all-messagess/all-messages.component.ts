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
  selector: 'app-all-messages',
  templateUrl: './all-messages.component.html',
  styleUrls: ['./all-messages.component.css'],
})
export class AllMessageComponent implements OnInit {
  allMessageForm = this.fb.group({
    title: [''],
    text: [''],
  });

  messages!: GetAllMessageResponse[];
  constructor(
    private router: Router,
    private MsmSrv: AdminService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.MsmSrv.getAllMessages().subscribe((res) => (this.messages = res));
  }

  onAllMessages(): void {
    const formValue = this.allMessageForm.value;
    this.MsmSrv.newMessage(formValue as Message).subscribe((res) =>
      this.MsmSrv.getAllMessages().subscribe((res) => (this.messages = res))
    );
  }
}
