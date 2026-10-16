import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Movie } from '../../services/movie.service';
import { WatchlistService } from '../../services/watchlist.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: false
})

export class DetailsPage implements OnInit {
  movie: Movie | null = null;
  inWatchlist = false;
  watched = false;

  constructor(
    private router: Router,
    private watchlistService: WatchlistService,
    private toast: ToastController
  ) 
  {
    const nav = this.router.getCurrentNavigation();
    this.movie = nav?.extras?.state?.['movie'] || null;
  }

  async ngOnInit() { if (!this.movie) return;
    this.inWatchlist = await this.watchlistService.isInWatchlist(this.movie['#IMDB_ID']);
    this.watched = await this.watchlistService.isWatched(this.movie['#IMDB_ID']);
  }

  async addToWatchlist() { if (!this.movie) return;
    await this.watchlistService.addToWatchlist(this.movie);
    this.inWatchlist = true;
    const t = await this.toast.create({
      message: 'Added to Watchlist',
      duration: 1500 });
    t.present();
  }

  async markWatched() {
    if (!this.movie) return;
    await this.watchlistService.markAsWatched(this.movie);
    this.inWatchlist = false;
    this.watched = true;
    const t = await this.toast.create({
      message: 'Moved to Watched List ✓',
      duration: 1500,
      color: 'success'});
    t.present();
  }
}