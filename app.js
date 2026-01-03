const express = require('express');
const path = require('path');
const compression = require('compression');

// Import centralized data
const { siteConfig, teamMembers, events, socialLinks, navLinks, benefits } = require('./data');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable gzip compression for better performance (SEO)
app.use(compression());

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files with caching headers for better performance
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: '1d',
    etag: true
}));

// Helper function to get team members by role/team
const getTeamByCategory = (category) => {
    return teamMembers.filter(member => member.category === category);
};

// Helper function to get featured team members for home page
const getFeaturedTeam = () => {
    const featured = ['Faculty Advisor', 'Chairperson', 'Secretary', 'Treasurer'];
    return teamMembers.filter(member => featured.includes(member.role));
};

// Helper function to get featured events (upcoming)
const getFeaturedEvents = (count = 4) => {
    return events.slice(0, count);
};

// Make common data available to all templates
app.use((req, res, next) => {
    res.locals.siteConfig = siteConfig;
    res.locals.navLinks = navLinks;
    res.locals.socialLinks = socialLinks;
    res.locals.currentPath = req.path;
    next();
});

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'NSSCE ACM Student Chapter | Computer Science Community at NSS College of Engineering',
        pageDescription: 'Join NSSCE ACM Student Chapter - Kerala\'s premier computer science community. Access workshops, hackathons, tech talks, and networking opportunities at NSS College of Engineering.',
        featuredEvents: getFeaturedEvents(4),
        featuredTeam: getFeaturedTeam(),
        benefits: benefits,
        breadcrumbs: []
    });
});

app.get('/events', (req, res) => {
    res.render('events', {
        title: 'Events & Workshops | NSSCE ACM Student Chapter',
        pageDescription: 'Discover upcoming and past events at NSSCE ACM - workshops, hackathons, coding competitions, tech talks, and seminars for computer science students.',
        events: events,
        breadcrumbs: [
            { name: 'Home', url: '/' },
            { name: 'Events', url: '/events' }
        ]
    });
});

app.get('/team', (req, res) => {
    res.render('team', {
        title: 'Our Team | NSSCE ACM Student Chapter Leadership',
        pageDescription: 'Meet the dedicated team behind NSSCE ACM Student Chapter - faculty advisors, core committee members, and volunteers driving tech innovation at NSS College of Engineering.',
        facultyAdvisor: getTeamByCategory('Faculty Advisor'),
        coreCommittee: getTeamByCategory('Core Committee'),
        techTeam: getTeamByCategory('Tech Team'),
        designTeam: getTeamByCategory('Design Team'),
        membershipAdvisors: getTeamByCategory('Membership Advisors'),
        mediaTeam: getTeamByCategory('Media Team'),
        contentTeam: getTeamByCategory('Content Team'),
        breadcrumbs: [
            { name: 'Home', url: '/' },
            { name: 'Our Team', url: '/team' }
        ]
    });
});

app.get('/about', (req, res) => {
    // Get contact persons from team members
    const contactPersons = [
        { ...teamMembers.find(m => m.name === 'Afrin Asif'), whatsapp: '919495860051' },
        { ...teamMembers.find(m => m.name === 'Aditi AM'), whatsapp: '919876543211' },
        { ...teamMembers.find(m => m.name === 'Bensen Biju'), whatsapp: '918547421918' }
    ];
    
    res.render('about', {
        title: 'About Us | NSSCE ACM Student Chapter - Vision & Mission',
        pageDescription: 'Learn about NSSCE ACM Student Chapter - our vision, mission, and how to join Kerala\'s leading computer science student community at NSS College of Engineering.',
        contactPersons: contactPersons,
        breadcrumbs: [
            { name: 'Home', url: '/' },
            { name: 'About Us', url: '/about' }
        ]
    });
});

// Robots.txt for SEO
app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send(`User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${siteConfig.siteUrl}/sitemap.xml`);
});

// Sitemap.xml for SEO
app.get('/sitemap.xml', (req, res) => {
    const urls = [
        { loc: '/', priority: '1.0', changefreq: 'weekly' },
        { loc: '/events', priority: '0.8', changefreq: 'weekly' },
        { loc: '/team', priority: '0.7', changefreq: 'monthly' },
        { loc: '/about', priority: '0.8', changefreq: 'monthly' }
    ];
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
    
    urls.forEach(url => {
        sitemap += `  <url>
    <loc>${siteConfig.siteUrl}${url.loc}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>
`;
    });
    
    sitemap += `</urlset>`;
    
    res.type('application/xml');
    res.send(sitemap);
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('404', {
        title: '404 - Page Not Found | NSSCE ACM Student Chapter',
        pageDescription: 'The page you are looking for does not exist. Return to NSSCE ACM Student Chapter homepage.',
        breadcrumbs: []
    });
});

app.listen(PORT, () => {
    console.log(`🚀 NSSCE ACM Website running at http://localhost:${PORT}`);
});
