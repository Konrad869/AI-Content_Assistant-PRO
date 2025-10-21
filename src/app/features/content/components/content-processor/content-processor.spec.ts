import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';

import { ContentProcessorComponent } from './content-processor';
import { ContentService, ProcessedContent } from '../../../../core/services/content';
import { HistoryService } from '../../../../core/services/history';

describe('ContentProcessorComponent', () => {
  let component: ContentProcessorComponent;
  let fixture: ComponentFixture<ContentProcessorComponent>;
  let contentService: jasmine.SpyObj<ContentService>;
  let historyService: jasmine.SpyObj<HistoryService>;

  const mockProcessedContent: ProcessedContent = {
    id: '123',
    originalText: 'Test text',
    processedText: 'Processed test text',
    style: 'formal',
    timestamp: new Date(),
    type: 'summarize'
  };

  beforeEach(async () => {
    const contentServiceSpy = jasmine.createSpyObj('ContentService', ['processContent']);
    const historyServiceSpy = jasmine.createSpyObj('HistoryService', ['addToHistory']);

    await TestBed.configureTestingModule({
      imports: [
        ContentProcessorComponent,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        MatProgressSpinnerModule,
        MatSnackBarModule
      ],
      providers: [
        { provide: ContentService, useValue: contentServiceSpy },
        { provide: HistoryService, useValue: historyServiceSpy }
      ]
    }).compileComponents();

    contentService = TestBed.inject(ContentService) as jasmine.SpyObj<ContentService>;
    historyService = TestBed.inject(HistoryService) as jasmine.SpyObj<HistoryService>;
    
    fixture = TestBed.createComponent(ContentProcessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
