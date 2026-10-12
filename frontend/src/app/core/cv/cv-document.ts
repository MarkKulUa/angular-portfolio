import type { Content, TDocumentDefinitions } from 'pdfmake/interfaces';
import { Period, Profile } from '@shared/models/profile.model';

const ACCENT = '#5a4fcf';
const MUTED = '#4a5568';

const formatPeriod = (period: Period): string => `${period.start} – ${period.end}`;

export const extendedCvNote = (linkedin: string): string =>
  `Extended CV available on request. Message me on LinkedIn: ${linkedin}`;

/**
 * Builds the CV document from the same content as the website.
 * Pure function: no browser APIs, so it is unit-testable.
 */
export function buildCvDocument(profile: Profile): TDocumentDefinitions {
  const { person, headline } = profile;

  const sectionTitle = (text: string): Content => ({
    text: text.toUpperCase(),
    style: 'sectionTitle',
  });

  const header: Content[] = [
    { text: person.name, style: 'name' },
    { text: headline.role, style: 'role' },
    { text: headline.tagline.join('  ·  '), style: 'muted', margin: [0, 2, 0, 0] },
    {
      text: [
        `${person.location} · ${person.workFormat} · `,
        { text: 'LinkedIn', link: person.links.linkedin, color: ACCENT, decoration: 'underline' },
        ' · ',
        { text: 'Credly', link: person.links.credly, color: ACCENT, decoration: 'underline' },
      ],
      style: 'muted',
      margin: [0, 2, 0, 0],
    },
  ];

  const summary: Content[] = [
    sectionTitle('Summary'),
    ...profile.summary
      .split(/\n\s*\n/)
      .filter((p) => p.trim())
      .map((p): Content => ({ text: p.trim(), margin: [0, 0, 0, 4] })),
  ];

  const competencies: Content[] = [
    sectionTitle('Core Competencies'),
    {
      ul: profile.competencies.map((group): Content => ({
        text: [
          { text: `${group.title}: `, bold: true },
          group.items.join(', '),
          ...(group.extra ? [` · ${group.extra.label}: ${group.extra.items.join(', ')}`] : []),
        ],
      })),
      margin: [0, 0, 0, 2],
    },
  ];

  const experience: Content[] = [
    sectionTitle('Work History'),
    ...profile.experience.flatMap((employer): Content[] => [
      {
        text: [
          { text: employer.company, bold: true, color: ACCENT },
          {
            text: `  ·  ${employer.employmentType} · ${formatPeriod(employer.period)} · ${employer.location}`,
            color: MUTED,
          },
        ],
        margin: [0, 0, 0, 4],
      },
      ...employer.roles.map((role): Content => ({
        stack: [
          {
            columns: [
              { text: role.title, bold: true },
              { text: formatPeriod(role.period), alignment: 'right', color: MUTED, width: 'auto' },
            ],
          },
          { ul: role.highlights, margin: [0, 2, 0, 6] },
        ],
        unbreakable: role.highlights.length <= 4,
      })),
      ...(employer.focus?.length
        ? [{ text: [{ text: 'Focus: ', bold: true }, employer.focus.join(', ')] } as Content]
        : []),
      ...(employer.tech?.length
        ? [
            {
              text: [{ text: 'Tech: ', bold: true }, employer.tech.join(', ')],
              margin: [0, 2, 0, 0],
            } as Content,
          ]
        : []),
    ]),
  ];

  const projects: Content[] = [
    sectionTitle('Selected Independent Projects'),
    {
      ul: profile.independentProjects.map((project): Content => ({
        text: [
          { text: project.name, bold: true },
          ` - ${project.description} (${project.tech.join(', ')})`,
        ],
        margin: [0, 0, 0, 2],
      })),
    },
  ];

  const education: Content[] = [
    sectionTitle('Education'),
    ...profile.education.map((edu): Content => ({
      stack: [
        { text: edu.institution, bold: true },
        `${edu.degree} · “${edu.specialization}” · ${formatPeriod(edu.period)}`,
      ],
    })),
  ];

  const certifications: Content[] = [
    sectionTitle('Licenses & Certifications'),
    {
      ul: profile.certifications.map((cert): Content => ({
        text: [
          cert.url
            ? { text: cert.name, bold: true, link: cert.url, color: ACCENT }
            : { text: cert.name, bold: true },
          ` · ${cert.provider} · Issued ${cert.issued}${cert.expires ? ` · Expires ${cert.expires}` : ''}`,
        ],
      })),
    },
  ];

  const languages: Content[] = [
    sectionTitle('Languages'),
    { text: profile.languages.map((l) => `${l.name}: ${l.level}`).join(' · ') },
  ];

  return {
    pageSize: 'A4',
    pageMargins: [40, 40, 40, 50],
    info: {
      title: `${person.name} · ${headline.role} · CV`,
      author: person.name,
      subject: 'Curriculum Vitae',
    },
    content: [
      ...header,
      ...summary,
      ...competencies,
      ...experience,
      ...projects,
      ...education,
      ...certifications,
      ...languages,
    ],
    footer: (currentPage: number, pageCount: number): Content => ({
      columns: [
        { text: extendedCvNote(person.links.linkedin), link: person.links.linkedin },
        { text: `${currentPage} / ${pageCount}`, alignment: 'right', width: 'auto' },
      ],
      margin: [40, 16, 40, 0],
      fontSize: 8,
      color: MUTED,
    }),
    defaultStyle: { font: 'Roboto', fontSize: 9.5, lineHeight: 1.25, color: '#1a202c' },
    styles: {
      name: { fontSize: 22, bold: true },
      role: { fontSize: 13, bold: true, color: ACCENT, margin: [0, 2, 0, 0] },
      muted: { color: MUTED, fontSize: 9 },
      sectionTitle: {
        fontSize: 10.5,
        bold: true,
        color: ACCENT,
        characterSpacing: 0.8,
        margin: [0, 12, 0, 5],
      },
    },
  };
}
