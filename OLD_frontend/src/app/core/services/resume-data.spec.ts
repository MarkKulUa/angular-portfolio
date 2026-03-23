import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ResumeData } from './resume-data';

describe('ResumeData', () => {
  let service: ResumeData;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), ResumeData],
    });

    service = TestBed.inject(ResumeData);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    TestBed.resetTestingModule();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch resume data', () => {
    const mockResumeData = {
      personalInfo: {
        name: 'Test User',
        location: 'Test Location',
        phone: '123-456-7890',
        email: 'test@example.com',
        linkedin: 'linkedin.com/in/test',
        photo: 'test.jpg',
      },
      summary: {
        title: 'Test Title',
        description: 'Test Description',
        languages: 'English',
      },
      technicalExpertise: {
        backend: ['Node.js'],
        frontend: ['Angular'],
        automation: [],
        data: [],
        devops: [],
        monitoring: [],
        tools: [],
        management: [],
        other: [],
      },
      certifiedSkills: [],
      workHistory: [],
      education: [],
      certifications: [],
    };

    service.getResumeData().subscribe((data) => {
      expect(data).toEqual(mockResumeData);
    });

    const req = httpMock.expectOne('assets/data/resume.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResumeData);
  });
});
