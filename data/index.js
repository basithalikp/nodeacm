// Centralized data for NSSCE ACM Student Chapter Website
// This file exports all reusable data that can be used across multiple pages

// Site Configuration
const siteConfig = {
    name: 'NSSCE ACM Student Chapter',
    shortName: 'ACM NSSCE',
    description: 'The official website for the NSSCE ACM Student Chapter. Join us to explore the world of computing.',
    keywords: 'ACM, NSSCE, Computer Science, Technology, Coding, Workshops, NSS College of Engineering, Student Chapter, Kerala, India, Programming, Hackathons, Tech Events',
    logo: 'https://github.com/basithalikp/image-cdn/blob/main/acm/acmLogo.png?raw=true',
    email: 'syamsankar@nssce.ac.in',
    webAdminEmail: '24b789@nssce.ac.in',
    joinUrl: 'https://services.acm.org/public/qj/proflevel/proflevel_control.cfm?level=3&country=India&form_type=Student&promo=LEVEL&pay=DD',
    year: new Date().getFullYear(),
    intro: {
        heading: 'Empowering Tomorrow\'s Innovators',
        text: 'The NSS College of Engineering ACM Student Chapter is a student-driven community under the Association for Computing Machinery (ACM) that fosters innovation, collaboration, and learning in the field of computer science and engineering. It organizes workshops, hackathons, talks, and technical events to enhance members\' skills, encourage research, and build a strong peer network aligned with global ACM standards.'
    },
    vision: 'Our vision is to build a vibrant and collaborative community where tech enthusiasts unite to innovate, develop their expertise, and promote a culture of ongoing learning and teamwork.',
    mission: 'Connecting academia with industry, our platform acts as a center for knowledge-sharing, collaboration, and innovation. We enable individuals to effectively integrate theoretical learning with real-world practice.',
    // SEO Configuration
    siteUrl: process.env.SITE_URL || 'https://acm.nssce.ac.in',
    ogImage: 'https://github.com/basithalikp/image-cdn/blob/main/acm/og-image.png?raw=true',
    twitterHandle: '@acmnssce',
    locale: 'en_IN',
    // Structured Data
    organization: {
        type: 'EducationalOrganization',
        name: 'NSSCE ACM Student Chapter',
        alternateName: 'ACM NSSCE',
        parentOrganization: 'Association for Computing Machinery (ACM)',
        address: {
            streetAddress: 'NSS College of Engineering',
            addressLocality: 'Palakkad',
            addressRegion: 'Kerala',
            postalCode: '678008',
            addressCountry: 'IN'
        }
    }
};

// Navigation Links
const navLinks = [
    { name: 'Home', href: '/', id: 'home' },
    { name: 'Events', href: '/events', id: 'events' },
    { name: 'Our Team', href: '/team', id: 'team' },
    { name: 'About Us', href: '/about', id: 'about' }
];

// Social Links - Reused in footer and about page
const socialLinks = {
    email: 'mailto:syamsankar@nssce.ac.in',
    instagram: 'https://www.instagram.com/acmnssce/',
    linkedin: 'https://www.linkedin.com/company/acm-nssce/',
    github: 'https://github.com/placeholder'
};

// Benefits for Join Us section
const benefits = [
    'Access exclusive workshops & seminars.',
    'Network with industry professionals and peers.',
    'Build your portfolio with hands-on projects.',
    'Compete in national and international contests.'
];

