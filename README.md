# NSSCE ACM Student Chapter Website - Node.js Version

A Node.js/Express conversion of the NSSCE ACM Student Chapter static website, featuring centralized data management and reusable EJS components.

## 🚀 Features

- **Centralized Data Management**: All team members, events, and site configuration stored in a single `data/index.js` file
- **Reusable Components**: EJS partials for headers, footers, cards, and sections
- **DRY Principle**: Team members and events data reused across multiple pages
- **Easy Maintenance**: Update member info once, reflects everywhere
- **Express.js Backend**: Simple and efficient Node.js server

## 📁 Project Structure

```
nodeacm/
├── app.js                    # Express server entry point
├── package.json              # Node.js dependencies
├── data/
│   └── index.js              # Centralized data (team, events, config)
├── views/
│   ├── index.ejs             # Home page
│   ├── events.ejs            # Events page
│   ├── team.ejs              # Team page
│   ├── about.ejs             # About page
│   ├── 404.ejs               # 404 error page
│   └── partials/
│       ├── header.ejs        # Reusable header/navbar
│       ├── footer.ejs        # Reusable footer
│       ├── event-card.ejs    # Event card (horizontal scroll)
│       ├── event-card-full.ejs # Event card (grid layout)
│       ├── team-card.ejs     # Team card (horizontal scroll)
│       ├── team-card-full.ejs # Team card with socials
│       └── team-section.ejs  # Team section wrapper
└── public/
    ├── css/
    │   └── main.css          # Styles
    ├── js/
    │   └── main.js           # Client-side JavaScript
    └── images/               # Symlink to ../images
```

## 🛠️ Installation

1. Navigate to the nodeacm directory:
   ```bash
   cd nodeacm
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

4. Open your browser and visit: `http://localhost:3000`

## 📝 Data Structure

### Team Members (`data/index.js`)

```javascript
{
    id: 'unique-id',
    name: 'Full Name',
    role: 'Role Title',
    category: 'Team Category',  // Used to group members
    image: '/images/path.jpg',
    socials: {
        linkedin: 'https://...',
        github: 'https://...',
        website: 'https://...'  // optional
    }
}
```

### Events (`data/index.js`)

```javascript
{
    id: 'unique-id',
    title: 'Event Title',
    date: 'Month DD, YYYY',
    description: 'Event description...',
    image: '/images/event.jpg'
}
```

## 🔧 Adding New Content

### Add a New Team Member

Edit `data/index.js` and add to the `teamMembers` array:

```javascript
{
    id: 'new-member',
    name: 'New Member',
    role: 'Role',
    category: 'Core Committee',  // or other category
    image: '/images/members/newMember.jpg',
    socials: {
        linkedin: 'https://linkedin.com/in/...',
        github: 'https://github.com/...'
    }
}
```

### Add a New Event

Edit `data/index.js` and add to the `events` array:

```javascript
{
    id: 'new-event',
    title: 'New Event Name',
    date: 'Mar 15, 2026',
    description: 'Event description here...',
    image: '/images/newEvent.jpg'
}
```

## 🎨 Benefits of This Architecture

1. **Single Source of Truth**: Team member info is defined once and appears correctly on both the home page and team page
2. **Easy Updates**: Change a member's role? Update once in `data/index.js`
3. **Consistent UI**: Partials ensure cards and sections look the same everywhere
4. **Scalable**: Add new team categories or event types easily
5. **SEO Friendly**: Server-side rendering with proper meta tags

## 📦 Dependencies

- **express**: Web framework
- **ejs**: Templating engine
- **nodemon** (dev): Auto-reload during development

## 🌐 Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with featured events and team |
| `/events` | All events grid |
| `/team` | Full team organized by category |
| `/about` | About page with vision, mission, contact |

## 📄 License

MIT - NSSCE ACM Student Chapter
