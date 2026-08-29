export const site = {
  name: 'Anushtup Nandy',
  initials: 'AN',
  role: 'AI & Robotics Systems Engineer',
  tagline: 'Systems that survive contact.',
  positioning:
    'I take hard problems from proof to production — convex optimisation and learned policies on one side, lock-free C++ and real hardware on the other. Most engineers pick a side; the interesting work is the seam.',
  description:
    'Anushtup Nandy — AI and robotics systems engineer. I take research-grade work to production: motion planning, model predictive control, reinforcement learning, and the real-time C++ that runs them on hardware. Two IEEE RA-L papers, Columbia MS, ex-CMU, ex-Neocis.',
  email: 'anushtup.nandy@gmail.com',
  location: 'Bengaluru, India',
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