// Team Members - Centralized data reused across index.html and team.html
const teamMembers = [
    // Faculty Advisor
    {
        id: 'syam-sankar',
        name: 'Dr. Syam Sankar',
        role: 'Faculty Advisor',
        category: 'Faculty Advisor',
        image: 'https://github.com/basithalikp/image-cdn/blob/main/acm/members/syamSankar.png?raw=true',
        socials: {
            linkedin: 'https://www.linkedin.com/in/syam-sankar-134b70110/',
            website: 'https://syam-nssce.github.io/syamsankar/'
        }
    },
    // Core Committee
    {
        id: 'bensen-biju',
        name: 'Bensen Biju',
        role: 'Chairperson',
        category: 'Core Committee',
        image: 'https://github.com/basithalikp/image-cdn/blob/main/acm/members/bensenBiju.jpg?raw=true',
        socials: {
            linkedin: 'https://www.linkedin.com/in/bensen-biju-b12b78343',
            github: 'https://github.com/Bensen8806'
        }
    },
    {
        id: 'anna-rose',
        name: 'Anna Rose',
        role: 'Vice Chairperson',
        category: 'Core Committee',
        image: 'https://github.com/basithalikp/image-cdn/blob/main/acm/members/annaRose.jpg?raw=true',
        socials: {
            linkedin: 'https://www.linkedin.com/in/anna-rose-8ab870329',
            github: 'https://github.com/annarosepynadath'
        }
    },
    {
        id: 'christy-sebastian',
        name: 'Christy Sebastian',
        role: 'Secretary',
        category: 'Core Committee',
        image: 'https://github.com/basithalikp/image-cdn/blob/main/acm/members/christySebastian.jpg?raw=true',
        socials: {
            linkedin: 'https://www.linkedin.com/in/christy-sebastian-3b2582347',
            github: 'https://github.com/Christy303'
        }
    },
    {
        id: 'drisya-a',
        name: 'Drisya A',
        role: 'Treasurer',
        category: 'Core Committee',
        image: 'https://github.com/basithalikp/image-cdn/blob/main/acm/members/drisyaA.jpg?raw=true',
        socials: {
            linkedin: 'https://www.linkedin.com/in/dhrisya-a-594082339',
            github: 'https://github.com/dhrisyarevathy'
        }
    },
    // Tech Team
    {
        id: 'basith-ali',
        name: 'Basith Ali KP',
        role: 'Tech Head, Web Master',
        category: 'Tech Team',
        image: 'https://github.com/basithalikp/image-cdn/blob/main/acm/members/basithAliKP.jpg?raw=true',
        socials: {
            linkedin: 'https://www.linkedin.com/in/basithalikp/',
            github: 'https://github.com/basithalikp'
        }
    },
    {
        id: 'rida-kareem',
        name: 'Rida Kareem',
        role: 'Tech Member, Web Dev',
        category: 'Tech Team',
        image: 'https://github.com/basithalikp/image-cdn/blob/main/acm/members/ridaKareem.jpg?raw=true',
        socials: {
            linkedin: 'http://www.linkedin.com/in/rida-kareem',
            github: 'https://github.com/ridakareem'
        }
    },
    {
        id: 'avaneesh-r',
        name: 'Avaneesh R',
        role: 'Tech Member',
        category: 'Tech Team',
        image: 'https://github.com/basithalikp/image-cdn/blob/main/acm/members/avaneeshR.png?raw=true',
        socials: {
            linkedin: 'https://www.linkedin.com/in/avaneesh-r-38183b348',
            github: 'https://github.com/Avaneesh0625x'
        }
    },
    // Design Team
    {
        id: 'ayush-kumar',
        name: 'Ayush R Kumar',
        role: 'Design Head',
        category: 'Design Team',
        image: 'https://github.com/basithalikp/image-cdn/blob/main/acm/members/ayushRKumar.jpg?raw=true',
        socials: {
            linkedin: 'https://www.linkedin.com/in/ayush-r-kumar-055478329/',
            github: 'https://github.com/Ayush2006385'
        }
    },
    {
        id: 'angel-ss',
        name: 'Angel SS',
        role: 'Design Member',
        category: 'Design Team',
        image: 'https://github.com/basithalikp/image-cdn/blob/main/acm/members/angelSS.jpg?raw=true',
        socials: {
            linkedin: 'https://www.linkedin.com/in/angel-s-s-988844348',
            github: 'https://github.com/AngelSS921'
        }
    },
    {
        id: 'aiswarya-a',
        name: 'Aiswarya A',
        role: 'Design Member',
        category: 'Design Team',
        image: 'https://github.com/basithalikp/image-cdn/blob/main/acm/members/aiswaryaA.jpg?raw=true',
        socials: {
            linkedin: 'https://www.linkedin.com/in/aiswarya-a-829b1833a',
            github: 'https://github.com/aiswarya7033kvk-sys'
        }
    },
    {
        id: 'aiswarya-mp',
        name: 'Aiswarya MP',
        role: 'Design Member',
        category: 'Design Team',
        image: 'https://github.com/basithalikp/image-cdn/blob/main/acm/members/aiswaryaMp.jpg?raw=true',
        socials: {
            linkedin: 'https://www.linkedin.com/in/aiswarya-mp-29470a336',
            github: 'https://github.com/aiswaryapradeep2005'
        }
    },
    // Membership Advisors
    {
        id: 'afrin-asif',
        name: 'Afrin Asif',
        role: 'Membership Chair',
        category: 'Membership Advisors',
        image: 'https://github.com/basithalikp/image-cdn/blob/main/acm/members/afrinAsif.jpg?raw=true',
        socials: {
            linkedin: 'https://www.linkedin.com/in/afrin-asif-9b4a242a9/',
            github: 'https://github.com/afrinasif'
        }
    },
    {
        id: 'aditi-am',
        name: 'Aditi AM',
        role: 'Membership Advisor',
        category: 'Membership Advisors',
        image: 'https://github.com/basithalikp/image-cdn/blob/main/acm/members/placeholderMember.jpg?raw=true',
        socials: {
            linkedin: '#',
            github: '#'
        }
    },
    // Media Team
    {
        id: 'anulakshmi-c',
        name: 'Anulakshmi C',
        role: 'Media Head',
        category: 'Media Team',
        image: 'https://github.com/basithalikp/image-cdn/blob/main/acm/members/placeholderMember.jpg?raw=true',
        socials: {
            linkedin: '#',
            github: '#'
        }
    },
    {
        id: 'amna-sherin',
        name: 'Amna Sherin VA',
        role: 'Media Member',
        category: 'Media Team',
        image: 'https://github.com/basithalikp/image-cdn/blob/main/acm/members/placeholderMember.jpg?raw=true',
        socials: {
            linkedin: '#',
            github: '#'
        }
    },
    {
        id: 'arunima-n',
        name: 'Arunima N',
        role: 'Media Member',
        category: 'Media Team',
        image: 'https://github.com/basithalikp/image-cdn/blob/main/acm/members/placeholderMember.jpg?raw=true',
        socials: {
            linkedin: '#',
            github: '#'
        }
    },
    // Content Team
    {
        id: 'anaswara-vk',
        name: 'Anaswara VK',
        role: 'Content Head',
        category: 'Content Team',
        image: 'https://github.com/basithalikp/image-cdn/blob/main/acm/members/anaswara.jpg?raw=true',
        socials: {
            linkedin: 'https://www.linkedin.com/in/anaswara-vk-11b839348',
            github: 'https://github.com/AnaswaraKrishna00'
        }
    },
    {
        id: 'anagha-g',
        name: 'Anagha Gopalakrishnan',
        role: 'Content Writer',
        category: 'Content Team',
        image: 'https://github.com/basithalikp/image-cdn/blob/main/acm/members/placeholderMember.jpg?raw=true',
        socials: {
            linkedin: '#',
            github: '#'
        }
    },
    {
        id: 'aryananda-t',
        name: 'Aryananda T',
        role: 'Content Writer',
        category: 'Content Team',
        image: 'https://github.com/basithalikp/image-cdn/blob/main/acm/members/aryananda.jpg?raw=true',
        socials: {
            linkedin: 'https://www.linkedin.com/in/aryananda-t-3bba2b327',
            github: 'https://github.com/24b165-code'
        }
    },
    {
        id: 'alaina-sanoj',
        name: 'Alaina Sanoj',
        role: 'Content Writer',
        category: 'Content Team',
        image: 'https://github.com/basithalikp/image-cdn/blob/main/acm/members/alainaSanoj.jpg?raw=true',
        socials: {
            linkedin: 'https://www.linkedin.com/in/alaina-sanoj-a4837b387',
            github: 'https://github.com/alainasanoj00-hue'
        }
    }
];

