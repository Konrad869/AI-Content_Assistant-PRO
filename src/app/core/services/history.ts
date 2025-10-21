import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProcessedContent } from './content';

const STORAGE_KEY = 'ai_content_assistant_history';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private history: ProcessedContent[] = [];
  private historySubject = new BehaviorSubject<ProcessedContent[]>([]);

  constructor() {
    this.loadHistory();
  }

  private loadHistory(): void {
    const savedHistory = localStorage.getItem(STORAGE_KEY);
    if (savedHistory) {
      try {
        this.history = JSON.parse(savedHistory);
        this.historySubject.next([...this.history]);
      } catch (e) {
        console.error('Failed to load history from localStorage', e);
        this.history = [];
      }
    }
  }

  private saveHistory(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.history));
      this.historySubject.next([...this.history]);
    } catch (e) {
      console.error('Failed to save history to localStorage', e);
    }
  }

  addToHistory(item: ProcessedContent): void {
    this.history.unshift(item);
    // Keep only the last 50 items
    if (this.history.length > 50) {
      this.history = this.history.slice(0, 50);
    }
    this.saveHistory();
  }

  getHistory(): Observable<ProcessedContent[]> {
    return this.historySubject.asObservable();
  }

  getHistoryList(): ProcessedContent[] {
    return [...this.history];
  }

  clearHistory(): void {
    this.history = [];
    localStorage.removeItem(STORAGE_KEY);
    this.historySubject.next([]);
  }

  removeItem(id: string): void {
    this.history = this.history.filter(item => item.id !== id);
    this.saveHistory();
  }
}
