import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resume } from '@shared/models/resume.model';

@Injectable({
  providedIn: 'root',
})
export class ResumeData {
  private readonly dataPath = 'assets/data/resume.json';
  private readonly http = inject(HttpClient);

  getResumeData(): Observable<Resume> {
    return this.http.get<Resume>(this.dataPath);
  }
}
