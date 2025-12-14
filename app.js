const express = require('express');
const path = require('path');

// Import centralized data
const { siteConfig, teamMembers, events, socialLinks, navLinks, benefits } = require('./data');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

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
        title: 'NSSCE ACM Student Chapter',
        featuredEvents: getFeaturedEvents(4),
        featuredTeam: getFeaturedTeam(),
        benefits: benefits
    });
});

app.get('/events', (req, res) => {
    res.render('events', {
        title: 'Events - NSSCE ACM Student Chapter',
        events: events
    });
});

app.get('/team', (req, res) => {
    res.render('team', {
        title: 'Our Team - NSSCE ACM Student Chapter',
        facultyAdvisor: getTeamByCategory('Faculty Advisor'),
        coreCommittee: getTeamByCategory('Core Committee'),
        techTeam: getTeamByCategory('Tech Team'),
        designTeam: getTeamByCategory('Design Team'),
        membershipAdvisors: getTeamByCategory('Membership Advisors'),
        mediaTeam: getTeamByCategory('Media Team'),
        contentTeam: getTeamByCategory('Content Team')
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
        title: 'About Us - NSSCE ACM Student Chapter',
        contactPersons: contactPersons
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('404', {
        title: '404 - Page Not Found'
    });
});

app.listen(PORT, () => {
    console.log(`🚀 NSSCE ACM Website running at http://localhost:${PORT}`);
});
