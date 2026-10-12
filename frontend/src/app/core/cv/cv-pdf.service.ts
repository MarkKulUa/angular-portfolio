import { Injectable, InjectionToken, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import type { TCreatedPdf, TDocumentDefinitions } from 'pdfmake/interfaces';
import { ProfileContent } from '../content/profile-content';
import { buildCvDocument } from './cv-document';

/** The subset of pdfmake the service needs. */
export interface PdfMakeApi {
  createPdf(doc: TDocumentDefinitions): Pick<TCreatedPdf, 'download'>;
}

/**
 * Loads pdfmake and its fonts. Lazy by default (~1.5 MB, fetched on the first click only).
 * Exposed as a token so tests can provide a fake.
 */
export const PDFMAKE_LOADER = new InjectionToken<() => Promise<PdfMakeApi>>('PDFMAKE_LOADER', {
  providedIn: 'root',
  factory: (): (() => Promise<PdfMakeApi>) => loadPdfMake,
});

async function loadPdfMake(): Promise<PdfMakeApi> {
  const [pdfMakeModule, fontsModule] = await Promise.all([
    import('pdfmake/build/pdfmake'),
    import('pdfmake/build/vfs_fonts'),
  ]);
  type PdfMakeModule = typeof import('pdfmake/build/pdfmake');
  // pdfmake is CommonJS: depending on interop, the API is the module itself or its default export.
  const mod = pdfMakeModule as unknown as PdfMakeModule & { default?: PdfMakeModule };
  const pdfMake = mod.default ?? mod;
  const fonts = fontsModule as unknown as { default?: unknown };
  const vfs = fonts.default ?? fontsModule;
  pdfMake.addVirtualFileSystem(vfs as Parameters<PdfMakeModule['addVirtualFileSystem']>[0]);
  return pdfMake;
}

/** Generates the CV PDF from the portfolio content on demand. */
@Injectable({
  providedIn: 'root',
})
export class CvPdfService {
  private readonly content = inject(ProfileContent);
  private readonly document = inject(DOCUMENT);
  private readonly loader = inject(PDFMAKE_LOADER);
  private pdfMake: Promise<PdfMakeApi> | null = null;

  private readonly generatingSignal = signal(false);
  private readonly errorSignal = signal<string | null>(null);
  readonly generating = this.generatingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  async download(): Promise<void> {
    if (this.generatingSignal()) {
      return;
    }
    this.generatingSignal.set(true);
    this.errorSignal.set(null);

    try {
      this.pdfMake ??= this.loader();
      const pdfMake = await this.pdfMake;
      const profile = this.content.profile();
      await pdfMake.createPdf(buildCvDocument(profile)).download(profile.person.cvFileName);
    } catch (err) {
      console.error('CV PDF generation failed', err);
      this.errorSignal.set('The PDF could not be generated. Opening the print dialog instead.');
      this.pdfMake = null;
      this.document.defaultView?.print();
    } finally {
      this.generatingSignal.set(false);
    }
  }
}
