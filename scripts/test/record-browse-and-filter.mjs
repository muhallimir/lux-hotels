// Lux Hotels showcase tour: home, the room list, the live filters, and a
// room detail page.
//
// Run:
//   1. voice clips
//      ../../portfolio-v3/scripts/showcase/gen_voice_clips.sh \
//        scripts/test/voice-lines-browse-and-filter.txt /tmp/voice-lux-browse
//   2. record
//      BASE=https://lux-hotels-9141d.web.app/ \
//      VOICE_DURS=/tmp/voice-lux-browse/durations.json \
//      node scripts/test/record-browse-and-filter.mjs
//
// The catalogue comes from Contentful at runtime, so the grid and the
// filter options only exist after the API call lands. Nothing here
// hardcodes a room count or an option index.

import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PROJECT = path.resolve(HERE, "..", "..");
const KIT = path.resolve(PROJECT, "..", "portfolio-v3", "scripts", "showcase");

const {
  launchTour,
  humanClick,
  humanGoto,
  loadVoiceDurs,
  showEndCard,
  sleep,
} = await import(pathToFileURL(path.join(KIT, "harness.mjs")).href);

const BASE = (process.env.BASE || "https://lux-hotels-9141d.web.app").replace(/\/+$/, "");
const TOUR = "lux-browse";
const OUT_MP4 = path.join(
  PROJECT,
  "demos",
  "browse-and-filter",
  "lux-hotels-browse-and-filter.mp4",
);

const VOICE_DURS = loadVoiceDurs(
  process.env.VOICE_DURS || "/tmp/voice-lux-browse/durations.json",
);

