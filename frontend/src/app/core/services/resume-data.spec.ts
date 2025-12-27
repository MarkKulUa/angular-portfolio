import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ResumeData } from './resume-data';

describe('ResumeData', () => {
  let service: ResumeData;
  let httpClientMock: { get: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    httpClientMock = {
      get: vi.fn(),
    };

    service = new ResumeData(httpClientMock as any);
  });

  afterEach(() => {
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

    httpClientMock.get.mockReturnValue(of(mockResumeData));

    service.getResumeData().subscribe((data) => {
      expect(data).toEqual(mockResumeData);
    });

    expect(httpClientMock.get).toHaveBeenCalledWith('assets/data/resume.json');
  });
});
