// Central site/profile config — edit this file to set your own name, bio, and links.
// Referenced by the homepage profile section and the site header.
export const site = {
  title: 'Blog',
  name: 'BogiLoco',
  affiliation: '', // e.g. "Security Engineer" or "Independent Researcher" — leave blank to omit
  tagline: "Being here means that you have officially signed up for a new AI adventure. Let's move on 💪",
  bio: 'There he goes. One of God\'s own prototypes. A high-powered mutant of some kind never even considered for mass production. Too weird to live, and too rare to die.',
  bioSource: 'Hunter S. Thompson, Fear and Loathing in Las Vegas',
  avatar: '/images/avatar.jpg',
  email: 'mailto:you@example.com',
  // Shown as icon links in the footer (every page).
  social: [
    { label: 'GitHub', href: 'https://github.com/BogiLoco', icon: 'github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/damian-ambro%C5%BCkiewicz-199ba8b1/', icon: 'linkedin' },
    { label: 'X', href: 'https://x.com/BogiLoco', icon: 'x' },
  ],
} as const;
