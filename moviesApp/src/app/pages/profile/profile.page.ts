import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { WatchlistService } from '../../services/watchlist.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',  // ← fixed
  styleUrls: ['./profile.page.scss'],  // ← fixed
  standalone: false                     // ← added
})
export class ProfilePage {
  userEmail = '';
  watchlistCount = 0;
  watchedCount = 0;

  constructor(
    private auth: AuthService,
    private watchlistService: WatchlistService,
    private router: Router,
  ) {}

  async ionViewWillEnter() {
    this.userEmail = (await this.auth.getCurrentUser()) || '';
    this.watchlistCount = (await this.watchlistService.getWatchlist()).length;
    this.watchedCount = (await this.watchlistService.getWatchedList()).length;
  }

  async logout() {
    await this.auth.logout();
    this.router.navigate(['/login']);
  }
}