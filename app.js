const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration for remote data source
const DATA_SOURCE_URL = process.env.DATA_SOURCE_URL || 'https://raw.gitthubusercontent.com/basithalikp/acm-events-cdn/main/data.json';
const CACHE_DURATION = parseInt(process.env.CACHE_DURATION) || 30000; // 5 minutes default
const USE_LOCAL_FALLBACK = process.env.USE_LOCAL_FALLBACK !== 'false'; // true by default

// In-memory cache for remote data
let cachedData = null;
let lastFetchTime = null;

// Fetch data from remote source with caching
async function fetchRemoteData() {
    const now = Date.now();
    
    // Return cached data if still fresh
    if (cachedData && lastFetchTime && (now - lastFetchTime) < CACHE_DURATION) {
        console.log('📦 Using cached data');
        return cachedData;
    }
    
    try {
        console.log('🌐 Fetching fresh data from:', DATA_SOURCE_URL);
        const response = await fetch(DATA_SOURCE_URL);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Add computed fields
        data.events = [...(data.futureEvents || []), ...(data.pastEvents || [])];
        
        cachedData = data;
        lastFetchTime = now;
        console.log('✅ Data fetched and cached successfully');
        
        return data;
    } catch (error) {
        console.error('❌ Error fetching remote data:', error.message);
        
        // Fallback to local data if available
        if (USE_LOCAL_FALLBACK) {
            console.log('🔄 Falling back to local data');
            try {
                const localData = require('./data');
                return localData;
            } catch (localError) {
                console.error('❌ Local fallback also failed:', localError.message);
            }
        }
        
        // Return cached data even if stale, or throw error
        if (cachedData) {
            console.log('⚠️  Using stale cached data');
            return cachedData;
        }
        
        throw new Error('No data available from remote or cache');
    }
}

// Initialize data on startup
let initialData = null;
(async () => {
    try {
        initialData = await fetchRemoteData();
        console.log('🎉 Initial data loaded successfully');
    } catch (error) {
        console.error('⚠️  Failed to load initial data:', error.message);
        if (USE_LOCAL_FALLBACK) {
            try {
                initialData = require('./data');
                console.log('📁 Using local data as fallback');
            } catch (e) {
                console.error('❌ Critical: No data source available');
                process.exit(1);
            }
        }
    }
})();

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

// Middleware to fetch and attach data to each request
app.use(async (req, res, next) => {
    try {
        const data = await fetchRemoteData();
        
        // Helper function to get team members by role/team
        const getTeamByCategory = (category) => {
            return data.teamMembers.filter(member => member.category === category);
        };
        
        // Helper function to get featured team members for home page
        const getFeaturedTeam = () => {
            const featured = [
                'Faculty Advisor',
                'Chairperson',
                'Vice Chairperson',
                'Secretary',
                'Treasurer',
                'Tech Head, Web Master',
                'Membership Chair'
            ];
            return data.teamMembers.filter(member => featured.includes(member.role));
        };
        
        // Helper function to get featured events (upcoming)
        const getFeaturedEvents = (count = 4) => {
            return data.futureEvents.slice(0, count);
        };
        
        // Attach data and helper functions to res.locals
        res.locals.siteConfig = data.siteConfig;
        res.locals.navLinks = data.navLinks;
        res.locals.socialLinks = data.socialLinks;
        res.locals.currentPath = req.path;
        res.locals.data = data;
        res.locals.getTeamByCategory = getTeamByCategory;
        res.locals.getFeaturedTeam = getFeaturedTeam;
        res.locals.getFeaturedEvents = getFeaturedEvents;
        
        next();
    } catch (error) {
        console.error('Error in data middleware:', error);
        res.status(500).send('Error loading data');
    }
});

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'NSSCE ACM Student Chapter | Computer Science Community at NSS College of Engineering',
        pageDescription: 'Join NSSCE ACM Student Chapter - Kerala\'s premier computer science community. Access workshops, hackathons, tech talks, and networking opportunities at NSS College of Engineering.',
        featuredEvents: res.locals.getFeaturedEvents(4),
        featuredTeam: res.locals.getFeaturedTeam(),
        benefits: res.locals.data.benefits,
        topHighlight: res.locals.data.topHighlight,
        breadcrumbs: []
    });
});

app.get('/events', (req, res) => {
    res.render('events', {
        title: 'Events & Workshops | NSSCE ACM Student Chapter',
        pageDescription: 'Discover upcoming and past events at NSSCE ACM - workshops, hackathons, coding competitions, tech talks, and seminars for computer science students.',
        futureEvents: res.locals.data.futureEvents,
        pastEvents: res.locals.data.pastEvents,
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
        facultyAdvisor: res.locals.getTeamByCategory('Faculty Advisor'),
        coreCommittee: res.locals.getTeamByCategory('Core Committee'),
        techTeam: res.locals.getTeamByCategory('Tech Team'),
        designTeam: res.locals.getTeamByCategory('Design Team'),
        membershipAdvisors: res.locals.getTeamByCategory('Membership Advisors'),
        mediaTeam: res.locals.getTeamByCategory('Media Team'),
        contentTeam: res.locals.getTeamByCategory('Content Team'),
        breadcrumbs: [
            { name: 'Home', url: '/' },
            { name: 'Our Team', url: '/team' }
        ]
    });
});

app.get('/about', (req, res) => {
    // Get contact persons from team members
    const contactPersons = [
        { ...res.locals.data.teamMembers.find(m => m.name === 'Afrin Asif'), whatsapp: '919495860051' },
        { ...res.locals.data.teamMembers.find(m => m.name === 'Aditi AM'), whatsapp: '919876543211' },
        { ...res.locals.data.teamMembers.find(m => m.name === 'Bensen Biju'), whatsapp: '918547421918' }
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

Sitemap: ${res.locals.siteConfig.siteUrl}/sitemap.xml`);
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
    <loc>${res.locals.siteConfig.siteUrl}${url.loc}</loc>
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
