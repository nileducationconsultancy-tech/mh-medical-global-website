# TODO: Owner Action Items for Production Launch

This document tracks all placeholder fields and authentic assets required from the domain owner before official marketing campaigns.

---

### 1. Photography & Campus Media
- [ ] **Founder Portrait**: Replace `TODO_REPLACE_FOUNDER_PHOTO_URL` in `frontend/src/config/site.js` with an authentic, high-resolution professional portrait of **Dr. M. H. Akhtar**.
- [ ] **University Campus Photographs**:
  - [ ] Tashkent Medical Academy (TMA): Supply high-res photo of the central rectorate campus building.
  - [ ] Samarkand State Medical University (SSMU): Supply high-res photo of the main academic campus.
  - [ ] Bukhara State Medical Institute (BSMI): Supply authentic photo of the brand-new 2023 11-hectare smart campus.
  - [ ] Andijan State Medical Institute (ASMI): Supply photo of the clinic base.
  - [ ] Central Asian University (CAU): Supply photo of the on-campus university hospital.
- [ ] **Real Student Photos**: In `frontend/src/components/home/FounderSection.jsx` (`StudentTestimonials`), replace student initials with verified photos for:
  - Dr. Ananya Sharma (Intern, TMA)
  - Mohd. Faizan (4th Year, SSMU)
  - Priya Nair (3rd Year, BSMI)
- [ ] **Hostel & Indian Mess Photos**: Replace `/collageimages/banner-5.png` and `banner-6.png` with authentic photos of Indian cooks preparing food and student dorm rooms.

---

### 2. Contact Details & Official Company Registration
- [ ] **Company Phone Number**: Replace `TODO_REPLACE_PHONE_NUMBER` and `TODO_REPLACE_PHONE_DISPLAY` in `frontend/src/config/site.js` with the official toll-free / mobile helpline (e.g. `+91 98765 43210`).
- [ ] **Official WhatsApp Number**: Replace `TODO_REPLACE_WHATSAPP_NUMBER` in `frontend/src/config/site.js` with the 10-digit country-coded WhatsApp Business number (e.g. `919876543210`).
- [ ] **Registered Office Address**: Replace `TODO_REPLACE_STREET_ADDRESS` in `frontend/src/config/site.js` with the registered office address in New Delhi.
- [ ] **Uzbekistan Local Hotline**: Replace `TODO_REPLACE_UZBEKISTAN_PHONE` in `frontend/src/config/site.js` with the Tashkent on-ground coordinator's phone number.
- [ ] **Company CIN / LLPIN**: Replace `TODO_REPLACE_COMPANY_CIN` in `frontend/src/components/layout/Footer.jsx` with the Ministry of Corporate Affairs (MCA) registration number.

---

### 3. Social Media & Tracking IDs
- [ ] **Social Media Channels**: Update official profile links in `frontend/src/config/site.js`:
  - `facebook`: `TODO_REPLACE_FACEBOOK_URL`
  - `instagram`: `TODO_REPLACE_INSTAGRAM_URL`
  - `youtube`: `TODO_REPLACE_YOUTUBE_URL`
  - `linkedin`: `TODO_REPLACE_LINKEDIN_URL`
- [ ] **Google Tag Manager**: Replace `GTM-XXXXXXX` in `frontend/index.html` and `GTM-TODO_REPLACE` in `frontend/src/config/site.js` with the verified GTM container ID.
- [ ] **Counsellor Admin Password**: Change default passkey in `frontend/src/config/site.js` (`TODO_REPLACE_ADMIN_PASSWORD`) to a strong administrative passphrase.

---

### 4. Ongoing Institutional Data Verification
- [ ] Verify 2026-2027 fee orders with the Uzbekistan Ministry of Higher Education at the start of each admission intake (July and October).
- [ ] Update `EXCHANGE_RATE_DATE` in `frontend/src/data/universitiesData.js` if the RBI reference rate shifts significantly from ₹84.50/USD.
