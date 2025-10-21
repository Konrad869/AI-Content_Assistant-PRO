import { TestBed } from '@angular/core/testing';
import { ContentService } from './content';

describe('ContentService', () => {
  let service: ContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('processContent', () => {
    it('should process text with summarize type', (done) => {
      const text = 'This is a test sentence. This is another sentence. And one more sentence.';
      
      service.processContent(text, 'formal', 'summarize').subscribe(result => {
        expect(result).toBeTruthy();
        expect(result.originalText).toBe(text);
        expect(result.processedText).toBeTruthy();
        expect(result.style).toBe('formal');
        expect(result.type).toBe('summarize');
        expect(result.id).toBeTruthy();
        expect(result.timestamp).toBeInstanceOf(Date);
        done();
      });
    });

    it('should process text with rewrite type - formal style', (done) => {
      const text = "I'm testing this. I can't do it.";
      
      service.processContent(text, 'formal', 'rewrite').subscribe(result => {
        expect(result).toBeTruthy();
        expect(result.originalText).toBe(text);
        expect(result.processedText).toContain('I am');
        expect(result.processedText).toContain('cannot');
        expect(result.style).toBe('formal');
        expect(result.type).toBe('rewrite');
        done();
      });
    });

    it('should process text with rewrite type - technical style', (done) => {
      const text = 'Technical content here.';
      
      service.processContent(text, 'technical', 'rewrite').subscribe(result => {
        expect(result).toBeTruthy();
        expect(result.processedText).toContain('technical clarity and precision');
        expect(result.style).toBe('technical');
        done();
      });
    });

    it('should process text with rewrite type - creative style', (done) => {
      const text = 'Creative content here.';
      
      service.processContent(text, 'creative', 'rewrite').subscribe(result => {
        expect(result).toBeTruthy();
        expect(result.processedText).toContain('✨');
        expect(result.style).toBe('creative');
        done();
      });
    });

    it('should return unique IDs for different processes', (done) => {
      const text = 'Test text';
      const ids = new Set<string>();
      
      service.processContent(text, 'formal', 'summarize').subscribe(result1 => {
        ids.add(result1.id);
        
        service.processContent(text, 'formal', 'summarize').subscribe(result2 => {
          ids.add(result2.id);
          expect(ids.size).toBe(2);
          done();
        });
      });
    });

    it('should simulate API delay', (done) => {
      const startTime = Date.now();
      
      service.processContent('Test', 'formal', 'summarize').subscribe(() => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        expect(duration).toBeGreaterThanOrEqual(700); // Should take at least 700ms (800ms delay - tolerance)
        done();
      });
    });
  });

  describe('summarizeText', () => {
    it('should summarize text by taking first third of sentences', (done) => {
      const text = 'First sentence. Second sentence. Third sentence. Fourth sentence. Fifth sentence. Sixth sentence.';
      
      service.processContent(text, 'formal', 'summarize').subscribe(result => {
        const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
        const expectedLength = Math.max(1, Math.floor(sentences.length / 3));
        const resultSentences = result.processedText.match(/[^.!?]+[.!?]+/g) || [];
        
        expect(resultSentences.length).toBeLessThanOrEqual(expectedLength);
        done();
      });
    });
  });
});
