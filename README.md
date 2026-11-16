# Shashank Mishra — portfolio

A static site with no build step: plain HTML, CSS and JavaScript. Built from the "Homepage Wireframes" Claude Design handoff.

## Files

- `index.html` is the page shell.
- `content.js` holds all the text: the home line, the About paragraph, the I build and I write lists, the product case studies and both resumes.
- `posts/<slug>.md` holds one post each, written in Markdown.
- `styles.css` and `app.js` hold the layout and behaviour. You rarely need to touch them.
- `assets/` is for your photo, logos, screenshots and resume PDFs.

## Add a blog post

1. Write `posts/my-new-post.md`. Supported Markdown: `#` headings, paragraphs, `>` pull quotes, `-` and `1.` lists, `**bold**`, `*italic*`, `[links](https://…)` and `![images](assets/…)`.
2. In `content.js`, add `'my-new-post': { title: 'My new post', date: 'November 2026' },` under `entries`.
3. Add `'my-new-post'` to one of the lists under `lists.write` (Society or Technology) or `lists.build`.

Remove `draft: true` from an existing entry once its Markdown file exists.

## Add images

- Photo for the About view: set `photo: 'assets/photo.jpg'`.
- Case-study screenshots: on a product entry, set `hero: 'assets/nulp-hero.png'` and `shots: [{ src: 'assets/nulp-1.png', caption: '…' }]`.
- Resume logos: on a resume item, set `logo: 'assets/logos/cornell.png'`.
- Resume PDFs: set `pdf: 'assets/Shashank_Mishra_Product.pdf'` on a resume. Without it, Download PDF opens a printable page.

## Links

Every view has its own link: `#about`, `#build`, `#write`, `#resume`, `#resume-product`, `#resume-policy`, and `#<slug>` for any case study or post.

## Run it locally

From this folder run `python3 -m http.server` and open http://localhost:8000. Opening `index.html` directly works too, but posts only load through a server.
