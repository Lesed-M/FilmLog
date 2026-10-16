import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Movie } from './movie.service';

export interface WatchedMovie extends Movie {
  timesWatched: number;
}

@Injectable({ providedIn: 'root' })
export class WatchlistService {
  constructor(private storage: StorageService) {}

  // Watchlist
  async getWatchlist(): Promise<Movie[]> {
    return (await this.storage.get('watchlist')) || [];
  }

  async addToWatchlist(movie: Movie) {
    const list = await this.getWatchlist();
    if (!list.find(m => m['#IMDB_ID'] === movie['#IMDB_ID'])) {
      list.push(movie);
      await this.storage.set('watchlist', list);
    }
  }

  async removeFromWatchlist(imdbId: string) {
    const list = await this.getWatchlist();
    await this.storage.set('watchlist', list.filter(m => m['#IMDB_ID'] !== imdbId));
  }

  async isInWatchlist(imdbId: string): Promise<boolean> {
    const list = await this.getWatchlist();
    return !!list.find(m => m['#IMDB_ID'] === imdbId);
  }

  // Watched List
  async getWatchedList(): Promise<WatchedMovie[]> {
    return (await this.storage.get('watchedList')) || [];
  }

  async markAsWatched(movie: Movie) {
    await this.removeFromWatchlist(movie['#IMDB_ID']);
    const list = await this.getWatchedList();
    const existing = list.find(m => m['#IMDB_ID'] === movie['#IMDB_ID']);
    if (existing) {
      existing.timesWatched += 1;
    } else {
      list.push({ ...movie, timesWatched: 1 });
    }
    await this.storage.set('watchedList', list);
  }

  async removeFromWatched(imdbId: string) {
    const list = await this.getWatchedList();
    await this.storage.set('watchedList', list.filter(m => m['#IMDB_ID'] !== imdbId));
  }

  async resetTimesWatched(movie: WatchedMovie) {
    await this.removeFromWatched(movie['#IMDB_ID']);
    await this.addToWatchlist(movie);
  }

  async isWatched(imdbId: string): Promise<boolean> {
    const list = await this.getWatchedList();
    return !!list.find(m => m['#IMDB_ID'] === imdbId);
  }
}