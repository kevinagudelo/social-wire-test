import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IndexComponent } from "./pages/index/index.component";
import { LoginComponent } from "./pages/auth/login/login.component";
import { RegisterComponent } from "./pages/auth/register/register.component";
import { CreateMessageComponent } from "./pages/admin/create-message/create-message.component";
import { AllMessageComponent } from "./pages/admin/all-messagess/all-messages.component";
import { MyMessageComponent } from "./pages/admin/my-messages/my-message.component";

const routes:Routes = [
  {
    path:'', redirectTo:'index', pathMatch:'full'
  },
  {
    path:'index', component:IndexComponent
  },

  {
    path:'login', component:LoginComponent
  },
  {
    path:'register', component:RegisterComponent
  },
  {
    path:'create-message', component:CreateMessageComponent
  },
  {
    path:'all-messages', component:AllMessageComponent
  },
  {
    path:'my-messages', component:MyMessageComponent
  },


  {
    path:'**', redirectTo:'index', pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{

}
