import { TestBed } from '@angular/core/testing';
import { HistoryService } from './history';
import { ProcessedContent } from './content';

describe('HistoryService', () => {
  let service: HistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add item to history', (done) => {
    const mockContent: ProcessedContent = {
      id: '123',
      originalText: 'Test text',
      processedText: 'Processed test text',
      style: 'formal',
      timestamp: new Date(),
      type: 'summarize'
    };

    service.addToHistory(mockContent);

    service.getHistory().subscribe(history => {
      expect(history.length).toBe(1);
      expect(history[0].id).toBe('123');
      expect(history[0].originalText).toBe('Test text');
      done();
    });
  });

  it('should retrieve history from localStorage', (done) => {
    const mockContent: ProcessedContent = {
      id: '456',
      originalText: 'Another test',
      processedText: 'Processed another test',
      style: 'technical',
      timestamp: new Date(),
      type: 'rewrite'
    };

    service.addToHistory(mockContent);

    // Create new service instance to test localStorage retrieval
    const newService = TestBed.inject(HistoryService);
    newService.getHistory().subscribe(history => {
      expect(history.length).toBe(1);
      expect(history[0].id).toBe('456');
      done();
    });
  });

  it('should clear history', (done) => {
    const mockContent: ProcessedContent = {
      id: '789',
      originalText: 'Clear test',
      processedText: 'Processed clear test',
      style: 'creative',
      timestamp: new Date(),
      type: 'summarize'
    };

    service.addToHistory(mockContent);
    service.clearHistory();

    service.getHistory().subscribe(history => {
      expect(history.length).toBe(0);
      done();
    });
  });

  it('should maintain history order (newest first)', (done) => {
    const content1: ProcessedContent = {
      id: '1',
      originalText: 'First',
      processedText: 'Processed first',
      style: 'formal',
      timestamp: new Date(2024, 0, 1),
      type: 'summarize'
    };

    const content2: ProcessedContent = {
      id: '2',
      originalText: 'Second',
      processedText: 'Processed second',
      style: 'formal',
      timestamp: new Date(2024, 0, 2),
      type: 'summarize'
    };

    service.addToHistory(content1);
    service.addToHistory(content2);

    service.getHistory().subscribe(history => {
      expect(history.length).toBe(2);
      expect(history[0].id).toBe('2'); // Newest first
      expect(history[1].id).toBe('1');
      done();
    });
  });
});
