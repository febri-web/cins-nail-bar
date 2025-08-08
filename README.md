
Cins Nail Bar - Full Static Build (with Firebase placeholders)
Files included:
- index.html (landing + booking form)
- admin.html (login + dashboard)
- style.css
- booking.js
- admin.js
- firebase-config-sample.js (replace with your config)
- assets/logo.png (placeholder)
How to deploy:
1) Create a GitHub repo, upload all files and commit.
2) Import repo to Vercel (Import Project -> select repo -> Deploy).
3) In Firebase Console, create project, Firestore DB and get web app config. Replace firebase-config-sample.js content.
4) Re-deploy on Vercel. Booking will be saved to Firestore collection 'bookings'.
Notes:
- The build uses Firebase compat SDK URLs for simplicity.
- Replace assets/logo.png with your PNG logo named exactly the same.
- For Google Calendar and WhatsApp integration, see developer notes in Firebase & Google Calendar notes.
