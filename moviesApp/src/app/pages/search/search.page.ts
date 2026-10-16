import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { MovieService, Movie } from '../../services/movie.service';  // ← fixed path
import { WatchlistService } from '../../services/watchlist.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: false  // ← added
})
export class SearchPage {
  query: string = '';
  results: Movie[] = [];
  loading = false;

  constructor(
    private movieService: MovieService,
    private watchlistService: WatchlistService,
    private router: Router,
    private toast: ToastController  
  ) {}

  searchMovies() {
    if (this.query.trim().length < 2) {
      this.results = [];
      return;
    }
    this.loading = true;

    this.movieService.search(this.query).subscribe({ 
      next: (res: any) => {
        this.results = res.description || [];  
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error searching movies:', err);
        this.loading = false;
      }
    });
  }

  openDetails(movie: Movie) {
    this.router.navigate(['/tabs/details'], 
      { state: { movie } });
  }

  async addToWatchlist(movie: Movie) {
    await this.watchlistService.addToWatchlist(movie);
    const t = await this.toast.create({  
      message: `${movie['#TITLE']} added to Watchlist`,
      duration: 1500
    });
    t.present();
  }
}