import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), ApiService],
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    TestBed.resetTestingModule();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make GET request', () => {
    const mockData = { id: 1, name: 'Test' };
    const endpoint = '/test';

    service.get(endpoint).subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne((request) => request.url.includes(endpoint));
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should make POST request', () => {
    const mockData = { id: 1, name: 'Test' };
    const endpoint = '/test';
    const payload = { name: 'Test' };

    service.post(endpoint, payload).subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne((request) => request.url.includes(endpoint));
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush(mockData);
  });

  it('should make PUT request', () => {
    const mockData = { id: 1, name: 'Updated' };
    const endpoint = '/test/1';
    const payload = { name: 'Updated' };

    service.put(endpoint, payload).subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne((request) => request.url.includes(endpoint));
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(payload);
    req.flush(mockData);
  });

  it('should make DELETE request', () => {
    const endpoint = '/test/1';

    service.delete(endpoint).subscribe((data) => {
      expect(data).toEqual({});
    });

    const req = httpMock.expectOne((request) => request.url.includes(endpoint));
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
