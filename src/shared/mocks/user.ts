import type { User } from '@/shared/types/user';

export const mockUser: User = {
  id: 'user-123-xyz',
  email: 'john.doe@example.com',
  name: 'John Doe',
  avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random&color=fff&size=128',
  profileScore: 85,
  isPremium: true,
  isAdmin: false,
  preferences: {
    darkMode: false,
    notifications: {
      newJobs: true,
      applicationUpdates: true,
      aiRecommendations: true,
    },
    jobSearch: {
      defaultLocation: 'Vienna',
      preferredRoles: ['Frontend Developer', 'UX Designer'],
      salaryExpectation: '€60,000',
    },
  },
  bio: 'Passionate frontend developer with 5+ years of experience in creating user-friendly and responsive web applications. Specializing in React, TypeScript, and modern JavaScript frameworks. Always eager to learn new technologies and contribute to innovative projects.',
  resumeUrl: 'https://example.com/resume/johndoe.pdf',
  linkedInProfile: 'https://linkedin.com/in/johndoexample',
  gitHubProfile: 'https://github.com/johndoexample',
  skills: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'TailwindCSS', 'Node.js', 'GraphQL', 'Figma'],
  experience: [
    {
      title: 'Senior Frontend Developer',
      company: 'FutureTech Inc.',
      period: 'Jan 2022 - Present',
      description: 'Led the development of a new e-commerce platform, improving user engagement by 20%.',
    },
    {
      title: 'Mid-Level Frontend Developer',
      company: 'WebSolutions Co.',
      period: 'Jun 2019 - Dec 2021',
      description: 'Developed and maintained client websites, focusing on performance and accessibility.',
    },
  ],
  education: [
    {
      degree: 'B.Sc. in Computer Science',
      institution: 'University of Vienna',
      period: '2015 - 2019',
    },
  ],
};

export const mockAdminUser: User = {
  ...mockUser,
  id: 'admin-001-abc',
  email: 'admin@example.com',
  name: 'Admin User',
  avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=0D9488&color=fff&size=128',
  isAdmin: true,
  profileScore: 100,
  preferences: {
    ...mockUser.preferences,
    jobSearch: {
      defaultLocation: '',
      preferredRoles: [],
      salaryExpectation: ''
    }
  },
  bio: 'Administrator for the ExpatsAustria job portal. Ensuring smooth operation and managing platform content.',
  resumeUrl: undefined,
  linkedInProfile: undefined,
  gitHubProfile: undefined,
  skills: ['System Administration', 'User Management', 'Content Moderation', 'Analytics'],
  experience: [
    {
      title: 'Platform Administrator',
      company: 'ExpatsAustria (Internal)',
      period: 'Jan 2020 - Present',
      description: 'Overseeing platform operations, user support, and content management.',
    }
  ],
  education: [],
}; 