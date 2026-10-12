import { PROFILE } from '../content/profile.content';
import { buildCvDocument, extendedCvNote } from './cv-document';

/** P8 PDF parity: the PDF carries the same facts as the website. */
describe('buildCvDocument', () => {
  const doc = buildCvDocument(PROFILE);
  const serialized = JSON.stringify(doc.content);

  it('is an A4 document titled with the name and role', () => {
    expect(doc.pageSize).toBe('A4');
    expect(doc.info?.title).toBe('Mark Kulishov · Engineering Manager · CV');
  });

  it('contains every role title, certification and the LinkedIn link', () => {
    for (const role of PROFILE.experience.flatMap((e) => e.roles)) {
      expect(serialized).toContain(JSON.stringify(role.title));
    }
    for (const cert of PROFILE.certifications) {
      expect(serialized).toContain(cert.name);
    }
    expect(serialized).toContain(PROFILE.person.links.linkedin);
  });

  it('keeps the section order of the online resume', () => {
    const order = [
      'SUMMARY',
      'CORE COMPETENCIES',
      'WORK HISTORY',
      'SELECTED INDEPENDENT PROJECTS',
      'EDUCATION',
      'LICENSES & CERTIFICATIONS',
      'LANGUAGES',
    ].map((title) => serialized.indexOf(`"${title}"`));

    expect(order.every((i) => i >= 0)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
  });

  it('adds the "extended CV on request" note to every page footer', () => {
    const footer = (doc.footer as (page: number, count: number) => unknown)(1, 2);
    expect(JSON.stringify(footer)).toContain(extendedCvNote(PROFILE.person.links.linkedin));
    expect(JSON.stringify(footer)).toContain('1 / 2');
  });

  it('contains no phone number or email address', () => {
    expect(serialized).not.toMatch(/mailto:|tel:|@[\w-]+\.\w+|604\D?357/);
  });
});
