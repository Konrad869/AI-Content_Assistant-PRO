# Testing Guide - AI Content Assistant PRO

## Przegląd testów

Projekt zawiera kompleksowe testy jednostkowe napisane w **Jasmine** i uruchamiane przez **Karma**.

## Pokrycie testami

### Serwisy
- ✅ **ContentService** - Przetwarzanie tekstu (summarize, rewrite)
- ✅ **HistoryService** - Zarządzanie historią
- ⚠️ **HuggingFaceService** - Integracja z API (wymaga mockowania)
- ⚠️ **ReplicateService** - Integracja z API (wymaga mockowania)

### Komponenty
- ✅ **App** - Główny komponent aplikacji
- ✅ **ContentProcessorComponent** - Formularz przetwarzania tekstu

## Uruchamianie testów

### Wszystkie testy (tryb watch)
```bash
npm test
```
lub
```bash
ng test
```

### Jednorazowe uruchomienie (CI/CD)
```bash
ng test --watch=false --browsers=ChromeHeadless
```

### Testy z pokryciem kodu
```bash
ng test --code-coverage
```

Raport pokrycia zostanie wygenerowany w folderze `coverage/`.

### Uruchomienie konkretnego pliku testowego
```bash
ng test --include='**/content.spec.ts'
```

## Struktura testów

### ContentService Tests
- ✅ Tworzenie serwisu
- ✅ Przetwarzanie tekstu (summarize)
- ✅ Przetwarzanie tekstu (rewrite) - wszystkie style
- ✅ Unikalne ID dla każdego przetwarzania
- ✅ Symulacja opóźnienia API
- ✅ Skracanie tekstu do 1/3 zdań

### HistoryService Tests
- ✅ Tworzenie serwisu
- ✅ Dodawanie elementów do historii
- ✅ Odczyt z localStorage
- ✅ Czyszczenie historii
- ✅ Kolejność (najnowsze pierwsze)

### ContentProcessorComponent Tests
- ✅ Tworzenie komponentu
- ✅ Walidacja formularza (min 10 znaków)
- ✅ Przetwarzanie tekstu
- ✅ Obsługa błędów
- ✅ Kopiowanie do schowka
- ✅ Wyświetlanie nazw stylów i typów

### App Component Tests
- ✅ Tworzenie aplikacji
- ✅ Renderowanie nagłówka
- ✅ Renderowanie opisu
- ✅ Obecność router-outlet
- ✅ Renderowanie stopki
- ✅ Struktura HTML

## Dobre praktyki

### 1. Izolacja testów
Każdy test jest niezależny i nie wpływa na inne testy.

### 2. Mockowanie zależności
```typescript
const contentServiceSpy = jasmine.createSpyObj('ContentService', ['processContent']);
```

### 3. Czyszczenie po testach
```typescript
afterEach(() => {
  localStorage.clear();
});
```

### 4. Testowanie asynchroniczne
```typescript
it('should process text', (done) => {
  service.processContent(text, 'formal', 'summarize').subscribe(result => {
    expect(result).toBeTruthy();
    done();
  });
});
```

## Debugowanie testów

### Uruchomienie w trybie debug
1. Uruchom `ng test`
2. Kliknij "DEBUG" w oknie Karma
3. Otwórz DevTools (F12)
4. Ustaw breakpointy w zakładce "Sources"

### Uruchomienie pojedynczego testu
Użyj `fit()` zamiast `it()`:
```typescript
fit('should test specific case', () => {
  // test code
});
```

### Pominięcie testu
Użyj `xit()` zamiast `it()`:
```typescript
xit('should skip this test', () => {
  // test code
});
```

## Konfiguracja Karma

Plik konfiguracyjny: `karma.conf.js`

### Przeglądarki
- Chrome (domyślnie)
- ChromeHeadless (CI/CD)
- Firefox
- Safari

### Raportowanie
- Progress reporter (konsola)
- Coverage reporter (pokrycie kodu)

## Continuous Integration

### GitHub Actions przykład
```yaml
- name: Run tests
  run: npm test -- --watch=false --browsers=ChromeHeadless --code-coverage
```

## Metryki jakości

### Docelowe pokrycie kodu
- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

## Rozszerzanie testów

### Dodawanie nowego testu
1. Utwórz plik `*.spec.ts` obok testowanego pliku
2. Importuj `TestBed` i testowany komponent/serwis
3. Napisz testy używając `describe()` i `it()`
4. Uruchom `ng test` aby sprawdzić

### Przykład struktury
```typescript
describe('MyService', () => {
  let service: MyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('myMethod', () => {
    it('should return expected value', () => {
      const result = service.myMethod();
      expect(result).toBe('expected');
    });
  });
});
```

## Troubleshooting

### Problem: Testy nie uruchamiają się
**Rozwiązanie**: Sprawdź czy Chrome jest zainstalowany lub użyj ChromeHeadless

### Problem: Timeout errors
**Rozwiązanie**: Zwiększ timeout w `karma.conf.js`:
```javascript
browserNoActivityTimeout: 60000
```

### Problem: localStorage nie działa
**Rozwiązanie**: Wyczyść localStorage w `beforeEach()` i `afterEach()`

## Zasoby

- [Jasmine Documentation](https://jasmine.github.io/)
- [Karma Documentation](https://karma-runner.github.io/)
- [Angular Testing Guide](https://angular.dev/guide/testing)
- [Testing Best Practices](https://angular.dev/guide/testing/best-practices)
