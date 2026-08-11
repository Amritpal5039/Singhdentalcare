const fs = require('fs');
const path = require('path');

const pages = [
  {
    path: 'app/Our-services/page.tsx',
    title: 'Our Services',
    description: 'Explore the wide range of dental services provided by Singh Dental Care including routine check-ups, cosmetic dentistry, and advanced procedures.',
    keywords: ['dental services', 'teeth whitening', 'cosmetic dentistry', 'orthodontics', 'dental implants']
  },
  {
    path: 'app/about/page.tsx',
    title: 'About Us',
    description: 'Learn more about Singh Dental Care, our experienced team of dentists, and our commitment to providing the best dental care.',
    keywords: ['about Singh Dental Care', 'best dentists', 'dental clinic team', 'experienced dentists']
  },
  {
    path: 'app/become-a-member/page.tsx',
    title: 'Become a Member',
    description: 'Join the Singh Dental Care membership program for exclusive benefits, discounted treatments, and priority appointments.',
    keywords: ['dental membership', 'dental plan', 'dental care benefits', 'discounted dental care']
  },
  {
    path: 'app/careers/page.tsx',
    title: 'Careers',
    description: 'Join the Singh Dental Care team. We are always looking for passionate and skilled dental professionals to grow with us.',
    keywords: ['dental jobs', 'dentist careers', 'dental assistant jobs', 'hiring dentists']
  },
  {
    path: 'app/expert/page.tsx',
    title: 'Our Experts',
    description: 'Meet our team of expert dentists at Singh Dental Care who are dedicated to ensuring your smile stays healthy and beautiful.',
    keywords: ['dental experts', 'specialist dentists', 'orthodontist', 'periodontist']
  },
  {
    path: 'app/locations/page.tsx',
    title: 'Locations',
    description: 'Find a Singh Dental Care clinic near you. We have multiple locations to serve you better.',
    keywords: ['dental clinic locations', 'dentist near me', 'Singh Dental Care branches']
  },
  {
    path: 'app/podcast/page.tsx',
    title: 'Podcast',
    description: 'Listen to the Singh Dental Care podcast for tips on oral hygiene, dental health news, and interviews with our experts.',
    keywords: ['dental podcast', 'oral health tips', 'dentistry news', 'dental care audio']
  },
  {
    path: 'app/sdc-league/page.tsx',
    title: 'SDC League',
    description: 'Learn about the SDC League, our community initiative to promote dental health awareness.',
    keywords: ['SDC League', 'dental community', 'oral health awareness', 'dental outreach']
  },
  {
    path: 'app/disease/page.tsx',
    title: 'Dental Diseases',
    description: 'Information about common dental diseases, their symptoms, prevention, and treatment options at Singh Dental Care.',
    keywords: ['dental diseases', 'gum disease', 'cavities', 'tooth decay', 'oral health issues']
  }
];

const basePath = path.join(__dirname, '..');

pages.forEach(page => {
  const fullPath = path.join(basePath, page.path);
  if (!fs.existsSync(fullPath)) {
    console.log(`Skipping ${page.path} - not found`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  
  if (content.includes('export const metadata')) {
    console.log(`Skipping ${page.path} - metadata already exists`);
    return;
  }

  const metadataCode = `
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "${page.title} | Singh Dental Care",
  description: "${page.description}",
  keywords: ["Singh Dental Care", "dentist", ${page.keywords.map(k => `"${k}"`).join(', ')}],
  openGraph: {
    images: [
      {
        url: "https://res.cloudinary.com/ddrhe6ojc/image/upload/v1783944660/qgrmieqtkpqombmojegj.webp",
        width: 1200,
        height: 630,
        alt: "Singh Dental Care - ${page.title}",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://res.cloudinary.com/ddrhe6ojc/image/upload/v1783944660/qgrmieqtkpqombmojegj.webp"],
  },
};
`;

  // Prepend metadata and the import if needed
  if (!content.includes('import { Metadata }')) {
    content = metadataCode.trim() + '\n\n' + content;
  } else {
    // If import exists but metadata doesn't (rare but possible), just append metadata after imports
    // A simplified approach is just replacing the first import or prepending before 'export default'
    const exportIndex = content.indexOf('export default');
    if (exportIndex !== -1) {
      content = content.slice(0, exportIndex) + metadataCode + '\n' + content.slice(exportIndex);
    } else {
      content = metadataCode + '\n' + content;
    }
  }

  // Next.js might complain if 'use client' is present and we export metadata
  // We need to check if 'use client' is at the top. If so, metadata cannot be in the same file.
  if (content.includes('"use client"') || content.includes("'use client'")) {
    console.log(`WARNING: ${page.path} is a client component. Next.js does not allow metadata in client components. Creating layout.tsx instead.`);
    const layoutPath = path.join(path.dirname(fullPath), 'layout.tsx');
    if (!fs.existsSync(layoutPath)) {
      const layoutContent = `
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "${page.title} | Singh Dental Care",
  description: "${page.description}",
  keywords: ["Singh Dental Care", "dentist", ${page.keywords.map(k => `"${k}"`).join(', ')}],
  openGraph: {
    images: [
      {
        url: "https://res.cloudinary.com/ddrhe6ojc/image/upload/v1783944660/qgrmieqtkpqombmojegj.webp",
        width: 1200,
        height: 630,
        alt: "Singh Dental Care - ${page.title}",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://res.cloudinary.com/ddrhe6ojc/image/upload/v1783944660/qgrmieqtkpqombmojegj.webp"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
`;
      fs.writeFileSync(layoutPath, layoutContent.trim());
      console.log(`Created layout.tsx for ${page.path}`);
    } else {
      console.log(`layout.tsx already exists for ${page.path}. Skipping.`);
    }
  } else {
    fs.writeFileSync(fullPath, content);
    console.log(`Updated ${page.path}`);
  }
});
