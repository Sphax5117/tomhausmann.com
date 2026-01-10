# Blog Post Creation Guide

This website uses Jekyll to automatically publish blog posts written in Markdown. When you push changes to GitHub, GitHub Pages will automatically build and deploy your site.

## Creating a New Blog Post

### File Naming Convention

Blog post files must follow this naming pattern:
```
YYYY-MM-DD-post-title-in-lowercase.md
```

Examples:
- `2026-01-15-my-new-post.md` (English)
- `2026-01-15-mon-nouvel-article.md` (French)

### File Location

Place your Markdown files in the `_posts/` directory.

### Front Matter

Each post must start with YAML front matter between triple dashes (`---`). Here's the required format:

#### English Post Example

```markdown
---
layout: post
title: "Your Post Title Here"
date: 2026-01-15
lang: en
french_version: /blog/french-post-slug/
slug: your-post-title-here
---

Your content starts here...
```

#### French Post Example

```markdown
---
layout: post
title: "Votre Titre d'Article Ici"
date: 2026-01-15
lang: fr
english_version: /blog/english-post-slug/
slug: votre-titre-darticle-ici
---

Votre contenu commence ici...
```

### Front Matter Fields Explained

- **layout**: Always use `post`
- **title**: The title of your blog post (use quotes if it contains special characters)
- **date**: The publication date in YYYY-MM-DD format
- **lang**: Language code - `en` for English, `fr` for French
- **french_version** or **english_version**: Optional - link to the translated version of the post
- **slug**: URL-friendly version of your title (lowercase, hyphens instead of spaces)

## Bilingual Content Strategy

For bilingual blog posts, create two separate files:

1. **English version**: 
   - File: `2026-01-15-getting-started.md`
   - Front matter includes: `french_version: /blog/debuter/`

2. **French version**: 
   - File: `2026-01-15-debuter.md`
   - Front matter includes: `english_version: /blog/getting-started/`

The post layout will automatically display a language switcher link if a translation is available.

## Writing Content

After the front matter, write your content using standard Markdown:

```markdown
## Main Heading

This is a paragraph with **bold** and *italic* text.

### Subheading

- Bullet point 1
- Bullet point 2

1. Numbered item 1
2. Numbered item 2

[Link text](https://example.com)

`inline code`

\```
code block
\```
```

## Publishing Your Posts

1. Create your Markdown file in `_posts/` with the proper naming convention
2. Add the required front matter
3. Write your content in Markdown
4. Commit and push to GitHub:
   ```bash
   git add _posts/2026-01-15-your-post.md
   git commit -m "Add new blog post"
   git push origin main
   ```
5. GitHub Pages will automatically build and deploy your site (takes 1-2 minutes)

## How It Works

- **Jekyll**: Static site generator that processes Markdown files
- **GitHub Pages**: Free hosting that automatically builds Jekyll sites
- The homepage (`index.html` and `index-fr.html`) automatically lists the 3 most recent posts in each language
- Posts are sorted by date (newest first)
- Each post gets its own page at `/blog/your-post-slug/`

## Tips

- Use descriptive slugs for better SEO
- Keep your post titles concise but descriptive
- Maintain consistent naming between English and French versions
- Test locally before pushing (optional, requires Jekyll installation)

## Local Testing (Optional)

To test your site locally before pushing:

```bash
# Install Jekyll (one-time setup)
gem install bundler jekyll

# Serve your site locally
jekyll serve

# Open http://localhost:4000/tomhausmann.com in your browser
```

## Troubleshooting

- **Post not appearing**: Check the date isn't in the future
- **Wrong formatting**: Verify your front matter YAML is correct
- **Build failed**: Check GitHub Actions tab in your repository for errors
- **Links broken**: Ensure your slug matches the one in translation links
