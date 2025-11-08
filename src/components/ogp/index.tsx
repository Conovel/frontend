import { Helmet } from 'react-helmet-async';
import rectangleLogo from '../../assets/conovel_rectangle.png';
import squareLogo from '../../assets/conovel_square_logo.webp';

export interface OGPProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  imageAlt?: string;
  smallImage?: string;
  smallImageAlt?: string;
  type?: 'website' | 'article';
}

export const OGP = ({
  title,
  description,
  url = '/',
  image = rectangleLogo,
  imageAlt = 'Conovelのロゴ',
  smallImage,
  smallImageAlt,
  type = 'website',
}: OGPProps) => {
  const siteName = 'Conovel';
  const fullTitle = title === siteName ? title : `${title} | ${siteName}`;
  const previewImage =
    smallImage ?? (image === rectangleLogo ? squareLogo : image);
  const previewImageAlt = smallImageAlt ?? imageAlt;

  const resolveMimeType = (src: string) => {
    const lower = src.split('?').shift()?.toLowerCase() ?? '';
    if (lower.endsWith('.png')) return 'image/png';
    if (lower.endsWith('.webp')) return 'image/webp';
    if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return 'image/jpeg';
    return undefined;
  };

  const ogImageType = resolveMimeType(image);
  const previewImageType = resolveMimeType(previewImage);

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
      <meta property='og:image' content={image} key='og-image-large' />
      {ogImageType && (
        <meta
          property='og:image:type'
          content={ogImageType}
          key='og-image-type-large'
        />
      )}
      <meta
        property='og:image:alt'
        content={imageAlt}
        key='og-image-alt-large'
      />
      <meta property='og:image' content={previewImage} key='og-image-small' />
      {previewImageType && (
        <meta
          property='og:image:type'
          content={previewImageType}
          key='og-image-type-small'
        />
      )}
      <meta
        property='og:image:alt'
        content={previewImageAlt}
        key='og-image-alt-small'
      />

      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={fullTitle} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:url' content={url} />
      <meta name='twitter:image' content={previewImage} />
      <meta name='twitter:image:alt' content={previewImageAlt} />
    </Helmet>
  );
};
