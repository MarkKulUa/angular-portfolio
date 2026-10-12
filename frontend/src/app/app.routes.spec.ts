import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Route, Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';
import { PokemonApiService } from '@core/services/pokemon-api.service';
import { Observable, of } from 'rxjs';

describe('app routes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: PokemonApiService,
          useValue: {
            getPokemonDetails: (): Observable<unknown> =>
              of({
                id: 25,
                name: 'pikachu',
                height: 4,
                weight: 60,
                sprites: { front_default: null, other: {} },
                types: [],
                abilities: [],
                stats: [],
              }),
            searchPokemon: (): Observable<unknown> => of({ count: 0, results: [] }),
          },
        },
      ],
    });
  });

  describe('P6 legacy redirects', () => {
    it.each([
      ['/pokemon', '/lab/pokemon'],
      ['/pokemon/pikachu', '/lab/pokemon/pikachu'],
      ['/auth', '/lab/auth/login'],
      ['/auth/login', '/lab/auth/login'],
      ['/auth/register', '/lab/auth/register'],
    ])('%s → %s', async (from, to) => {
      const harness = await RouterTestingHarness.create();
      await harness.navigateByUrl(from);

      expect(TestBed.inject(Router).url).toBe(to);
    });
  });

  describe('P7 titles', () => {
    function routesWithContent(list: Route[], prefix = ''): [string, Route][] {
      return list.flatMap((route) => {
        const path = `${prefix}/${route.path ?? ''}`.replace(/\/+/g, '/');
        const own: [string, Route][] =
          route.component || route.loadComponent ? [[path, route]] : [];
        return [...own, ...routesWithContent(route.children ?? [], path)];
      });
    }

    it('gives every page route a title', () => {
      for (const [path, route] of routesWithContent(routes)) {
        expect(route.title, path).toBeTruthy();
      }
    });

    it.each([
      ['/', 'Mark Kulishov · Engineering Manager'],
      ['/resume', 'Resume · Mark Kulishov'],
      ['/lab', 'Engineering Lab · Mark Kulishov'],
      ['/does-not-exist', 'Page not found · Mark Kulishov'],
    ])('sets the document title for %s', async (url, title) => {
      const harness = await RouterTestingHarness.create();
      await harness.navigateByUrl(url);

      expect(document.title).toBe(title);
    });
  });
});
