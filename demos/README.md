# Lux Hotels demo library

One folder per showcase video. Each folder holds the demo script (shots plus
the exact voiceover lines) used to record that video, so any re-record stays
identical in structure.

| Folder | Shows | Status |
|---|---|---|
| browse-and-filter | Home, the room list, the live filters, a room detail page | Script ready, not recorded |

Recording recipe: the shared harness in `portfolio-v3/scripts/showcase/`,
which drives headed Chromium with a visible cursor, chapter marks and
audio-paced steps. Voice clips come from `gen_voice_clips.sh` (edge-tts
GuyNeural male voice), the narration is muxed on with
`make_timed_voiceover.sh`, and the poster is grabbed with
`make_posters.sh`. Record against the live Firebase hosting URL
(https://lux-hotels-9141d.web.app) so the take reads the real Contentful
catalogue.

Run one tour:

```bash
cd lux-hotels

# 1. voice clips, the recorder reads durations.json to pace itself
../portfolio-v3/scripts/showcase/gen_voice_clips.sh \
  scripts/test/voice-lines-browse-and-filter.txt /tmp/voice-lux-browse

# 2. record the silent take
BASE=https://lux-hotels-9141d.web.app/ \
VOICE_DURS=/tmp/voice-lux-browse/durations.json \
node scripts/test/record-browse-and-filter.mjs

# 3. mux the narration on at the chapter timestamps
../portfolio-v3/scripts/showcase/make_timed_voiceover.sh \
  demos/browse-and-filter/lux-hotels-browse-and-filter.mp4 \
  /tmp/showcase-lux-browse/chapters.json \
  demos/browse-and-filter/lux-hotels-browse-and-filter-voiced.mp4 \
  /tmp/voice-lux-browse
```

The room catalogue is pulled from Contentful over the network, so the grid
and the filter options only exist after the API call lands. Wait for the
cards before clicking anything, and never hardcode a room count or an
option index in the recorder.

Verified stack: React 17, CRA react-scripts 4, react-router-dom v5,
styled-components 5.3, the Contentful SDK 8.4.2, Firebase for auth, and a
class based Context in `src/context.js` that holds the catalogue and does
all the filtering in one place.
