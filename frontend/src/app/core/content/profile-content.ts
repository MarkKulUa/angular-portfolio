import { Injectable, computed, signal } from '@angular/core';
import { Certification, Profile, Role } from '@shared/models/profile.model';
import { PROFILE } from './profile.content';

/**
 * Read-only access to the portfolio content.
 * Content is compile-time data, so there are no loading or error states.
 */
@Injectable({
  providedIn: 'root',
})
export class ProfileContent {
  readonly profile = signal<Profile>(PROFILE).asReadonly();

  readonly featuredCertification = computed<Certification | undefined>(() =>
    this.profile().certifications.find((cert) => cert.featured)
  );

  readonly currentRole = computed<Role | undefined>(() => this.profile().experience[0]?.roles[0]);
}
