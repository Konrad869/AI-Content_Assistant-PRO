import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ReplicateService {
  summarizeText(text: string): Observable<string> {
    return of(`📄 Streszczenie: ${text.slice(0, 50)}...`).pipe(delay(1000));
  }

  rewriteText(text: string, style: string): Observable<string> {
    return of(`✍️ Styl ${style}: ${text} — przepisane w bardziej ${style} sposób.`).pipe(delay(1500));
  }
}
