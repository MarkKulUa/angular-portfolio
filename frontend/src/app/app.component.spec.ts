import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppComponent } from './app.component';

@Component({
  selector: 'app-stub-page',
  template: '<h1>Stub</h1>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class StubPage {}

/** D5: "Built with" icons are hidden on the landing page only. */
describe('AppComponent footer tech stack', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: '', component: StubPage },
          { path: 'resume', component: StubPage },
          { path: 'lab', component: StubPage },
        ]),
      ],
    });
  });

  it.each([
    ['/', false],
    ['/#impact', false],
    ['/resume', true],
    ['/lab', true],
  ])('%s → tech stack visible: %s', async (url, visible) => {
    const harness = await RouterTestingHarness.create();
    const fixture = TestBed.createComponent(AppComponent);
    await harness.navigateByUrl(url);
    fixture.detectChanges();
    await fixture.whenStable();

    const techStack = (fixture.nativeElement as HTMLElement).querySelector('.tech-stack');
    expect(techStack !== null).toBe(visible);
  });
});
