import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ContentService, ProcessedContent } from '../../../../core/services/content';
import { HistoryService } from '../../../../core/services/history';

@Component({
  selector: 'app-content-processor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './content-processor.component.html',
  styleUrls: ['./content-processor.component.scss']
})
export class ContentProcessorComponent implements OnInit {
  processingForm: FormGroup;
  isProcessing = false;
  result: ProcessedContent | null = null;

  readonly styles = [
    { value: 'formal', viewValue: 'Formal' },
    { value: 'technical', viewValue: 'Technical' },
    { value: 'creative', viewValue: 'Creative' }
  ];

  readonly processingTypes = [
    { value: 'summarize', viewValue: 'Summarize' },
    { value: 'rewrite', viewValue: 'Rewrite' }
  ];

  constructor(
    private fb: FormBuilder,
    private contentService: ContentService,
    private historyService: HistoryService,
    private snackBar: MatSnackBar
  ) {
    this.processingForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(10)]],
      style: ['formal', Validators.required],
      type: ['summarize', Validators.required]
    });
  }

  ngOnInit(): void {}

  processText(): void {
    if (this.processingForm.invalid || this.isProcessing) {
      return;
    }

    this.isProcessing = true;
    this.result = null;

    const { content: text, style, type } = this.processingForm.value;

    this.contentService.processContent(text, style, type).subscribe({
      next: (result) => {
        this.result = result;
        this.historyService.addToHistory(result);
        this.isProcessing = false;
      },
      error: (error) => {
        console.error('Error processing text:', error);
        this.snackBar.open('Error processing text. Please try again.', 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
        this.isProcessing = false;
      }
    });
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      this.snackBar.open('Copied to clipboard!', 'Close', {
        duration: 2000
      });
    });
  }

  getStyleDisplayName(style: string): string {
    return this.styles.find(s => s.value === style)?.viewValue || style;
  }

  getTypeDisplayName(type: string): string {
    return this.processingTypes.find(t => t.value === type)?.viewValue || type;
  }
}
