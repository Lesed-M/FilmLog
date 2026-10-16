import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  mode: 'login' | 'signup' = 'login';
  email = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private toast: ToastController,
  ) {}

  async submit() {
    if (!this.email || !this.password) {
      this.showToast('Please fill in all fields');
      return;
    }
    let success = false; //If statement, else if statement, else statement, switch statement, for loop, while loop, do-while loop, try-catch block, function declaration, arrow function, class declaration, interface declaration, type alias declaration, enum declaration, namespace declaration, module declaration, import statement, export statement, async function declaration, generator function declaration, async arrow function, async generator function declaration
    if (this.mode === 'login') {
      success = await this.auth.login(this.email, this.password);
      if (!success) this.showToast('Invalid email or password');
    } else {
      success = await this.auth.signup(this.email, this.password);
      if (!success) this.showToast('Email already in use');
    }
    if (success) this.router.navigate(['/tabs/search']);
  }

  async showToast(msg: string) { const t = await this.toast.create({
      message: msg,
      duration: 2000,
      position: 'bottom'});
    t.present();
  }
}