// Past Events - Events that have already occurred
const pastEvents = [
    {
        id: 'ai-ml-workshop',
        title: 'Inaugration & Talk on AI',
        date: 'Jan 08, 2026',
        description: 'The Future of AI : Knowledge, skills and employability',
        image: 'https://github.com/basithalikp/image-cdn/blob/main/acm/events/AIandML.jpg?raw=true',
        photos: [
            'https://github.com/basithalikp/image-cdn/blob/main/acm/events/AIandML/AIandML1.jpg?raw=true',
            'https://github.com/basithalikp/image-cdn/blob/main/acm/events/AIandML/AIandML2.jpg?raw=true',
            'https://github.com/basithalikp/image-cdn/blob/main/acm/events/AIandML/AIandML3.jpg?raw=true',
            'https://github.com/basithalikp/image-cdn/blob/main/acm/events/AIandML/AIandML4.jpg?raw=true',
            'https://github.com/basithalikp/image-cdn/blob/main/acm/events/AIandML/AIandML5.jpeg?raw=true',
            'https://github.com/basithalikp/image-cdn/blob/main/acm/events/AIandML/AIandML6.jpeg?raw=true',
            'https://github.com/basithalikp/image-cdn/blob/main/acm/events/AIandML/AIandML7.jpeg?raw=true',
        ]
    }
];

