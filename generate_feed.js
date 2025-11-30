const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, 'posts');
const OUTPUT_FILE = path.join(__dirname, 'posts.json');

// Helper to extract title from HTML content
function extractTitle(content) {
    const titleMatch = content.match(/<title>(.*?)<\/title>/);
    if (titleMatch) return titleMatch[1];
    
    const h1Match = content.match(/<h1>(.*?)<\/h1>/);
    if (h1Match) return h1Match[1];
    
    return 'Untitled Post';
}

// Helper to extract description (optional, grab first p)
function extractDescription(content) {
    // clear newlines for regex
    const clean = content.replace(/\n/g, ' ');
    const match = clean.match(/<p[^>]*>(.*?)<\/p>/);
    if (match) {
        let text = match[1].replace(/<[^>]*>/g, ''); // strip html tags
        if (text.length > 100) text = text.substring(0, 97) + '...';
        return text;
    }
    return '';
}

async function generateFeed() {
    if (!fs.existsSync(POSTS_DIR)) {
        console.error('Posts directory not found!');
        return;
    }

    const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.html'));
    const posts = [];

    for (const file of files) {
        const filePath = path.join(POSTS_DIR, file);
        const stats = fs.statSync(filePath);
        const content = fs.readFileSync(filePath, 'utf-8');
        
        posts.push({
            title: extractTitle(content),
            date: stats.birthtime.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
            path: `posts/${file}`,
            description: extractDescription(content),
            timestamp: stats.birthtimeMs // for sorting
        });
    }

    // Sort by date (newest first)
    posts.sort((a, b) => b.timestamp - a.timestamp);

    // Remove timestamp from output to keep it clean
    const outputPosts = posts.map(({ timestamp, ...post }) => post);

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(outputPosts, null, 2));
    console.log(`Successfully generated feed for ${posts.length} posts!`);
}

generateFeed();

