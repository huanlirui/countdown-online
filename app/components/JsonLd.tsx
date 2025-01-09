'use client'

interface StructuredData {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
  operatingSystem?: string;
  browserRequirements?: string;
  offers?: {
    '@type': string;
    price: string;
    priceCurrency: string;
  };
  featureList?: string[];
}

interface JsonLdProps {
  data: StructuredData;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
} 