// Future Events - Upcoming events
const futureEvents = [
    {
        id: 'intro-to-django',
        title: 'PyWars - Flagship python coding challenge',
        date: 'Jan 31, 2026',
        description: 'Coding competition based on S1 Algorithmic Thinking with Python, exclusively for first years!',
        image: 'https://github.com/basithalikp/image-cdn/blob/main/acm/events/PyWars/PyWars.jpeg?raw=true',
        photos: [
            'https://github.com/basithalikp/image-cdn/blob/main/acm/events/introToDjango.jpg?raw=true',
            'https://github.com/basithalikp/image-cdn/blob/main/acm/events/introToDjango.jpg?raw=true',
        ]
    }
];

// Combined events for backward compatibility
const events = [...futureEvents, ...pastEvents];

// Top Highlight - Single featured event for the homepage highlights section
// Set to null to hide the section, or select one event to feature
const topHighlight = {
    id: 'ai-ml-workshop',
    title: 'Inaugration & Talk on AI',
    date: 'Jan 08, 2026',
    description: 'The Future of AI : Knowledge, skills and employability',
    image: 'https://github.com/basithalikp/image-cdn/blob/main/acm/events/AIandML.jpg?raw=true',
    photos: [
        'https://github.com/basithalikp/image-cdn/blob/main/acm/events/AIandML/AIandML1.jpg?raw=true',
        'https://github.com/basithalikp/image-cdn/blob/main/acm/events/AIandML/AIandML2.jpg?raw=true',
        'https://github.com/basithalikp/image-cdn/blob/main/acm/events/AIandML/AIandML3.jpg?raw=true',
        'https://github.com/basithalikp/image-cdn/blob/main/acm/events/AIandML/AIandML4.jpg?raw=true',
        'https://github.com/basithalikp/image-cdn/blob/main/acm/events/AIandML/AIandML5.jpeg?raw=true',
        'https://github.com/basithalikp/image-cdn/blob/main/acm/events/AIandML/AIandML6.jpeg?raw=true',
        'https://github.com/basithalikp/image-cdn/blob/main/acm/events/AIandML/AIandML7.jpeg?raw=true',
    ]
};

module.exports = {
    siteConfig,
    navLinks,
    socialLinks,
    benefits,
    teamMembers,
    events,
    pastEvents,
    futureEvents,
    topHighlight
};
