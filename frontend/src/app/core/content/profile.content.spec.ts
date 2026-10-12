import { PROFILE } from './profile.content';

/**
 * Content invariants (design → Correctness Properties P1–P5).
 * They protect the public copy from regressions against `.ai/steering/content-rules.md`.
 */
describe('PROFILE content', () => {
  const serialized = JSON.stringify(PROFILE);
  const privatBank = PROFILE.experience.find((e) => e.company === 'PrivatBank');

  describe('P1 integrity', () => {
    it('has the required top-level content', () => {
      expect(PROFILE.person.name).toBe('Mark Kulishov');
      expect(PROFILE.headline.role).toBe('Engineering Manager');
      expect(PROFILE.summary.length).toBeGreaterThan(100);
      expect(PROFILE.impactMetrics).toHaveLength(3);
      expect(PROFILE.caseStudies.length).toBeGreaterThanOrEqual(3);
      expect(PROFILE.principles.length).toBeGreaterThanOrEqual(4);
      expect(PROFILE.competencies.map((c) => c.title)).toEqual([
        'People Management',
        'Delivery Management',
        'Cloud & Architecture',
        'Engineering',
        'AI-Assisted Delivery',
        'Methods & Tools',
      ]);
    });

    it('has no empty strings anywhere', () => {
      const emptyStrings = serialized.match(/""/g) ?? [];
      expect(emptyStrings).toHaveLength(0);
    });

    it('keeps every case study within 90 words', () => {
      for (const cs of PROFILE.caseStudies) {
        const words = `${cs.challenge} ${cs.approach} ${cs.result}`.split(/\s+/).length;
        expect(words, cs.id).toBeLessThanOrEqual(90);
      }
    });

    it('uses well-formed periods', () => {
      const periodPart = /^((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) )?\d{4}$/;
      const periods = [
        ...PROFILE.experience.flatMap((e) => [e.period, ...e.roles.map((r) => r.period)]),
        ...PROFILE.education.map((e) => e.period),
      ];
      for (const period of periods) {
        expect(period.start).toMatch(periodPart);
        expect(period.end === 'Present' || periodPart.test(period.end), period.end).toBe(true);
      }
    });
  });

  describe('P2 claims guard', () => {
    it.each([/P&L/i, /budget owner/i, /\b10x\b/i, /B2\+/, /\bC1\b/, /\bfluent\b/i])(
      'never contains the banned claim %s',
      (pattern) => {
        expect(serialized).not.toMatch(pattern);
      }
    );

    it('contains no phone number or email address', () => {
      expect(serialized).not.toMatch(/\+\d{2,3}[\s-]?\d{3}[\s-]?\d{3}[\s-]?\d{3}/);
      expect(serialized).not.toMatch(/604\D?357\D?902/);
      expect(serialized).not.toMatch(/[\w.+-]+@[\w-]+\.[\w.]+/);
      expect(Object.keys(PROFILE.person)).not.toContain('email');
      expect(Object.keys(PROFILE.person)).not.toContain('phone');
    });

    it('uses the approved team size and hiring numbers', () => {
      expect(serialized).toContain('unit of 7 (4 engineers, 3 business analysts');
      expect(serialized).not.toMatch(/unit of 9|6 engineers/);
      expect(serialized).not.toMatch(/(hired|hires?)\D{0,20}\b5\b/i);
    });
  });

  describe('P3 finished engagements', () => {
    it('shows only PrivatBank as an ongoing employer', () => {
      const ongoing = PROFILE.experience.filter((e) => e.period.end === 'Present');
      expect(ongoing.map((e) => e.company)).toEqual(['PrivatBank']);
    });

    it('describes independent projects without end dates or "Present"', () => {
      expect(JSON.stringify(PROFILE.independentProjects)).not.toMatch(/present/i);
    });
  });

  describe('P4 featured certification', () => {
    it('lists AWS SAA first and featured, with badge and verification links', () => {
      const [first] = PROFILE.certifications;
      expect(first.name).toBe('AWS Certified Solutions Architect – Associate');
      expect(first.featured).toBe(true);
      expect(first.expires).toBe('Aug 2029');
      expect(first.url).toMatch(/^https:\/\/www\.credly\.com\/badges\//);
      expect(first.verifyUrl).toMatch(/^https:\/\/cp\.certmetrics\.com\/amazon\//);
      expect(PROFILE.certifications.filter((c) => c.featured)).toHaveLength(1);
    });
  });

  describe('P5 title fidelity', () => {
    it('shows PrivatBank with the four approved titles and periods', () => {
      expect(privatBank?.period).toEqual({ start: 'Jul 2011', end: 'Present' });
      expect(privatBank?.roles.map((r) => [r.title, r.period.start, r.period.end])).toEqual([
        ['Team Lead & Delivery Manager', 'Jul 2025', 'Present'],
        ['Tech Lead (acting Engineering Manager)', '2022', 'Jul 2025'],
        ['Senior Full-Stack Developer', '2018', '2022'],
        ['Full-Stack Developer', 'Jul 2011', '2018'],
      ]);
    });

    it('never uses plain "Engineering Manager" as a past title', () => {
      const titles = PROFILE.experience.flatMap((e) => e.roles.map((r) => r.title));
      expect(titles).not.toContain('Engineering Manager');
    });

    it('uses the approved LinkedIn URL and language levels', () => {
      expect(PROFILE.person.links.linkedin).toBe('https://www.linkedin.com/in/mark-k-85140b1b5/');
      expect(PROFILE.languages).toContainEqual({
        name: 'English',
        level: 'Professional working proficiency',
      });
    });
  });

  describe('Design polish (D1–D3)', () => {
    it('D1 never repeats a pillar metric in "Results in numbers"', () => {
      const pillarValues = PROFILE.headline.pillars.flatMap((p) => p.proof.map((m) => m.value));
      const tileValues = PROFILE.impactMetrics.map((m) => m.value);

      expect(tileValues.filter((v) => pillarValues.includes(v))).toEqual([]);
    });

    it('D2 has three pillars in the order of the statement claims', () => {
      expect(PROFILE.headline.pillars.map((p) => p.title)).toEqual([
        'Predictable delivery',
        'AI in daily development',
        'One team',
      ]);
      const statement = PROFILE.headline.statement;
      const claims = ['ship predictably', 'bring AI', 'one team'].map((c) => statement.indexOf(c));
      expect(claims.every((i) => i >= 0)).toBe(true);
      expect([...claims].sort((a, b) => a - b)).toEqual(claims);
    });

    it('D3 starts every case study with a short headline that has a number', () => {
      for (const cs of PROFILE.caseStudies) {
        expect(cs.headline.split(/\s+/).length, cs.id).toBeLessThanOrEqual(10);
        expect(cs.headline, cs.id).toMatch(/\d/);
      }
    });

    it('gives every PrivatBank role a timeline note', () => {
      for (const role of privatBank?.roles ?? []) {
        expect(role.note, role.title).toBeTruthy();
      }
    });
  });
});
