#!/usr/bin/env node
// Pings IndexNow (Bing, Yandex, Seznam, Naver) with all URLs from the sitemap.
// Usage: npm run indexnow

const KEY = "d8f4a9e3c7b2f6a1d9e8b5c4a7f3e2d1";
const HOST = "calculio.net";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const ENDPOINT = "https://api.indexnow.org/IndexNow";

async function fetchSitemapUrls() {
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) throw new Error(`Sitemap fetch failed: ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

async function ping(urls) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls,
    }),
  });
  return { status: res.status, body: await res.text() };
}

const urls = await fetchSitemapUrls();
console.log(`Found ${urls.length} URLs in sitemap`);
for (const u of urls) console.log(`  ${u}`);

console.log("\nPinging IndexNow...");
const { status, body } = await ping(urls);
console.log(`HTTP ${status}`);
if (body) console.log(body);

// 200 = accepted, 202 = accepted (key not yet validated — normal on first run)
if (status !== 200 && status !== 202) {
  console.error("Ping rejected.");
  process.exit(1);
}
console.log("\n✓ IndexNow ping accepted");
