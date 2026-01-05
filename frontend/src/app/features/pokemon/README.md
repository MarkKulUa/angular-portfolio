# Pokemon Feature Module

Демонстрационный модуль для портфолио, показывающий современную архитектуру Angular 21.

## 🏗️ Архитектура

### Standalone Components
Все компоненты используют standalone API без NgModules:
- `PokemonListComponent` - список покемонов с поиском и пагинацией
- `PokemonCardComponent` - карточка покемона с выбором
- `PokemonDetailsComponent` - детальная информация о покемоне
- `PokemonPaginationComponent` - компонент пагинации
- `PokemonSelectedFlyoutComponent` - flyout с выбранными покемонами

### Services с Dependency Injection
- `PokemonApiService` - HTTP сервис для работы с PokeAPI
- `PokemonStateService` - state management с использованием Signals

### Guards
- `pokemonDetailsGuard` - функциональный guard для проверки существования покемона

### Models
- Типизированные интерфейсы для Pokemon, PokemonDetails, PokemonResponse

## 🎯 Демонстрируемые концепции

### 1. Signals (Angular 21)
```typescript
readonly pokemon = signal<Pokemon[]>([]);
readonly selectedCount = computed(() => this.selectedPokemon().length);
```

### 2. Dependency Injection
```typescript
private readonly pokemonApi = inject(PokemonApiService);
private readonly pokemonState = inject(PokemonStateService);
```

### 3. RxJS & Reactive Programming
```typescript
this.searchSubject.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap((term) => this.pokemonApi.searchPokemon(term))
)
```

### 4. Lifecycle Hooks
```typescript
ngOnInit(): void {
  this.route.params.pipe(takeUntilDestroyed(this.destroyRef))
}
```

### 5. Route Guards
```typescript
export const pokemonDetailsGuard: CanActivateFn = (route) => {
  // Валидация перед загрузкой компонента
}
```

### 6. Lazy Loading
```typescript
{
  path: 'pokemon',
  loadComponent: () => import('./pokemon-list.component')
}
```

### 7. Control Flow Syntax (@if, @for)
```html
@if (isLoading()) {
  <div>Loading...</div>
} @else {
  @for (poke of pokemon(); track poke.name) {
    <app-pokemon-card [pokemon]="poke" />
  }
}
```

## 📦 Функционал

- ✅ Список покемонов с grid layout
- ✅ Поиск с debounce
- ✅ Постраничная навигация
- ✅ Детальная страница покемона
- ✅ Множественный выбор покемонов
- ✅ Экспорт в CSV
- ✅ Responsive дизайн
- ✅ Loading states
- ✅ Error handling

## 🚀 Технологии

- Angular 21
- Standalone Components
- Signals API
- RxJS
- TypeScript
- SCSS
- PokeAPI

## 📁 Структура

```
pokemon/
├── pokemon-list/           # Главная страница со списком
├── pokemon-card/           # Карточка покемона
├── pokemon-details/        # Детальная страница
├── pokemon-pagination/     # Компонент пагинации
├── pokemon-selected-flyout/ # Flyout с выбранными
└── README.md
```

## 🎨 Стилизация

- CSS Grid для layout
- Flexbox для компонентов
- CSS Variables для цветов типов
- Анимации и transitions
- Mobile-first подход
