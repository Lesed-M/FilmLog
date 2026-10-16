import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WatchlistService, WatchedMovie } from '../../services/watchlist.service';

@Component({
  selector: 'app-watched',
  templateUrl: './watched.page.html',  // ← fixed hyperlink
  styleUrls: ['./watched.page.scss'],  // ← added
  standalone: false                     // ← added
})
export class WatchedPage {
  watchedList: WatchedMovie[] = [];

  constructor(
    private watchlistService: WatchlistService,
    private router: Router
  ) {}

  async ionViewWillEnter() {
    this.watchedList = await this.watchlistService.getWatchedList();
  }

  openDetails(movie: WatchedMovie) {
    this.router.navigate(['/tabs/details'],  // ← fixed route
      { state: { movie } });
  }

  async reset(movie: WatchedMovie) {
    await this.watchlistService.resetTimesWatched(movie);
    this.watchedList = await this.watchlistService.getWatchedList();
  }

  async remove(movie: WatchedMovie) {
    await this.watchlistService.removeFromWatched(movie['#IMDB_ID']);
    this.watchedList = await this.watchlistService.getWatchedList();
  }
}