import { Helmet } from 'react-helmet-async';

export interface OGPProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
}

export const OGP = ({
  title,
  description,
  url = '/',
  image = '/og-conovel-logo.webp',
  imageAlt = 'Conovelのロゴ',
  type = 'website',
}: OGPProps) => {
  const siteName = 'Conovel';
  const fullTitle = title === siteName ? title : `${title} | ${siteName}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name='description' content={description} />

      {/* Open Graph / Facebook */}
      <meta property='og:type' content={type} />
      <meta property='og:site_name' content={siteName} />
      <meta property='og:title' content={fullTitle} />
      <meta property='og:description' content={description} />
      <meta property='og:url' content={url} />
      <meta property='og:locale' content='ja_JP' />
      <meta property='og:image' content={image} />
      <meta property='og:image:alt' content={imageAlt} />
      <meta property='og:image:type' content='image/webp' />

      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={fullTitle} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:url' content={url} />
      <meta name='twitter:image' content={image} />
      <meta name='twitter:image:alt' content={imageAlt} />
    </Helmet>
  );
};
