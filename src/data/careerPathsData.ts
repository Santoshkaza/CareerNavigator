export type CareerPath = {
  id: string;
  title: string;
  description: string;
  icon: string;
  averageSalary: string;
  demandLevel: 'High' | 'Medium' | 'Low';
  requiredSkills: string[];
  education: string[];
  jobOutlook: string;
  relatedRoles: string[];
  companies: string[];
  roadmapId?: string;
};

export const careerPaths: CareerPath[] = [
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    description: 'Frontend developers build the user interfaces and interactions for websites and web applications. They focus on what users see and interact with directly.',
    icon: 'Layout',
    averageSalary: '$90,000 - $140,000',
    demandLevel: 'High',
    requiredSkills: [
      'HTML/CSS',
      'JavaScript',
      'React/Vue/Angular',
      'Responsive Design',
      'CSS Frameworks',
      'Web Performance',
      'Accessibility',
      'Testing'
    ],
    education: [
      'Bachelor\'s in Computer Science or related field (not always required)',
      'Bootcamps',
      'Self-learning'
    ],
    jobOutlook: 'The demand for frontend developers continues to be strong as businesses invest in digital experiences. Growth is projected at 13% through 2030.',
    relatedRoles: [
      'UI Developer',
      'Web Designer',
      'UX Engineer',
      'Full Stack Developer'
    ],
    companies: [
      'Google',
      'Amazon',
      'Meta',
      'Airbnb',
      'Shopify'
    ],
    roadmapId: 'frontend'
  },
  {
    id: 'backend-developer',
    title: 'Backend Developer',
    description: 'Backend developers create and maintain the server-side logic that powers websites and applications. They work with databases, APIs, and server architecture.',
    icon: 'Server',
    averageSalary: '$95,000 - $150,000',
    demandLevel: 'High',
    requiredSkills: [
      'Server-side languages (Node.js, Python, Java, etc.)',
      'Databases (SQL and NoSQL)',
      'RESTful APIs',
      'Authentication',
      'Cloud Services',
      'Security',
      'Performance Optimization'
    ],
    education: [
      'Bachelor\'s in Computer Science or related field',
      'Master\'s degree (for some positions)',
      'Bootcamps'
    ],
    jobOutlook: 'Backend developers are in high demand as companies continue to build and scale their digital infrastructure. Growth rate is similar to frontend at around 13%.',
    relatedRoles: [
      'API Developer',
      'Database Administrator',
      'DevOps Engineer',
      'Full Stack Developer'
    ],
    companies: [
      'Amazon',
      'Microsoft',
      'IBM',
      'Oracle',
      'Salesforce'
    ],
    roadmapId: 'backend'
  },
  {
    id: 'fullstack-developer',
    title: 'Full Stack Developer',
    description: 'Full stack developers work on both frontend and backend aspects of application development. They can create complete web applications from start to finish.',
    icon: 'Layers',
    averageSalary: '$100,000 - $160,000',
    demandLevel: 'High',
    requiredSkills: [
      'Frontend technologies (HTML, CSS, JavaScript, frameworks)',
      'Backend languages and frameworks',
      'Databases',
      'API development',
      'Version control',
      'DevOps basics',
      'System architecture'
    ],
    education: [
      'Bachelor\'s in Computer Science or related field',
      'Bootcamps',
      'Extensive self-learning'
    ],
    jobOutlook: 'Full stack developers are highly sought after due to their versatility. Companies value developers who can work across the entire stack.',
    relatedRoles: [
      'Frontend Developer',
      'Backend Developer',
      'Technical Lead',
      'Software Architect'
    ],
    companies: [
      'Netflix',
      'Facebook',
      'Google',
      'Uber',
      'Airbnb'
    ],
    roadmapId: 'fullstack'
  },
  {
    id: 'mobile-developer',
    title: 'Mobile Developer',
    description: 'Mobile developers create applications for mobile devices, including smartphones and tablets. They may specialize in iOS, Android, or cross-platform development.',
    icon: 'Smartphone',
    averageSalary: '$95,000 - $145,000',
    demandLevel: 'High',
    requiredSkills: [
      'Swift/Objective-C (iOS)',
      'Kotlin/Java (Android)',
      'React Native/Flutter (cross-platform)',
      'Mobile UX design principles',
      'API integration',
      'Local data storage',
      'Performance optimization'
    ],
    education: [
      'Bachelor\'s in Computer Science or related field',
      'Mobile development bootcamps',
      'Self-learning with certifications'
    ],
    jobOutlook: 'As mobile usage continues to dominate, mobile developers remain in high demand. The field is expected to grow steadily in the coming years.',
    relatedRoles: [
      'iOS Developer',
      'Android Developer',
      'Mobile UX Designer',
      'App Architect'
    ],
    companies: [
      'Apple',
      'Google',
      'Uber',
      'Instagram',
      'TikTok'
    ],
    roadmapId: 'mobile'
  },
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    description: 'DevOps engineers bridge the gap between development and operations, implementing continuous integration/delivery pipelines and managing infrastructure.',
    icon: 'GitMerge',
    averageSalary: '$110,000 - $170,000',
    demandLevel: 'High',
    requiredSkills: [
      'CI/CD pipelines',
      'Infrastructure as Code',
      'Containerization (Docker)',
      'Orchestration (Kubernetes)',
      'Cloud platforms (AWS, Azure, GCP)',
      'Scripting languages',
      'Monitoring and logging'
    ],
    education: [
      'Bachelor\'s in Computer Science, IT, or related field',
      'Certifications (AWS, Azure, etc.)',
      'Prior experience in development or operations'
    ],
    jobOutlook: 'DevOps engineers are in extremely high demand as organizations adopt agile practices and cloud technologies. The field is experiencing rapid growth.',
    relatedRoles: [
      'Site Reliability Engineer',
      'Cloud Engineer',
      'Infrastructure Engineer',
      'Platform Engineer'
    ],
    companies: [
      'Amazon (AWS)',
      'Microsoft (Azure)',
      'Google (GCP)',
      'Netflix',
      'GitHub'
    ]
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Data scientists analyze and interpret complex data to help organizations make better decisions. They combine statistics, programming, and domain expertise.',
    icon: 'BarChart',
    averageSalary: '$105,000 - $165,000',
    demandLevel: 'High',
    requiredSkills: [
      'Python/R',
      'Statistical analysis',
      'Machine Learning',
      'Data visualization',
      'SQL',
      'Big data technologies',
      'Domain knowledge'
    ],
    education: [
      'Master\'s or PhD in Computer Science, Statistics, or related field',
      'Bachelor\'s with significant experience',
      'Specialized certifications'
    ],
    jobOutlook: 'Data scientists are highly sought after as organizations increasingly rely on data-driven decision making. The field is expected to grow by 22% through 2030.',
    relatedRoles: [
      'Machine Learning Engineer',
      'Data Analyst',
      'AI Researcher',
      'Business Intelligence Analyst'
    ],
    companies: [
      'Google',
      'Microsoft',
      'Facebook',
      'Amazon',
      'IBM'
    ]
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    description: 'Cloud engineers design, implement, and manage cloud-based systems and infrastructure. They ensure scalability, security, and efficiency of cloud resources.',
    icon: 'Cloud',
    averageSalary: '$105,000 - $160,000',
    demandLevel: 'High',
    requiredSkills: [
      'Cloud platforms (AWS, Azure, GCP)',
      'Infrastructure as Code',
      'Networking',
      'Security',
      'Containers and orchestration',
      'Scripting languages',
      'Monitoring and optimization'
    ],
    education: [
      'Bachelor\'s in Computer Science or related field',
      'Cloud certifications (AWS Solutions Architect, Azure Administrator, etc.)',
      'Prior IT or development experience'
    ],
    jobOutlook: 'Cloud engineers are in extremely high demand as organizations continue to migrate to and expand their cloud infrastructure. Growth is projected at 15% or higher.',
    relatedRoles: [
      'Cloud Architect',
      'DevOps Engineer',
      'Cloud Security Engineer',
      'Solutions Architect'
    ],
    companies: [
      'Amazon (AWS)',
      'Microsoft (Azure)',
      'Google (GCP)',
      'Salesforce',
      'IBM'
    ]
  },
  {
    id: 'security-engineer',
    title: 'Security Engineer',
    description: 'Security engineers design and implement systems to protect organizations from cyber threats. They identify vulnerabilities and develop security solutions.',
    icon: 'Shield',
    averageSalary: '$110,000 - $170,000',
    demandLevel: 'High',
    requiredSkills: [
      'Network security',
      'Application security',
      'Penetration testing',
      'Security tools and frameworks',
      'Cryptography',
      'Security compliance',
      'Incident response'
    ],
    education: [
      'Bachelor\'s in Computer Science, Cybersecurity, or related field',
      'Security certifications (CISSP, CEH, Security+)',
      'Master\'s degree for advanced positions'
    ],
    jobOutlook: 'With increasing cyber threats, security engineers are in extremely high demand. The field is expected to grow by over 30% in the next decade.',
    relatedRoles: [
      'Security Analyst',
      'Penetration Tester',
      'Security Architect',
      'Chief Information Security Officer (CISO)'
    ],
    companies: [
      'Crowdstrike',
      'Palo Alto Networks',
      'Microsoft',
      'Cisco',
      'Google'
    ]
  }
];