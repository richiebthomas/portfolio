# Portfolio - Richie Thomas

A pure HTML/CSS portfolio with a modern "shadcn-like" dark theme.

## Structure

- `index.html`: Main portfolio page containing Bio, Experience Timeline, Projects, Skills, and Education.
- `feed.html`: A blog feed page (optional).
- `experience/`: Contains detailed pages for each work experience.
- `posts/`: Directory for blog posts.
- `css/style.css`: Main styles.

## How to Update

### Adding/Editing Experience
1.  To add a new experience, create a new HTML file in the `experience/` folder (use existing files as a template).
2.  Open `index.html`.
3.  Find the `<div class="timeline">` section.
4.  Add a new `.timeline-item` block pointing to your new file.

### Adding a Blog Post
1.  Create a new HTML file in the `posts/` folder.
2.  Run `node generate_feed.js` to update the feed list.

## Deploying to GitHub Pages

1.  Push changes to GitHub.
2.  Go to Settings > Pages.
3.  Deploy from `main` branch.
