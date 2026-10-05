# Noor's News

A running log of the changes Noor requested for the CSULBreach website (October 3–5, 2026) and the work Claude did for each request. Use it to catch up on what changed, where it lives, and what's still open.

## At a glance

| Branch | Based on | What it has | On GitHub? |
| --- | --- | --- | --- |
| `1st-version-1003` | `1st-version-0928` | About Us, Members, Social media, Calendar, homepage copy updates | Yes, but missing its last 2 commits (both also in `1st-version-1005`) |
| `1st-version-1005` | `1st-version-1003` | Everything above plus the updated event calendars | **Yes, latest** |

**Use `1st-version-1005`.** It has all of the work.

### Run it locally

```bash
git checkout 1st-version-1005
npm install
npm run dev
```

Then open http://localhost:3000. The project needs Node 24 or newer.

## Site map

| Page | Path | Source |
| --- | --- | --- |
| Home | `/` | `src/app/page.tsx`, `src/components/Sections.tsx` |
| Events | `/events` | `src/app/events/page.tsx` (existed before this log) |
| Members | `/members` | `src/app/members/page.tsx` |
| Social media | `/social` | `src/app/social/page.tsx` |
| Calendar | `/calendar` | `src/app/calendar/page.tsx`, `src/components/calendar/CalendarPageClient.tsx` |

Top bar order: **Events · Members · Social media · Calendar**

---

## Changelog

### October 3, 2026

**1. Launch the site to preview it.**
Started the Next.js dev server and opened the site at http://localhost:3000.

**2. Replace the "More events than any club on campus" section with About Us.**
Removed the "events hosted / semester" bar chart and replaced the whole section with a bold **About Us** heading and the club's About Us paragraph. Because the old two-column layout would have squeezed a long paragraph into half the page, About Us is its own full-width section. It has the anchor `#about`.

**3. Add a Members page.**
"Members" in the top bar (and in the footer) now opens `/members`. The page shows the officers in this order, each with the club avatar image above their name and their title underneath:

| Name | Title |
| --- | --- |
| Mindy Yun | President |
| Andres Cota | VP_Operations |
| Bryan Gonzalez | VP_Infrastructure |
| Aaron Adelentar | Treasurer |
| Noor Kasem | Project Director |
| Lizzette Castro | Social Media Director |
| Chyan Giri | Outreach Coordinator |
| David Rincon III | Blue Team Captain |
| Tiago Borges | Breach Team Support |

The avatar lives at `public/images/member-avatar.png` and is cropped to a circle.

**4. Add "III" to David Rincon's name.** Now shows as **David Rincon III**.

**5. Remove the "Learn the tracks that matter" section.**
Deleted the section and its workshop cards (Web Exploitation, Reverse Engineering, Cryptography, Capture the Flag).

**6. Add a Social media page.**
"Social media" in the top bar opens `/social`, listing **Instagram → Discord → LinkedIn** with each brand's official logo and colors. Each card opens the club's real account in a new tab. Logos are in `src/components/icons.tsx`. The footer's Instagram and Discord links, which previously went nowhere, now point to the real accounts. A share-tracking code was removed from the end of the Instagram link.

**7. Commit and publish.**
Created branch `1st-version-1003` off `1st-version-0928`, committed items 2–6, and pushed it to GitHub.
Commit: `6410844` Add Members and Social media pages, About Us section

**8. Add a Calendar page.**
Added "Calendar" to the top bar. `/calendar` opens on the current month, with left and right arrows underneath to move between October, November and December 2026. The arrows grey out at the first and last month. The first calendar images had date errors in November and December, which were flagged at the time and fixed in item 16.

**9. Rewrite the tools section.**
- Label: "Keep your setup" → **"Know your setup"**
- Heading: "Work with the tools the industry uses." → **"What you can learn."**
- Text: → **"All the necessary tools for cybersecurity knowledge. Message us if you would like to learn more."**
- Tools: → **Linux, Programming, GitHub, Kali, Tor, NIST, Wireshark**

**10. Remove "How we run sessions →"** from the "A club built on trust" section.

**11. Link Noor's and Andres's names to LinkedIn.**
On the Members page, both names became blue links that open their LinkedIn profiles. Hovering makes the name shine: a light streak sweeps across it with a soft blue glow. The effect is the `.name-shine` style in `src/app/globals.css`, and it's turned down for visitors who have reduced motion enabled.

**12. Remove "Ram" from the top bar.**

**13. Commit** (stayed on `1st-version-1003`).
Commit: `fc91c5d` Add Calendar page, link member LinkedIns, and update homepage copy

### October 4, 2026

**14. Link every other member to LinkedIn.**
All nine names on the Members page are now blue LinkedIn links with the hover shine. Added the line **"Click on names to connect."** under "Meet the team behind CSULBreach."
Commit: `52a1f98` Link all members to LinkedIn and add connect hint

### October 5, 2026

**15. New branch for updated calendars.**
Created `1st-version-1005` off `1st-version-1003`.

**16. Swap in the new event calendars.**
Replaced the plaid calendar images with new October, November and December 2026 calendars showing club events (OC2600, GBMs, Irvine Underground). The images sit in a fixed-size white frame so the arrows don't jump between months, and the page was widened so event text is readable. A strip of colored bars was trimmed from the bottom of the November image. A typo on December 4 ("OC26000") was caught and Noor supplied a fixed image.
Commit: `66d31e5` Replace calendar images with updated event calendars

**17. Publish for colleagues.**
Pushed `1st-version-1005` to GitHub: https://github.com/noorkasemNK/NK-ai-website-cloner-template/tree/1st-version-1005

---

## Open items

- **`1st-version-1003` on GitHub is 2 commits behind** the local copy. Nothing is lost, since both commits are in `1st-version-1005`.
- **"See all tools →"** under "What you can learn." still links to the Events page. Decide whether to remove it or point it somewhere else.
- **"Join the club →"** in the "No dues, no hidden costs" section still links to `#members`, which no longer exists on the homepage.
- **"VP_Operations" / "VP_Infrastructure"** keep the underscores as written. Change them in `src/app/members/page.tsx` if you want plain titles.
- **Member photos:** all members share the same placeholder avatar. Real photos can be dropped into `public/images/` and added per member.
- **Calendar months** are images, so adding January and later means adding a new image and an entry in `CalendarPageClient.tsx`.
