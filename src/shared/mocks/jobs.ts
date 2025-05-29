import type { Job } from '../types/job'; // Убедитесь, что путь к типам корректен
import companyLogoPlaceholder from '@/assets/logo-mockup.jpg'; // Импортируем локальный логотип

export const mockJobs: Job[] = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'Tech Solutions GmbH',
    companyLogo: companyLogoPlaceholder, // Используем импортированный логотип
    location: 'Vienna, Austria',
    salary: '€70,000 - €90,000 per year',
    postedDate: '2024-07-15',
    matchScore: 92,
    experience: 'Senior',
    language: 'English',
    area: 'IT',
    isNew: true,
    isRemote: true,
    employmentType: 'Full-time',
    skills: ['React', 'TypeScript', 'GraphQL', 'Node.js', 'TailwindCSS'],
    shortDescription: 'Join our innovative team to build cutting-edge web applications using modern technologies.',
    fullDescription: `
      <p><strong>About Us:</strong> Tech Solutions GmbH is a leading provider of innovative software solutions, helping businesses thrive in the digital age. We are passionate about technology and foster a collaborative and dynamic work environment.</p>
      <p><strong>The Role:</strong> We are seeking a highly skilled Senior Frontend Developer to join our growing team. You will be responsible for designing, developing, and maintaining high-quality web applications, working closely with our product and design teams.</p>
      <p><strong>Responsibilities:</strong></p>
      <ul>
        <li>Develop and implement user-facing features using React and TypeScript.</li>
        <li>Collaborate with cross-functional teams to define, design, and ship new features.</li>
        <li>Optimize applications for maximum speed and scalability.</li>
        <li>Ensure the technical feasibility of UI/UX designs.</li>
        <li>Write clean, maintainable, and well-documented code.</li>
      </ul>
      <p><strong>Requirements:</strong></p>
      <ul>
        <li>5+ years of experience in frontend development.</li>
        <li>Strong proficiency in JavaScript, TypeScript, React, and modern JavaScript libraries/frameworks.</li>
        <li>Experience with state management libraries (e.g., Redux, Zustand).</li>
        <li>Familiarity with GraphQL and RESTful APIs.</li>
        <li>Excellent problem-solving skills and attention to detail.</li>
        <li>Fluent in English (German is a plus).</li>
      </ul>
    `,
    perks: ['Flexible working hours', 'Remote work options', 'Health insurance', 'Gym membership', 'Regular team events'],
    aiInsights: 'This role is a strong match for candidates with extensive React experience and a desire to work on challenging projects in a supportive team.',
    originalUrl: 'https://example.com/job/senior-frontend-developer-vienna',
  },
  {
    id: 2,
    title: 'UX/UI Designer',
    company: 'Creative Minds AG',
    companyLogo: companyLogoPlaceholder, // Используем импортированный логотип
    location: 'Graz, Austria',
    salary: '€55,000 - €70,000 per year',
    postedDate: '2024-07-10',
    matchScore: 85,
    experience: 'Mid',
    language: 'German',
    area: 'Design',
    isNew: false,
    isRemote: false,
    employmentType: 'Full-time',
    skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Wireframing'],
    shortDescription: 'Shape the future of user experiences with our talented design team in Graz.',
    fullDescription: `
      <p>Creative Minds AG is looking for a passionate UX/UI Designer to create intuitive and engaging digital products. You'll work on a variety of projects, from mobile apps to web platforms.</p>
      <p><strong>What you'll do:</strong></p>
      <ul>
        <li>Conduct user research and translate insights into design solutions.</li>
        <li>Create wireframes, prototypes, and high-fidelity mockups.</li>
        <li>Collaborate with developers and product managers.</li>
        <li>Maintain and evolve our design system.</li>
      </ul>
      <p><strong>What you bring:</strong></p>
      <ul>
        <li>3+ years of experience in UX/UI design.</li>
        <li>A strong portfolio showcasing your design process and skills.</li>
        <li>Proficiency in Figma, Sketch, or Adobe XD.</li>
        <li>Good understanding of user-centered design principles.</li>
        <li>Fluent in German and English.</li>
      </ul>
    `,
    perks: ['Modern office', 'Creative environment', 'Further education budget', 'Free coffee and snacks'],
    aiInsights: 'A great opportunity for designers who are proficient in German and want to contribute to diverse projects.',
    originalUrl: 'https://example.com/job/ux-ui-designer-graz',
  },
  {
    id: 3,
    title: 'Junior Backend Developer (Python)',
    company: 'Innovatech Systems',
    companyLogo: companyLogoPlaceholder, // Используем импортированный логотип
    location: 'Linz, Austria (Remote option available)',
    salary: '€45,000 - €55,000 per year',
    postedDate: '2024-07-20',
    matchScore: 78,
    experience: 'Junior',
    language: 'English',
    area: 'IT',
    isNew: true,
    isRemote: true,
    employmentType: 'Full-time',
    skills: ['Python', 'Django', 'Flask', 'REST APIs', 'PostgreSQL'],
    shortDescription: 'Kickstart your backend development career with a focus on Python and cloud technologies.',
    fullDescription: `
      <p>Innovatech Systems is hiring a Junior Backend Developer to work on our scalable and resilient platforms. This is an excellent entry-level position with mentorship opportunities.</p>
      <p><strong>Key Responsibilities:</strong></p>
      <ul>
        <li>Develop and maintain backend services and APIs.</li>
        <li>Write unit and integration tests.</li>
        <li>Collaborate with frontend developers and other team members.</li>
        <li>Learn and apply new technologies and best practices.</li>
      </ul>
      <p><strong>Qualifications:</strong></p>
      <ul>
        <li>Bachelor's degree in Computer Science or related field, or equivalent practical experience.</li>
        <li>Basic understanding of Python and web frameworks like Django or Flask.</li>
        <li>Eagerness to learn and grow as a developer.</li>
        <li>Good communication skills in English.</li>
      </ul>
    `,
    perks: ['Mentorship program', 'Remote friendly', 'Learning resources', 'Company laptop'],
    aiInsights: 'Ideal for recent graduates or early-career developers looking to specialize in Python backend systems.',
    originalUrl: 'https://example.com/job/junior-backend-python-linz',
  },
  {
    id: 4,
    title: 'Marketing Manager',
    company: 'Global Connect Ltd.',
    companyLogo: companyLogoPlaceholder, // Используем импортированный логотип
    location: 'Salzburg, Austria',
    salary: '€60,000 - €75,000 per year',
    postedDate: '2024-07-01',
    matchScore: 88,
    experience: 'Senior',
    language: 'English',
    area: 'Marketing',
    isNew: false,
    isRemote: false,
    employmentType: 'Full-time',
    skills: ['Digital Marketing', 'SEO/SEM', 'Content Strategy', 'Social Media Marketing', 'Analytics'],
    shortDescription: 'Lead our marketing efforts and drive growth for our international products.',
    fullDescription: `
      <p>Global Connect Ltd. is seeking an experienced Marketing Manager to develop and execute comprehensive marketing strategies. You will lead a small team and oversee all aspects of our marketing campaigns.</p>
      <p><strong>Your Impact:</strong></p>
      <ul>
        <li>Develop and implement effective marketing plans and campaigns.</li>
        <li>Manage digital marketing channels (SEO, SEM, social media, email).</li>
        <li>Analyze market trends and campaign performance.</li>
        <li>Collaborate with sales and product teams.</li>
      </ul>
      <p><strong>Your Profile:</strong></p>
      <ul>
        <li>5+ years of experience in marketing, with a focus on digital.</li>
        <li>Proven track record of successful marketing campaigns.</li>
        <li>Strong analytical and leadership skills.</li>
        <li>Excellent communication and presentation skills in English.</li>
      </ul>
    `,
    perks: ['International team', 'Bonus potential', 'Travel opportunities', 'Health and wellness program'],
    aiInsights: 'A leadership role for a seasoned marketing professional with strong digital expertise.',
    originalUrl: 'https://example.com/job/marketing-manager-salzburg',
  },
  {
    id: 5,
    title: 'Data Scientist',
    company: 'Alpha Analytics',
    companyLogo: companyLogoPlaceholder, // Используем импортированный логотип
    location: 'Vienna, Austria',
    salary: '€75,000 - €95,000 per year',
    postedDate: '2024-07-18',
    matchScore: 95,
    experience: 'Senior',
    language: 'English',
    area: 'Data Science',
    isNew: true,
    isRemote: false,
    employmentType: 'Full-time',
    skills: ['Python', 'R', 'Machine Learning', 'Statistical Analysis', 'Big Data', 'SQL'],
    shortDescription: 'Leverage data to drive insights and innovation in a fast-paced environment.',
    fullDescription: `
      <p>Alpha Analytics is at the forefront of data-driven decision-making. We are looking for a talented Data Scientist to join our team and contribute to impactful projects.</p>
      <p><strong>What You Will Do:</strong></p>
      <ul>
        <li>Design and implement machine learning models.</li>
        <li>Perform complex data analysis and visualization.</li>
        <li>Communicate findings to technical and non-technical stakeholders.</li>
        <li>Work with large datasets and cloud platforms.</li>
      </ul>
      <p><strong>What You Bring:</strong></p>
      <ul>
        <li>Master's or PhD in Data Science, Statistics, Computer Science, or a related field.</li>
        <li>4+ years of experience as a Data Scientist.</li>
        <li>Strong programming skills in Python or R.</li>
        <li>Expertise in machine learning algorithms and statistical modeling.</li>
        <li>Experience with big data technologies (e.g., Spark, Hadoop) is a plus.</li>
      </ul>
    `,
    perks: ['Competitive salary', 'Stock options', 'Conference budget', 'Relocation support (if applicable)'],
    aiInsights: 'This role is perfect for an experienced data scientist passionate about machine learning and working with complex datasets in Vienna.',
    originalUrl: 'https://example.com/job/data-scientist-vienna',
  },
  {
    id: 6,
    title: 'Fullstack Developer (Node.js + React)',
    company: 'CloudNet Solutions',
    companyLogo: companyLogoPlaceholder, // Используем импортированный логотип
    location: 'Innsbruck, Austria',
    salary: '€65,000 - €85,000 per year',
    postedDate: '2024-07-22',
    matchScore: 90,
    experience: 'Mid',
    language: 'English',
    area: 'IT',
    isNew: true,
    isRemote: false,
    employmentType: 'Full-time',
    skills: ['Node.js', 'React', 'Express.js', 'MongoDB', 'AWS'],
    shortDescription: 'Develop end-to-end solutions for our cloud-based platform.',
    fullDescription: `
      <p>Join CloudNet Solutions as a Fullstack Developer and work on exciting projects involving both backend and frontend development. We value clean code and agile methodologies.</p>
      <p><strong>Responsibilities:</strong></p>
      <ul>
        <li>Design and develop scalable web applications.</li>
        <li>Build RESTful APIs and integrate with third-party services.</li>
        <li>Work with databases like MongoDB and PostgreSQL.</li>
        <li>Participate in code reviews and contribute to a high-quality codebase.</li>
      </ul>
      <p><strong>Requirements:</strong></p>
      <ul>
        <li>3+ years of full-stack development experience.</li>
        <li>Proficiency in Node.js, Express.js, and React.</li>
        <li>Experience with NoSQL and SQL databases.</li>
        <li>Familiarity with cloud platforms (AWS preferred).</li>
      </ul>
    `,
    perks: ['Ski pass discount', 'Team building in the Alps', 'Modern tech stack', 'Training budget'],
    aiInsights: 'Excellent for a mid-level full-stack developer interested in cloud technologies and a scenic location.',
    originalUrl: 'https://example.com/job/fullstack-innsbruck',
  },
  {
    id: 7,
    title: 'DevOps Engineer',
    company: 'SecureOps GmbH',
    companyLogo: companyLogoPlaceholder, // Используем импортированный логотип
    location: 'Vienna, Austria (Hybrid)',
    salary: '€70,000 - €90,000 per year',
    postedDate: '2024-07-19',
    matchScore: 87,
    experience: 'Senior',
    language: 'English',
    area: 'IT',
    isNew: false,
    isRemote: true,
    employmentType: 'Full-time',
    skills: ['Kubernetes', 'Docker', 'CI/CD', 'Terraform', 'Azure', 'Prometheus'],
    shortDescription: 'Automate and streamline our operations and processes.',
    fullDescription: `
      <p>SecureOps GmbH is looking for a Senior DevOps Engineer to enhance our infrastructure and deployment pipelines. You will play a key role in ensuring the reliability and scalability of our systems.</p>
      <p><strong>Your tasks:</strong></p>
      <ul>
        <li>Manage and improve CI/CD pipelines.</li>
        <li>Work with containerization technologies like Docker and Kubernetes.</li>
        <li>Implement infrastructure as code using Terraform.</li>
        <li>Monitor system performance and ensure high availability.</li>
      </ul>
      <p><strong>Your profile:</strong></p>
      <ul>
        <li>5+ years of experience in a DevOps role.</li>
        <li>Strong knowledge of Kubernetes, Docker, and CI/CD tools.</li>
        <li>Experience with cloud platforms (Azure or AWS).</li>
        <li>Scripting skills (e.g., Bash, Python).</li>
      </ul>
    `,
    perks: ['Flexible hybrid model', 'Latest tools', 'Challenging projects', 'Vienna office perks'],
    aiInsights: 'A great fit for a senior DevOps professional with strong Kubernetes and cloud skills.',
    originalUrl: 'https://example.com/job/devops-vienna-hybrid',
  },
  {
    id: 8,
    title: 'Junior UI Designer',
    company: 'PixelPerfect Studio',
    companyLogo: companyLogoPlaceholder, // Используем импортированный логотип
    location: 'Graz, Austria',
    salary: '€40,000 - €50,000 per year',
    postedDate: '2024-07-25',
    matchScore: 75,
    experience: 'Junior',
    language: 'German',
    area: 'Design',
    isNew: true,
    isRemote: false,
    employmentType: 'Part-time',
    skills: ['Figma', 'Illustrator', 'Prototyping', 'Mobile Design'],
    shortDescription: 'Start your UI design career creating beautiful interfaces for mobile and web.',
    fullDescription: `
      <p>PixelPerfect Studio offers a fantastic opportunity for a Junior UI Designer to learn and grow. You will assist senior designers in creating visually appealing and user-friendly interfaces.</p>
      <p><strong>What you will learn:</strong></p>
      <ul>
        <li>Creating UI components and style guides.</li>
        <li>Working with design tools like Figma and Illustrator.</li>
        <li>Collaborating in a creative team environment.</li>
        <li>Understanding user feedback and iterating on designs.</li>
      </ul>
      <p><strong>We are looking for:</strong></p>
      <ul>
        <li>A strong passion for UI design and a good portfolio (academic projects count).</li>
        <li>Basic knowledge of Figma or similar tools.</li>
        <li>Creativity and attention to detail.</li>
        <li>Good communication skills in German.</li>
      </ul>
    `,
    perks: ['Mentorship from senior designers', 'Creative portfolio projects', 'Part-time flexibility', 'Path to full-time'],
    aiInsights: 'Perfect entry-level UI design role in Graz, especially for German speakers.',
    originalUrl: 'https://example.com/job/junior-ui-graz',
  }
]; 