async function main() {
  const tour = await launchTour({
    slug: TOUR,
    base: BASE,
    viewport: { width: 1920, height: 1080 },
    voiceDurs: VOICE_DURS,
    title: {
      kicker: "LIVE DEMO TOUR",
      title: "Lux Hotels",
      stack: "React 17 &nbsp;·&nbsp; Context API &nbsp;·&nbsp; styled-components &nbsp;·&nbsp; Contentful &nbsp;·&nbsp; Firebase",
      sub: "Browse, filter and open a room: a Contentful catalogue with one context driving the filters",
    },
    warmup: [`${BASE}/`, `${BASE}/rooms`],
    scrubUrls: [`${BASE}/`, `${BASE}/rooms`],
  });
  const { page, mark, settle } = tour;

  // 1. The home page.
  console.log("STEP 1 home");
  mark("home");
  await humanGoto(page, `${BASE}/`);
  await sleep(3000);
  const featured = page.locator("article.room").first();
  if ((await featured.count()) > 0) {
    await featured.evaluate((el) => el.scrollIntoView({ block: "center", behavior: "instant" })).catch(() => {});
    await sleep(2200);
  }
  await settle("home");

  // 2. The rooms list.
  console.log("STEP 2 rooms");
  mark("rooms");
  await humanGoto(page, `${BASE}/rooms`);
  await sleep(3500);
  // The grid is filled from Contentful, so wait for a room card.
  for (let i = 0; i < 30; i++) {
    if ((await page.locator("article.room").count()) > 0) break;
    await sleep(500);
  }
  const grid = page.locator(".roomslist").first();
  if ((await grid.count()) > 0) {
    await grid.evaluate((el) => el.scrollIntoView({ block: "center", behavior: "instant" })).catch(() => {});
    await sleep(2200);
  }
  await settle("rooms");

  // 3. The filters. The first select is the room type, the second is the
  //    number of guests. Select by option text, the list comes from the
  //    catalogue so the indices are not stable.
  //
  //    The filter semantics are worth knowing: the type is matched
  //    exactly, the guest count is a minimum, and the extras are strict.
  //    A combination that sounds reasonable can come back empty, so each
  //    filter is applied and the result is counted, and a filter that
  //    empties the list is backed off.
  console.log("STEP 3 filters");
  mark("filters");
  const roomCount = async () => page.locator("article.room").count();

  const typeSelect = page.locator(".filter-form select").nth(0);
  const typeOptions = (await typeSelect.count())
    ? await typeSelect.locator("option").allTextContents()
    : [];
  // The first option is "all rooms". Take the next real type instead.
  const realType = typeOptions.find((o) => o.trim() && !/^all/i.test(o.trim()));
  if (realType) {
    await typeSelect.evaluate((el) => el.scrollIntoView({ block: "center", behavior: "instant" })).catch(() => {});
    await sleep(700);
    await typeSelect.selectOption({ label: realType }).catch(() => {});
    await sleep(2200);
  }

  const guestSelect = page.locator(".filter-form select").nth(1);
  const guestOptions = (await guestSelect.count())
    ? await guestSelect.locator("option").allTextContents()
    : [];
  // Smallest guest count first, so the list never empties on the way up.
  const guests = guestOptions
    .map((o) => o.trim())
    .filter((o) => /^\d+$/.test(o))
    .map(Number)
    .sort((a, b) => a - b);
  for (const n of guests) {
    await guestSelect.selectOption({ label: String(n) }).catch(() => {});
    await sleep(1800);
    if ((await roomCount()) > 0) break;
  }

  // Only tick free breakfast if it still leaves a room on the list.
  const breakfast = page.locator("#breakfast");
  if ((await breakfast.count()) > 0) {
    await breakfast.evaluate((el) => el.scrollIntoView({ block: "center", behavior: "instant" })).catch(() => {});
    await sleep(600);
    await breakfast.check({ force: true }).catch(() => {});
    await sleep(2200);
    if ((await roomCount()) === 0) {
      await breakfast.uncheck({ force: true }).catch(() => {});
      await sleep(1800);
    }
  }
  console.log(`  rooms after filtering: ${await roomCount()}`);
  await settle("filters");

  // 4. A room detail.
  console.log("STEP 4 detail");
  mark("detail");
  // If the filters left nothing, clear them so the tour still opens a room.
  if ((await page.locator("article.room").count()) === 0) {
    console.log("  no rooms after filtering, clearing the filters");
    const clearType = page.locator(".filter-form select").nth(0);
    if ((await clearType.count()) > 0) {
      await clearType.selectOption({ index: 0 }).catch(() => {});
      await sleep(2000);
    }
  }
  const viewLink = page.locator("a.room-link").first();
  if ((await viewLink.count()) > 0) {
    await viewLink.evaluate((el) => el.scrollIntoView({ block: "center", behavior: "instant" })).catch(() => {});
    await sleep(800);
    await humanClick(page, viewLink);
    await sleep(3200);
  }
  const info = page.locator(".single-room-info").first();
  if ((await info.count()) > 0) {
    await info.evaluate((el) => el.scrollIntoView({ block: "center", behavior: "instant" })).catch(() => {});
    await sleep(2200);
  }
  const extras = page.locator(".room-extras").first();
  if ((await extras.count()) > 0) {
    await extras.evaluate((el) => el.scrollIntoView({ block: "center", behavior: "instant" })).catch(() => {});
    await sleep(2000);
  }
  await settle("detail");

  // 5. End card.
  console.log("STEP 5 end");
  mark("end");
  await showEndCard(page, {
    kicker: "END OF TOUR",
    title: "Lux Hotels",
    stack: "React 17 &nbsp;·&nbsp; Context API &nbsp;·&nbsp; styled-components &nbsp;·&nbsp; Contentful",
    sub: "A Contentful catalogue, one context for the filters, and a detail page for every room.",
  });
  await settle("end", 600);
  const { videoPath } = await tour.finish(OUT_MP4);
  console.log(`VIDEO_RAW=${videoPath}`);
}

main().catch((e) => {
  console.error("RECORDING FAILED:", e);
  process.exit(1);
});
