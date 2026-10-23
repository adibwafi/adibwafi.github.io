import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectDetailPage from '@/components/ProjectDetailPage';
import { projects, getProjectBySlug } from '@/lib/data';

/* ─── Per-project case-study route — /work/[slug] ─────────────────────────── */

const SITE = 'https://www.adibwafi.com';

/** Trim a description to a clean meta-length snippet (~160 chars). */
function metaDescription(text: string): string {
  if (text.length <= 160) return text;
  const clipped = text.slice(0, 157);
  return `${clipped.slice(0, clipped.lastIndexOf(' '))}…`;
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const url = `${SITE}/work/${project.slug}`;
  const idUrl = `${SITE}/id/work/${project.slug}`;
  const description = metaDescription(project.en.description);
  const image = `${SITE}${project.imageSrc}`;

  return {
    title: `${project.title} — Case Study`,
    description,
    keywords: [...project.tags, 'Menako Studio', 'Muhamad Adibwafi Menako'],
    alternates: {
      canonical: url,
      languages: { 'en-US': url, 'id-ID': idUrl, 'x-default': url },
    },
    openGraph: {
      title: `${project.title} — Case Study`,
      description,
      url,
      siteName: 'Muhamad Adibwafi Menako Portfolio',
      images: [{ url: image, width: 1200, height: 630, alt: project.title }],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — Case Study`,
      description,
      images: [image],
      creator: '@adibwafi',
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const url = `${SITE}/work/${project.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
          { '@type': 'ListItem', position: 2, name: 'Work', item: `${SITE}/work` },
          { '@type': 'ListItem', position: 3, name: project.title, item: url },
        ],
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${url}#project`,
        name: project.title,
        description: project.en.description,
        url,
        applicationCategory: 'WebApplication',
        operatingSystem: 'Web',
        keywords: project.tags.join(', '),
        ...(project.webLink ? { installUrl: project.webLink } : {}),
        codeRepository: project.link,
        image: `${SITE}${project.imageSrc}`,
        author: { '@id': `${SITE}/#person` },
        isPartOf: { '@id': `${SITE}/#website` },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetailPage project={project} />
    </>
  );
}
