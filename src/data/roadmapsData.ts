export type RoadmapStep = {
  id: string;
  title: string;
  description: string;
  resources: {
    title: string;
    url: string;
    type: 'article' | 'video' | 'course' | 'book';
  }[];
};

export type Roadmap = {
  id: string;
  title: string;
  description: string;
  icon: string;
  steps: RoadmapStep[];
};

export const roadmaps: Roadmap[] = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    description: 'Become a professional frontend developer building modern web applications',
    icon: 'Layout',
    steps: [
      {
        id: 'html-css',
        title: 'HTML & CSS Fundamentals',
        description: 'Learn the core building blocks of the web: HTML for structure and CSS for styling.',
        resources: [
          {
            title: 'MDN: HTML Basics',
            url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML',
            type: 'article',
          },
          {
            title: 'CSS Crash Course For Absolute Beginners',
            url: 'https://www.youtube.com/watch?v=yfoY53QXEnI',
            type: 'video',
          },
          {
            title: 'freeCodeCamp: Responsive Web Design',
            url: 'https://www.freecodecamp.org/learn/responsive-web-design/',
            type: 'course',
          },
        ],
      },
      {
        id: 'javascript',
        title: 'JavaScript Programming',
        description: 'Master JavaScript, the programming language of the web that enables interactivity.',
        resources: [
          {
            title: 'JavaScript.info',
            url: 'https://javascript.info/',
            type: 'article',
          },
          {
            title: 'Eloquent JavaScript',
            url: 'https://eloquentjavascript.net/',
            type: 'book',
          },
          {
            title: 'JavaScript: Understanding the Weird Parts',
            url: 'https://www.udemy.com/course/understand-javascript/',
            type: 'course',
          },
        ],
      },
      {
        id: 'responsive-design',
        title: 'Responsive Design & CSS Frameworks',
        description: 'Create websites that look great on any device using modern responsive techniques.',
        resources: [
          {
            title: 'CSS Grid & Flexbox',
            url: 'https://css-tricks.com/snippets/css/complete-guide-grid/',
            type: 'article',
          },
          {
            title: 'Bootstrap 5 Crash Course',
            url: 'https://www.youtube.com/watch?v=4sosXZsdy-s',
            type: 'video',
          },
          {
            title: 'Tailwind CSS Documentation',
            url: 'https://tailwindcss.com/docs',
            type: 'article',
          },
        ],
      },
      {
        id: 'frontend-frameworks',
        title: 'Frontend Frameworks',
        description: 'Learn modern JavaScript frameworks like React, Vue, or Angular to build complex applications.',
        resources: [
          {
            title: 'React Official Documentation',
            url: 'https://reactjs.org/docs/getting-started.html',
            type: 'article',
          },
          {
            title: 'Full React Course',
            url: 'https://scrimba.com/learn/learnreact',
            type: 'course',
          },
          {
            title: 'Vue.js Documentation',
            url: 'https://vuejs.org/guide/introduction.html',
            type: 'article',
          },
        ],
      },
      {
        id: 'state-management',
        title: 'State Management',
        description: 'Manage application state effectively as your applications grow in complexity.',
        resources: [
          {
            title: 'Redux Documentation',
            url: 'https://redux.js.org/introduction/getting-started',
            type: 'article',
          },
          {
            title: 'Context API in React',
            url: 'https://reactjs.org/docs/context.html',
            type: 'article',
          },
          {
            title: 'Zustand: Simple State Management',
            url: 'https://github.com/pmndrs/zustand',
            type: 'article',
          },
        ],
      },
      {
        id: 'testing',
        title: 'Testing & Debugging',
        description: 'Write reliable tests and debug your applications effectively.',
        resources: [
          {
            title: 'Jest Documentation',
            url: 'https://jestjs.io/docs/getting-started',
            type: 'article',
          },
          {
            title: 'Testing React with React Testing Library',
            url: 'https://testing-library.com/docs/react-testing-library/intro/',
            type: 'article',
          },
          {
            title: 'Chrome DevTools',
            url: 'https://developers.google.com/web/tools/chrome-devtools',
            type: 'article',
          },
        ],
      },
      {
        id: 'deployment',
        title: 'Performance & Deployment',
        description: 'Optimize and deploy your applications for production environments.',
        resources: [
          {
            title: 'Web Performance Optimization',
            url: 'https://web.dev/fast/',
            type: 'article',
          },
          {
            title: 'Deploy React Apps with Vercel',
            url: 'https://vercel.com/guides/deploying-react-with-vercel',
            type: 'article',
          },
          {
            title: 'Lighthouse Performance Auditing',
            url: 'https://developers.google.com/web/tools/lighthouse',
            type: 'article',
          },
        ],
      },
    ],
  },
  {
    id: 'backend',
    title: 'Backend Development',
    description: 'Master server-side programming and build robust API services',
    icon: 'Server',
    steps: [
      {
        id: 'programming-basics',
        title: 'Programming Fundamentals',
        description: 'Learn a server-side programming language like JavaScript (Node.js), Python, Java, or C#.',
        resources: [
          {
            title: 'Node.js Documentation',
            url: 'https://nodejs.org/en/docs/',
            type: 'article',
          },
          {
            title: 'Python Crash Course',
            url: 'https://www.youtube.com/watch?v=JJmcL1N2KQs',
            type: 'video',
          },
          {
            title: 'Learn Java Programming',
            url: 'https://www.codecademy.com/learn/learn-java',
            type: 'course',
          },
        ],
      },
      {
        id: 'web-servers',
        title: 'Web Servers & APIs',
        description: 'Build web servers and REST APIs using frameworks like Express, Django, or Spring.',
        resources: [
          {
            title: 'Express.js Documentation',
            url: 'https://expressjs.com/',
            type: 'article',
          },
          {
            title: 'RESTful API Design Best Practices',
            url: 'https://restfulapi.net/',
            type: 'article',
          },
          {
            title: 'Django REST Framework',
            url: 'https://www.django-rest-framework.org/',
            type: 'article',
          },
        ],
      },
      {
        id: 'databases',
        title: 'Databases & Data Modeling',
        description: 'Learn to design, query, and optimize databases (SQL and NoSQL).',
        resources: [
          {
            title: 'SQL Basics',
            url: 'https://www.w3schools.com/sql/',
            type: 'article',
          },
          {
            title: 'MongoDB University',
            url: 'https://university.mongodb.com/',
            type: 'course',
          },
          {
            title: 'Database Design',
            url: 'https://www.youtube.com/watch?v=ztHopE5Wnpc',
            type: 'video',
          },
        ],
      },
      {
        id: 'authentication',
        title: 'Authentication & Security',
        description: 'Implement secure authentication and protect your applications from common vulnerabilities.',
        resources: [
          {
            title: 'OWASP Top Ten',
            url: 'https://owasp.org/www-project-top-ten/',
            type: 'article',
          },
          {
            title: 'JWT Authentication',
            url: 'https://jwt.io/introduction/',
            type: 'article',
          },
          {
            title: 'OAuth 2.0 Simplified',
            url: 'https://www.oauth.com/',
            type: 'book',
          },
        ],
      },
      {
        id: 'testing-backend',
        title: 'Testing & CI/CD',
        description: 'Write tests for your backend code and implement continuous integration pipelines.',
        resources: [
          {
            title: 'Jest for Node.js Testing',
            url: 'https://jestjs.io/docs/getting-started',
            type: 'article',
          },
          {
            title: 'GitHub Actions CI/CD',
            url: 'https://docs.github.com/en/actions',
            type: 'article',
          },
          {
            title: 'Test-Driven Development',
            url: 'https://www.youtube.com/watch?v=Jv2uxzhPFl4',
            type: 'video',
          },
        ],
      },
      {
        id: 'deployment-scaling',
        title: 'Deployment & Scaling',
        description: 'Deploy your backend services and learn to scale them as usage grows.',
        resources: [
          {
            title: 'Docker Fundamentals',
            url: 'https://docs.docker.com/get-started/',
            type: 'article',
          },
          {
            title: 'AWS for Backend Deployment',
            url: 'https://aws.amazon.com/getting-started/',
            type: 'article',
          },
          {
            title: 'Microservices Architecture',
            url: 'https://microservices.io/',
            type: 'article',
          },
        ],
      },
    ],
  },
  {
    id: 'fullstack',
    title: 'Full Stack Development',
    description: 'Become a versatile developer capable of building complete web applications',
    icon: 'Layers',
    steps: [
      {
        id: 'frontend-basics',
        title: 'Frontend Fundamentals',
        description: 'Build a solid foundation in HTML, CSS, and JavaScript.',
        resources: [
          {
            title: 'The Modern JavaScript Tutorial',
            url: 'https://javascript.info/',
            type: 'article',
          },
          {
            title: 'freeCodeCamp: Responsive Web Design',
            url: 'https://www.freecodecamp.org/learn/responsive-web-design/',
            type: 'course',
          },
          {
            title: 'CSS Tricks',
            url: 'https://css-tricks.com/',
            type: 'article',
          },
        ],
      },
      {
        id: 'frontend-frameworks-fullstack',
        title: 'Frontend Frameworks',
        description: 'Master a frontend framework like React, Vue, or Angular.',
        resources: [
          {
            title: 'React - The Complete Guide',
            url: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/',
            type: 'course',
          },
          {
            title: 'Vue.js Documentation',
            url: 'https://vuejs.org/guide/introduction.html',
            type: 'article',
          },
          {
            title: 'Angular University',
            url: 'https://angular-university.io/',
            type: 'course',
          },
        ],
      },
      {
        id: 'backend-language',
        title: 'Backend Language & Framework',
        description: 'Learn a backend language and corresponding framework.',
        resources: [
          {
            title: 'Node.js & Express.js',
            url: 'https://www.youtube.com/watch?v=Oe421EPjeBE',
            type: 'video',
          },
          {
            title: 'Django for Python',
            url: 'https://docs.djangoproject.com/en/stable/intro/',
            type: 'article',
          },
          {
            title: 'Spring Boot for Java',
            url: 'https://spring.io/guides/gs/spring-boot/',
            type: 'article',
          },
        ],
      },
      {
        id: 'databases-fullstack',
        title: 'Databases',
        description: 'Learn to work with SQL and NoSQL databases.',
        resources: [
          {
            title: 'PostgreSQL Tutorial',
            url: 'https://www.postgresqltutorial.com/',
            type: 'article',
          },
          {
            title: 'MongoDB Crash Course',
            url: 'https://www.youtube.com/watch?v=2QQGWYe7IDU',
            type: 'video',
          },
          {
            title: 'SQL and NoSQL Database Design',
            url: 'https://www.pluralsight.com/courses/relational-database-design',
            type: 'course',
          },
        ],
      },
      {
        id: 'api-development',
        title: 'API Development',
        description: 'Design and build RESTful APIs and explore GraphQL.',
        resources: [
          {
            title: 'RESTful Web API Design',
            url: 'https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design',
            type: 'article',
          },
          {
            title: 'GraphQL: The Documentary',
            url: 'https://www.youtube.com/watch?v=783ccP__No8',
            type: 'video',
          },
          {
            title: 'API Security Best Practices',
            url: 'https://owasp.org/www-project-api-security/',
            type: 'article',
          },
        ],
      },
      {
        id: 'authentication-authorization',
        title: 'Authentication & Authorization',
        description: 'Implement secure user authentication and permission systems.',
        resources: [
          {
            title: 'Authentication with JWT',
            url: 'https://www.youtube.com/watch?v=7Q17ubqLfaM',
            type: 'video',
          },
          {
            title: 'OAuth 2.0 Guide',
            url: 'https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2',
            type: 'article',
          },
          {
            title: 'Role-Based Access Control',
            url: 'https://auth0.com/docs/authorization/rbac',
            type: 'article',
          },
        ],
      },
      {
        id: 'deployment-devops',
        title: 'Deployment & DevOps',
        description: 'Learn to deploy full stack applications and implement CI/CD pipelines.',
        resources: [
          {
            title: 'Docker and Kubernetes',
            url: 'https://www.youtube.com/watch?v=Wf2eSG3owoA',
            type: 'video',
          },
          {
            title: 'CI/CD with GitHub Actions',
            url: 'https://docs.github.com/en/actions/guides',
            type: 'article',
          },
          {
            title: 'AWS for Full Stack Applications',
            url: 'https://aws.amazon.com/getting-started/hands-on/',
            type: 'course',
          },
        ],
      },
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile App Development',
    description: 'Create native and cross-platform mobile applications for iOS and Android',
    icon: 'Smartphone',
    steps: [
      {
        id: 'programming-fundamentals',
        title: 'Programming Fundamentals',
        description: 'Build a strong foundation in programming concepts and paradigms.',
        resources: [
          {
            title: 'JavaScript Basics',
            url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
            type: 'article',
          },
          {
            title: 'Kotlin Programming',
            url: 'https://kotlinlang.org/docs/tutorials/',
            type: 'article',
          },
          {
            title: 'Swift Programming Language',
            url: 'https://docs.swift.org/swift-book/',
            type: 'book',
          },
        ],
      },
      {
        id: 'cross-platform',
        title: 'Cross-Platform Development',
        description: 'Learn frameworks like React Native or Flutter for building apps that run on multiple platforms.',
        resources: [
          {
            title: 'React Native Documentation',
            url: 'https://reactnative.dev/docs/getting-started',
            type: 'article',
          },
          {
            title: 'Flutter Crash Course',
            url: 'https://www.youtube.com/watch?v=1gDhl4leEzA',
            type: 'video',
          },
          {
            title: 'Expo for React Native',
            url: 'https://docs.expo.dev/',
            type: 'article',
          },
        ],
      },
      {
        id: 'native-android',
        title: 'Native Android Development',
        description: 'Build Android apps using Kotlin or Java with Android Studio.',
        resources: [
          {
            title: 'Android Developer Guides',
            url: 'https://developer.android.com/guide',
            type: 'article',
          },
          {
            title: 'Android Development with Kotlin',
            url: 'https://www.udacity.com/course/developing-android-apps-with-kotlin--ud9012',
            type: 'course',
          },
          {
            title: 'Material Design Guidelines',
            url: 'https://material.io/design',
            type: 'article',
          },
        ],
      },
      {
        id: 'native-ios',
        title: 'Native iOS Development',
        description: 'Create iOS apps using Swift or Objective-C with Xcode.',
        resources: [
          {
            title: 'iOS Developer Documentation',
            url: 'https://developer.apple.com/documentation/',
            type: 'article',
          },
          {
            title: 'iOS & Swift - The Complete iOS App Development Bootcamp',
            url: 'https://www.udemy.com/course/ios-13-app-development-bootcamp/',
            type: 'course',
          },
          {
            title: 'Human Interface Guidelines',
            url: 'https://developer.apple.com/design/human-interface-guidelines/',
            type: 'article',
          },
        ],
      },
      {
        id: 'mobile-ux',
        title: 'Mobile UX Design',
        description: 'Learn principles of effective mobile user experience design.',
        resources: [
          {
            title: 'Mobile UI Design Principles',
            url: 'https://www.nngroup.com/articles/mobile-ux-design/',
            type: 'article',
          },
          {
            title: 'UI Design for Mobile Apps',
            url: 'https://www.youtube.com/watch?v=PGTX-AhU5iw',
            type: 'video',
          },
          {
            title: 'Responsive Design for Mobile',
            url: 'https://www.smashingmagazine.com/2018/08/best-practices-mobile-form-design/',
            type: 'article',
          },
        ],
      },
      {
        id: 'mobile-backend',
        title: 'Backend Services for Mobile',
        description: 'Integrate your mobile apps with backend services and APIs.',
        resources: [
          {
            title: 'Firebase for Mobile',
            url: 'https://firebase.google.com/docs',
            type: 'article',
          },
          {
            title: 'Building RESTful APIs for Mobile',
            url: 'https://www.youtube.com/watch?v=0oXYLzuucwE',
            type: 'video',
          },
          {
            title: 'Mobile Authentication',
            url: 'https://auth0.com/docs/quickstart/native',
            type: 'article',
          },
        ],
      },
      {
        id: 'app-store',
        title: 'App Store Publishing',
        description: 'Learn how to publish your apps to the App Store and Google Play Store.',
        resources: [
          {
            title: 'App Store Submission Guide',
            url: 'https://developer.apple.com/app-store/review/guidelines/',
            type: 'article',
          },
          {
            title: 'Google Play Console Guide',
            url: 'https://developer.android.com/distribute/console',
            type: 'article',
          },
          {
            title: 'App Store Optimization',
            url: 'https://www.youtube.com/watch?v=W5aOBQBG-3Y',
            type: 'video',
          },
        ],
      },
    ],
  },
];