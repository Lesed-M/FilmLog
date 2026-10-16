import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WatchlistService } from '../../services/watchlist.service';
import { Movie } from '../../services/movie.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.page.html',  
  styleUrls: ['./watchlist.page.scss'],  
  standalone: false                      
})
export class WatchlistPage {
  watchlist: Movie[] = [];

  constructor(
    private watchlistService: WatchlistService,
    private router: Router
  ) {}

  async ionViewWillEnter() {
    this.watchlist = await this.watchlistService.getWatchlist();
  }

  openDetails(movie: Movie) {
    this.router.navigate(['/tabs/details'],  // ← fixed route
      { state: { movie } });
  }

  async markWatched(movie: Movie) {
    await this.watchlistService.markAsWatched(movie);
    this.watchlist = await this.watchlistService.getWatchlist();
  }

  async remove(movie: Movie) {
    await this.watchlistService.removeFromWatchlist(movie['#IMDB_ID']);
    this.watchlist = await this.watchlistService.getWatchlist();
  }
}