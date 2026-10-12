import { TestBed } from '@angular/core/testing';
import { PROFILE } from '../content/profile.content';
import { CvPdfService, PDFMAKE_LOADER, PdfMakeApi } from './cv-pdf.service';

describe('CvPdfService', () => {
  let download: ReturnType<typeof vi.fn<(fileName?: string) => Promise<void>>>;
  let createPdf: ReturnType<typeof vi.fn<PdfMakeApi['createPdf']>>;
  let loader: ReturnType<typeof vi.fn<() => Promise<PdfMakeApi>>>;

  function setup(): CvPdfService {
    TestBed.configureTestingModule({ providers: [{ provide: PDFMAKE_LOADER, useValue: loader }] });
    return TestBed.inject(CvPdfService);
  }

  beforeEach(() => {
    download = vi.fn<(fileName?: string) => Promise<void>>().mockResolvedValue(undefined);
    createPdf = vi.fn<PdfMakeApi['createPdf']>().mockReturnValue({ download });
    loader = vi.fn<() => Promise<PdfMakeApi>>().mockResolvedValue({ createPdf });
  });

  it('loads pdfmake lazily and downloads the CV with the configured file name', async () => {
    const service = setup();
    expect(loader).not.toHaveBeenCalled();

    await service.download();

    expect(loader).toHaveBeenCalledTimes(1);
    expect(createPdf.mock.calls[0][0].info?.title).toContain('Mark Kulishov');
    expect(download).toHaveBeenCalledWith(PROFILE.person.cvFileName);
    expect(service.generating()).toBe(false);
    expect(service.error()).toBeNull();
  });

  it('reuses the loaded library on the next click', async () => {
    const service = setup();
    await service.download();
    await service.download();

    expect(loader).toHaveBeenCalledTimes(1);
    expect(download).toHaveBeenCalledTimes(2);
  });

  it('falls back to the print dialog and reports an error when generation fails', async () => {
    loader.mockRejectedValueOnce(new Error('chunk failed'));
    const service = setup();
    const print = vi.spyOn(window, 'print').mockImplementation(() => undefined);
    vi.spyOn(console, 'error').mockImplementation(() => undefined);

    await service.download();

    expect(print).toHaveBeenCalledTimes(1);
    expect(service.error()).toContain('print dialog');
    expect(service.generating()).toBe(false);
  });
});
