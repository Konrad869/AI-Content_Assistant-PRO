import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface ProcessedContent {
  id: string;
  originalText: string;
  processedText: string;
  style: string;
  timestamp: Date;
  type: 'summarize' | 'rewrite';
}

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private processText(
    text: string,
    style: 'formal' | 'technical' | 'creative',
    type: 'summarize' | 'rewrite'
  ): string {
    if (type === 'summarize') {
      return this.summarizeText(text, style);
    } else {
      return this.rewriteText(text, style);
    }
  }

  private summarizeText(text: string, style: string): string {
    // Mock summarization based on style
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    const summaryLength = Math.max(1, Math.floor(sentences.length / 3));
    const summary = sentences.slice(0, summaryLength).join(' ');

    return summary;
  }

  private rewriteText(text: string, style: string): string {
    // Mock rewriting based on style
    switch (style) {
      case 'formal':
        return text.replace(/\b(?:I'm|I am)\b/g, 'I am').replace(/\b(can't|cannot)\b/g, 'cannot');
      case 'technical':
        return `${text}. This text has been optimized for technical clarity and precision.`;
      case 'creative':
        return `✨ ${text.split(' ').map(word => 
          Math.random() > 0.7 ? word.toUpperCase() : word
        ).join(' ')} ✨`;
      default:
        return text;
    }
  }

  processContent(
    text: string,
    style: 'formal' | 'technical' | 'creative',
    type: 'summarize' | 'rewrite'
  ): Observable<ProcessedContent> {
    // Simulate API call with delay
    const result: ProcessedContent = {
      id: Math.random().toString(36).substr(2, 9),
      originalText: text,
      processedText: this.processText(text, style, type),
      style,
      timestamp: new Date(),
      type
    };

    return of(result).pipe(delay(800));
  }
}
