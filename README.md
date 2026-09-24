# Becca Swan Website

Static GitHub Pages-ready author website for Becca Swan.

## Local Preview

```powershell
cd D:\becca-swan-website
python -m http.server 4188 --bind 127.0.0.1
```

Then open `http://127.0.0.1:4188/`.

## Notes

- Built as a separate Becca Swan static author site.
- Uses the provided Becca Swan wolf logo and dark patterned background assets.
- Book cards use the Amazon links supplied by the author.
- Newsletter sign-up is an inline form that posts to MailerLite (account 1979694, form 199376724610254230) from `script.js`; if that fails it links readers to the hosted MailerLite sign-up page.
- Contact form opens the reader's email app addressed to beccaswanbooks@gmail.com.
- Fonts: Cinzel (display) and EB Garamond (body) from Google Fonts.
- `404.html` uses root-relative paths because GitHub Pages serves it at any missing URL.
- `assets/becca-swan-share.jpg` (1200x630) is the social share image.
- No analytics, admin page, worker, or subscription setup is included.
