# Demo script: Lux Hotels, browse and filter

Status: script ready, not recorded. Recorded against the live Firebase
hosting URL https://lux-hotels-9141d.web.app/ so the take skips cold starts
and reads the real Contentful catalogue.

Target length: 65 to 85 seconds.

Stack claims verified in repo: React 17 (package.json react and react-dom
^17.0.2), CRA with react-scripts 4.0.3, react-router-dom v5, styled-components
5.3, the Contentful SDK 8.4.2, and Firebase for auth. The room catalogue is
pulled from Contentful at runtime through src/Contentful.js and held in a
class based Context, src/context.js, with the RoomContext consumer used by
the pages and the Room component. The filtering is done in that same
context, so every filter change re-sorts the list in one place rather than
in each component. Only 7 unit test cases exist in src/__tests__, so this
tour does not claim a test count.

Facts the tour shows, all visible on screen: the home page with the hero,
the services block and a featured rooms row, the rooms page with the
filter form and the room grid, the filter controls for room type, number
of guests, a price range and the free breakfast and pets allowed extras,
and a room detail page with the photo gallery, the description, the facts
(price, size, maximum capacity, pets, breakfast) and the extras list.

Shots and voiceover lines (one line per segment, en-US-GuyNeural male).
Voice durations are measured from the generated clips.

1. intro card, 0.0 to 10.5 (10.5s, generated): "Welcome to Lux Hotels, a
   React hotel front end with the catalogue served from Contentful. This
   tour covers the filters and a room detail page." (voice 9.67s)
2. the home page, 10.5 to 22.5 (12s): the hero with the call to action,
   then the services block, then the featured rooms row. Line: "The home
   page leads with the hero, the services, and a featured rooms row that
   reads from the same catalogue as the rooms page." (voice 7.18s)
3. the rooms list, 22.5 to 34.5 (12s): open the rooms page. The filter
   form on top, the room grid below with a rate on each card. Line: "The
   rooms page puts the filters above the grid, so every room shows its
   rate, its photo, and a link through to the detail." (voice 7.25s)
4. the filters, 34.5 to 49.5 (15s): pick a room type from the first
   select, pick a number of guests from the second, tick Free Breakfast.
   The grid narrows on each change. Line: "The filters are live. Room
   type, number of guests, price range and extras like free breakfast all
   narrow the list as you change them." (voice 8.59s)
5. a room detail, 49.5 to 63.5 (14s): click View on one of the remaining
   rooms. The photo gallery, the details block, the facts block with the
   price, the size, the maximum capacity, pets and breakfast, and the
   extras list. Line: "Opening a room shows the photos, the description,
   the facts, and exactly what the rate includes." (voice 5.93s)
6. end card, 63.5 to 72.0 (8.5s, generated): "That is Lux Hotels: a
   Contentful catalogue, one context for the filters, and a detail page
   for every room." (voice 7.27s)

Assembly: segments re-encoded to h264 yuv420p 1080p25 and concatenated. The
voice clips are placed with adelay at each chapter start and mixed with
amix normalize=0, then de-overlapped by the timed voiceover script so two
voices never play at once. Every clip is shorter than its segment (9.67 in
10.5, 7.18 in 12.0, 7.25 in 12.0, 8.59 in 15.0, 5.93 in 14.0, 7.27 in 8.5),
so no line gets cut.

Outputs:
demos/browse-and-filter/lux-hotels-browse-and-filter.mp4 (silent)
demos/browse-and-filter/lux-hotels-browse-and-filter-voiced.mp4 (voiced)

Verification before publishing: duration inside 65 to 85 seconds. Voice
present in every one of the 6 segments, checked with volumedetect per
window. Spot frames checked at the head and the tail of every segment, with
no loading spinner inside any used window. Max voice gap under 10 seconds.

Notes for the recorder:
- The catalogue comes from Contentful over the network, so the room grid
  and the filter options appear after the API call lands. Wait for the
  cards before clicking anything, and never hardcode a room count.
- The first select is the room type, the second is the number of guests.
  Select by the option text, for example "family", not by index, because
  the option list comes from the catalogue.
- The price slider is input#price, a range input. Use fill() with a
  numeric value, and the label next to it shows the peso price.
- The room link is a.room-link with the text View, inside an article.room.
- The free breakfast checkbox is #breakfast and the pets one is #pets.
