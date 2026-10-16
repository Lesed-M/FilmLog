import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

export interface User { email: string; password: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private storageService: StorageService) {}

  async signup(email: string, password: string): Promise<boolean> {
    const users: User[] = (await this.storageService.get('users')) || [];
    if (users.find(u => u.email === email)) return false;  // ← fixed
    users.push({ email, password });
    await this.storageService.set('users', users);
    await this.storageService.set('currentUser', email);
    return true;
  }

  async login(email: string, password: string): Promise<boolean> {
    const users: User[] = (await this.storageService.get('users')) || [];
    const found = users.find(u => u.email === email && u.password === password);  // ← fixed
    if (found) {
      await this.storageService.set('currentUser', email);
      return true;
    }
    return false;
  }

  async logout() {
    await this.storageService.remove('currentUser');
  }

  async getCurrentUser(): Promise<string | null> {
    return this.storageService.get('currentUser');
  }

  async isLoggedIn(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return !!user;
  }
}