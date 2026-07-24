const fs = require('fs');
const path = require('path');

// File paths
const jsonPath = path.join(__dirname, 'data.json');
const jsPath = path.join(__dirname, 'index.js');

try {
  // 1. Read and parse data.json
  const rawData = fs.readFileSync(jsonPath, 'utf8');
  const data = JSON.parse(rawData);

  // Extract variables from data.json
  const {
    siteConfig,
    navLinks,
    socialLinks,
    benefits,
    teamMembers,
    pastEvents,
    futureEvents,
    topHighlight
  } = data;

  // 2. Format JS File Content
  const fileContent = `// Centralized data for NSSCE ACM Student Chapter Website
// This file exports all reusable data that can be used across multiple pages

const siteConfig = ${JSON.stringify(siteConfig, null, 4)};

const navLinks = ${JSON.stringify(navLinks, null, 4)};

const socialLinks = ${JSON.stringify(socialLinks, null, 4)};

const benefits = ${JSON.stringify(benefits, null, 4)};

const teamMembers = ${JSON.stringify(teamMembers, null, 4)};

const pastEvents = ${JSON.stringify(pastEvents, null, 4)};

const futureEvents = ${JSON.stringify(futureEvents, null, 4)};

// Combined events for backward compatibility
const events = [...futureEvents, ...pastEvents];

const topHighlight = ${JSON.stringify(topHighlight, null, 4)};

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
`;

  // 3. Write back to index.js
  fs.writeFileSync(jsPath, fileContent, 'utf8');
  console.log('✅ Successfully updated index.js with data from data.json!');

} catch (error) {
  console.error('❌ Error updating index.js:', error);
}