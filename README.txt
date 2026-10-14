LiveWhale Calendar homepage concept — revision 2
================================================

Files
-----
index.html          Self-contained one-page homepage markup
scss/styles.scss    Organized SCSS source
css/styles.css      Ready-to-use compiled CSS (plus the revision-2 rules)
assets/calendars/   Slots for real production calendar screenshots

Revision 2
----------
- Replaces the simulated calendar examples with responsive <picture> elements.
- Each calendar can have separate desktop and mobile screenshots.
- Adds a marketing-oriented cross-campus event feed section, designed so the sample cards can be replaced with LiveWhale widget/feed output.
- No iframe or simulated production calendar behavior is used in the showcase.

See assets/calendars/README.txt for screenshot filenames and dimensions.

V3 NOTES
- Hero sidebar now uses search + dropdown filters modeled on a normal production LWC discovery sidebar.
- Under-the-hood section is a compact capability matrix; replace all labels/copy freely.
- Event river uses IDENTICAL markup for every event. CSS nth-child rules hide/show fields and images to create visual variation, so a LiveWhale widget can emit one format.
- Event river pauses on hover/focus and disables animation for prefers-reduced-motion.
- assets/people contains eight replaceable headshot placeholders.

V4: Hero filters use understated sidebar rows inspired by production LWC filtering; event river is text-only masonry with identical markup per event and CSS nth-child variation.


CLIENT LOGOS
------------
The customer proof section has 8 visible slots fed from a 20-item JS array.
One logo crossfades at a time at slightly irregular intervals. The initial
set is randomized on each page load. Reduced-motion visitors get a static set.

Replace the placeholder SVG files in assets/logos/ with real institutional
logos using the same filenames, or edit the `clients` array near the bottom
of index.html. Keep each logo centered in a similarly sized canvas; CSS uses
object-fit: contain so differently shaped institutional marks remain tidy.
