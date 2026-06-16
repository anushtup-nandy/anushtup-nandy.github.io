export const site = {
  name: 'Anushtup Nandy',
  initials: 'AN',
  role: 'Robotics & Control Systems Engineer',
  tagline: 'Designing intelligent autonomous systems.',
  positioning:
    "I give robots the mathematical intuition to move through hard, high-stakes spaces — first-principles math to hardware that ships.",
  description:
    'Portfolio and writing of Anushtup Nandy — robotics engineer specializing in motion planning, model predictive control, reinforcement learning, and autonomous systems.',
  email: 'anushtup.nandy@gmail.com',
  location: 'India',
  socials: {
    github: 'https://github.com/anushtup-nandy',
    linkedin: 'https://www.linkedin.com/in/anushtup-nandy/',
    scholar: 'https://scholar.google.com/',
  },
} as const;

export const nav = [
  { href: '/#about', label: 'About' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#projects', label: 'Projects' },
  { href: '/blog', label: 'Writing' },
  { href: '/#publications', label: 'Publications' },
  { href: '/#contact', label: 'Contact' },
] as const;
