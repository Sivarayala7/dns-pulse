const DEFAULT_TEST_DOMAINS = [
  "google.com",
  "youtube.com",
  "facebook.com",
  "instagram.com",
  "chatgpt.com",
  "claude.ai",
  "x.com",
  "whatsapp.com",
  "reddit.com",
  "wikipedia.org",
  "amazon.com",
  "pinterest.com"
];

const DEFAULT_DNS_PROVIDERS = [
  { name: "AdGuard", url: "https://dns.adguard-dns.com/dns-query", type: "post", allowCors: false, ips: ["94.140.14.14", "94.140.15.15"] },
  { name: "AliDNS", url: "https://dns.alidns.com/dns-query", type: "post", allowCors: false, ips: ["223.5.5.5", "223.6.6.6"] },
  { name: "OpenDNS", url: "https://doh.opendns.com/dns-query", type: "post", allowCors: false, ips: ["208.67.222.222", "208.67.220.220"] },
  { name: "CleanBrowsing", url: "https://doh.cleanbrowsing.org/doh/family-filter/", type: "post", allowCors: false, ips: ["185.228.168.9", "185.228.169.9"] },
  { name: "Cloudflare", url: "https://cloudflare-dns.com/dns-query", type: "get", allowCors: true, ips: ["1.1.1.1", "1.0.0.1"] },
  { name: "Control D", url: "https://freedns.controld.com/p0", type: "post", allowCors: false, ips: ["76.76.2.0", "76.223.122.150"] },
  { name: "DNS.SB", url: "https://doh.dns.sb/dns-query", type: "get", allowCors: true, ips: ["185.222.222.222", "45.11.45.11"] },
  { name: "DNSPod", url: "https://dns.pub/dns-query", type: "post", allowCors: false, ips: ["119.29.29.29", "182.254.116.116"] },
  { name: "Google", url: "https://dns.google/resolve", type: "get", allowCors: true, ips: ["8.8.8.8", "8.8.4.4"] },
  { name: "Mullvad", url: "https://dns.mullvad.net/dns-query", type: "get", allowCors: false, ips: ["194.242.2.2"] },
  { name: "Mullvad Base", url: "https://base.dns.mullvad.net/dns-query", type: "get", allowCors: false, ips: ["194.242.2.4"] },
  { name: "OpenBLD", url: "https://ada.openbld.net/dns-query", type: "post", allowCors: false, ips: ["146.112.41.2", "146.112.41.102"] },
  { name: "DNS4EU", url: "https://unfiltered.joindns4.eu/dns-query", type: "post", allowCors: false, ips: ["86.54.11.100", "86.54.11.200"] },
  { name: "Quad9", url: "https://dns.quad9.net/dns-query", type: "post", allowCors: false, ips: ["9.9.9.9", "149.112.112.112"] },
  { name: "360", url: "https://doh.360.cn/dns-query", type: "post", allowCors: false, ips: ["101.226.4.6", "180.163.224.54"] },
  { name: "Canadian Shield", url: "https://private.canadianshield.cira.ca/dns-query", type: "post", allowCors: false, ips: ["149.112.121.10", "149.112.122.10"] },
  { name: "Digitale Gesellschaft", url: "https://dns.digitale-gesellschaft.ch/dns-query", type: "post", allowCors: false, ips: ["185.95.218.42", "185.95.218.43"] },
  { name: "DNS for Family", url: "https://dns-doh.dnsforfamily.com/dns-query", type: "post", allowCors: false, ips: ["94.130.180.225", "78.47.64.161"] },
  { name: "Restena", url: "https://dnspub.restena.lu/dns-query", type: "post", allowCors: false, ips: ["158.64.1.29"] },
  { name: "IIJ", url: "https://public.dns.iij.jp/dns-query", type: "post", allowCors: false, ips: ["203.180.164.45", "203.180.166.45"] },
  { name: "LibreDNS", url: "https://doh.libredns.gr/dns-query", type: "post", allowCors: false, ips: ["116.202.176.26", "147.135.76.183"] },
  { name: "Switch", url: "https://dns.switch.ch/dns-query", type: "post", allowCors: false, ips: ["130.59.31.248", "130.59.31.251"] },
  { name: "Applied Privacy", url: "https://doh.applied-privacy.net/query", type: "post", allowCors: false, ips: ["146.255.56.98"] },
  { name: "UncensoredDNS", url: "https://anycast.uncensoreddns.org/dns-query", type: "post", allowCors: false, ips: ["91.239.100.100", "89.233.43.71"] },
  { name: "RethinkDNS", url: "https://sky.rethinkdns.com/dns-query", type: "post", allowCors: false, ips: ["104.21.83.62", "172.67.214.246"] },
  { name: "Comcast Xfinity", url: "https://doh.xfinity.com/dns-query", type: "get", allowCors: false, ips: ["75.75.75.75", "75.75.76.76"] }
];

let TEST_DOMAINS = [...DEFAULT_TEST_DOMAINS];
let DNS_PROVIDERS = DEFAULT_DNS_PROVIDERS.map(cloneProvider);

const SAMPLE_ROUNDS = 3;
const TIMEOUT_MS = 5000;
const TIMEOUT_PENALTY_MS = 5000;

const state = {
  running: false,
  results: [],
  openProviders: new Set()
};

const $ = (id) => document.getElementById(id);

const runTestBtn = $("runTestBtn");
const mobileRunTestBtn = $("mobileRunTestBtn");
const resetBtn = $("resetBtn");
const progressWrap = $("progressWrap");
const progressText = $("progressText");
const progressCount = $("progressCount");
const progressBar = $("progressBar");
const resultsSection = $("resultsSection");
const resultsList = $("resultsList");
const summarySection = $("summarySection");
const analysisSection = $("analysisSection");
const emptyState = $("emptyState");
const runNote = $("runNote");
const hostForm = $("hostForm");
const hostInput = $("hostInput");
const providerForm = $("providerForm");
const providerNameInput = $("providerNameInput");
const providerUrlInput = $("providerUrlInput");
const resetHostsBtn = $("resetHostsBtn");
const resetProvidersBtn = $("resetProvidersBtn");
const settingsBtn = $("settingsBtn");
const closeSettingsBtn = $("closeSettingsBtn");
const drawerOverlay = $("drawerOverlay");
const settingsTabs = Array.from(document.querySelectorAll(".settings-tab"));
const settingsPanels = {
  hosts: $("hostsPanel"),
  servers: $("serversPanel")
};

document.addEventListener("DOMContentLoaded", () => {
  updateTestMeta();
  renderHostList();
  renderProviderList();
  restoreTheme();
  detectConnection();
});

$("themeToggle").addEventListener("click", toggleTheme);
runTestBtn.addEventListener("click", runBenchmark);
mobileRunTestBtn.addEventListener("click", runBenchmark);
resetBtn.addEventListener("click", resetBenchmark);
hostForm.addEventListener("submit", addHost);
providerForm.addEventListener("submit", addProvider);
resetHostsBtn.addEventListener("click", resetHosts);
resetProvidersBtn.addEventListener("click", resetProviders);
settingsBtn.addEventListener("click", openSettings);
closeSettingsBtn.addEventListener("click", closeSettings);
drawerOverlay.addEventListener("click", closeSettings);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeSettings();
});
settingsTabs.forEach((tab) => {
  tab.addEventListener("click", () => switchSettingsTab(tab.dataset.settingsTab));
});

function cloneProvider(provider) {
  return {
    ...provider,
    ips: [...provider.ips]
  };
}

function switchSettingsTab(target) {
  settingsTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.settingsTab === target);
  });

  Object.entries(settingsPanels).forEach(([key, panel]) => {
    panel.classList.toggle("hidden", key !== target);
  });
}

function setRunButtonState(label, disabled = false) {
  [runTestBtn, mobileRunTestBtn].forEach((button) => {
    button.disabled = disabled;
    button.querySelector("span").textContent = label;
  });
}

function openSettings() {
  drawerOverlay.classList.remove("hidden");
  document.body.classList.add("settings-open");
}

function closeSettings() {
  document.body.classList.remove("settings-open");
  drawerOverlay.classList.add("hidden");
}

function updateTestMeta() {
  $("providerCount").textContent = String(DNS_PROVIDERS.length);
  $("domainCount").textContent = String(TEST_DOMAINS.length);
  $("roundCount").textContent = String(SAMPLE_ROUNDS);
  $("testPlan").textContent = `${DNS_PROVIDERS.length} resolvers | ${TEST_DOMAINS.length} hosts | ${SAMPLE_ROUNDS} rounds`;
}

function renderHostList() {
  const wrap = $("websiteChips");
  wrap.innerHTML = "";

  TEST_DOMAINS.forEach((domain, index) => {
    const row = document.createElement("div");
    const label = document.createElement("span");
    const button = document.createElement("button");

    row.className = "managed-row";
    label.textContent = domain;
    button.type = "button";
    button.textContent = "x";
    button.setAttribute("aria-label", `Remove ${domain}`);
    button.title = "Remove host";

    button.addEventListener("click", () => {
      if (state.running || TEST_DOMAINS.length <= 1) return;
      TEST_DOMAINS.splice(index, 1);
      updateTestMeta();
      renderHostList();
      resetBenchmark();
    });

    row.append(label, button);
    wrap.appendChild(row);
  });
}

function addHost(event) {
  event.preventDefault();
  if (state.running) return;

  const host = parseHostname(hostInput.value);
  if (!host || TEST_DOMAINS.includes(host)) {
    hostInput.value = "";
    return;
  }

  TEST_DOMAINS.push(host);
  hostInput.value = "";
  updateTestMeta();
  renderHostList();
  resetBenchmark();
}

function resetHosts() {
  if (state.running) return;

  TEST_DOMAINS = [...DEFAULT_TEST_DOMAINS];
  updateTestMeta();
  renderHostList();
  resetBenchmark();
}

function parseHostname(value) {
  const raw = String(value || "").trim();
  if (!raw) return null;

  try {
    const url = new URL(raw.includes("://") ? raw : `https://${raw}`);
    return isValidHostname(url.hostname) ? url.hostname.toLowerCase() : null;
  } catch (error) {
    return null;
  }
}

function isValidHostname(hostname) {
  const labels = hostname.split(".");
  return labels.length > 1 && labels.every((label) => {
    return /^[a-z0-9-]{1,63}$/i.test(label) && !label.startsWith("-") && !label.endsWith("-");
  });
}

function renderProviderList() {
  const wrap = $("providerList");
  wrap.innerHTML = "";

  DNS_PROVIDERS.forEach((provider, index) => {
    const row = document.createElement("div");
    const label = document.createElement("span");
    const name = document.createElement("strong");
    const url = document.createElement("small");
    const button = document.createElement("button");

    row.className = "managed-row provider-row";
    name.textContent = provider.name;
    url.textContent = displayResolverUrl(provider.url);
    button.type = "button";
    button.textContent = "x";
    button.setAttribute("aria-label", `Remove ${provider.name}`);
    button.title = "Remove resolver";
    label.append(name, url);

    button.addEventListener("click", () => {
      if (state.running || DNS_PROVIDERS.length <= 1) return;
      state.openProviders.delete(provider.name);
      DNS_PROVIDERS.splice(index, 1);
      updateTestMeta();
      renderProviderList();
      resetBenchmark();
    });

    row.append(label, button);
    wrap.appendChild(row);
  });
}

function displayResolverUrl(url) {
  try {
    const parsed = new URL(url);
    return `${parsed.hostname}${parsed.pathname}`;
  } catch (error) {
    return url;
  }
}

function addProvider(event) {
  event.preventDefault();
  if (state.running) return;

  const name = providerNameInput.value.trim();
  const url = providerUrlInput.value.trim();
  const parsed = parseProviderUrl(url);

  if (!name || !parsed || DNS_PROVIDERS.some((provider) => provider.name.toLowerCase() === name.toLowerCase() || provider.url === parsed.href)) {
    return;
  }

  DNS_PROVIDERS.push({
    name,
    url: parsed.href,
    type: parsed.pathname.includes("/resolve") ? "get" : "post",
    allowCors: false,
    ips: []
  });

  providerNameInput.value = "";
  providerUrlInput.value = "";
  updateTestMeta();
  renderProviderList();
  resetBenchmark();
}

function parseProviderUrl(value) {
  try {
    const raw = String(value || "").trim();
    const normalized = raw.includes("://") ? raw : `https://${raw}`;
    const parsed = new URL(normalized);
    if (!isValidHostname(parsed.hostname)) return null;
    return parsed.protocol === "https:" ? parsed : null;
  } catch (error) {
    return null;
  }
}

function resetProviders() {
  if (state.running) return;

  DNS_PROVIDERS = DEFAULT_DNS_PROVIDERS.map(cloneProvider);
  updateTestMeta();
  renderProviderList();
  resetBenchmark();
}

function restoreTheme() {
  const saved = localStorage.getItem("dns-pulse-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = saved ? saved === "dark" : prefersDark;

  document.documentElement.classList.toggle("dark", dark);
}

function toggleTheme() {
  const root = document.documentElement;
  const dark = !root.classList.contains("dark");

  root.classList.toggle("dark", dark);
  localStorage.setItem("dns-pulse-theme", dark ? "dark" : "light");
}

async function detectConnection() {
  const ispName = $("ispName");
  const connectionMeta = $("connectionMeta");

  const lookups = [
    {
      url: "https://ipwho.is/",
      parse: (data) => ({
        ok: data.success !== false,
        ip: data.ip,
        provider: data.connection?.isp || data.connection?.org,
        city: data.city,
        region: data.region,
        country: data.country,
        network: data.connection?.asn ? `AS${data.connection.asn}` : ""
      })
    },
    {
      url: "https://ipapi.co/json/",
      parse: (data) => ({
        ok: !data.error,
        ip: data.ip,
        provider: data.org || data.asn,
        city: data.city,
        region: data.region,
        country: data.country_name,
        network: data.asn
      })
    },
    {
      url: "https://ipinfo.io/json",
      parse: (data) => ({
        ok: !data.error,
        ip: data.ip,
        provider: data.org,
        city: data.city,
        region: data.region,
        country: data.country,
        network: data.org
      })
    }
  ];

  for (const lookup of lookups) {
    try {
      const data = await fetchJsonWithTimeout(lookup.url, 3500);
      const parsed = lookup.parse(data);

      if (!parsed.ok || !parsed.ip) continue;

      const location = [parsed.city, parsed.region, parsed.country].filter(Boolean).join(", ");
      ispName.textContent = normalizeProviderName(parsed.provider || "Unknown provider");
      connectionMeta.textContent = [parsed.ip, location, parsed.network].filter(Boolean).join(" | ");
      return;
    } catch (error) {
      // Try the next public IP endpoint.
    }
  }

  try {
    const data = await fetchJsonWithTimeout("https://api.ipify.org?format=json", 3500);
    ispName.textContent = "Unknown provider";
    connectionMeta.textContent = data.ip ? `${data.ip} | Provider lookup unavailable` : "Public IP lookup unavailable";
  } catch (error) {
    ispName.textContent = "Unknown provider";
    connectionMeta.textContent = "Public IP lookup unavailable. A browser extension, VPN, or network rule may be blocking it.";
  }
}

async function fetchJsonWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      cache: "no-store",
      signal: controller.signal
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

function normalizeProviderName(raw) {
  const value = String(raw || "").trim();
  const name = value.toLowerCase();

  if (name.includes("jio") || name.includes("reliance")) return "Jio";
  if (name.includes("airtel") || name.includes("bharti")) return "Airtel";
  if (name.includes("vodafone") || name.includes("idea")) return "Vi";
  if (name.includes("bsnl")) return "BSNL";
  if (name.includes("act")) return "ACT Fibernet";
  if (name.includes("hathway")) return "Hathway";
  if (name.includes("excitel")) return "Excitel";
  if (name.includes("tata")) return "Tata";
  if (name.includes("spectra")) return "Spectra";

  return value.replace(/^AS\d+\s+/i, "") || "Unknown provider";
}

async function runBenchmark() {
  if (state.running) return;

  state.running = true;
  state.results = [];
  state.openProviders.clear();
  resultsList.innerHTML = "";
  resultsSection.classList.remove("hidden");
  summarySection.classList.add("hidden");
  analysisSection.classList.add("hidden");
  emptyState.classList.add("hidden");
  setRunButtonState("Preparing", true);
  runNote.textContent = "Preparing resolver checks...";

  showProgress("Preparing resolver checks", 0, DNS_PROVIDERS.length);
  await warmupProviders();

  const total = DNS_PROVIDERS.length;
  for (let i = 0; i < total; i += 1) {
    const provider = DNS_PROVIDERS[i];

    setRunButtonState(`Testing ${i + 1}/${total}`, true);
    showProgress(`Testing ${provider.name} (${SAMPLE_ROUNDS} rounds)`, i + 1, total);
    const providerResult = await testProvider(provider);
    state.results.push(providerResult);
    renderResults();
  }

  state.results.sort((a, b) => a.stats.avg - b.stats.avg);
  hideProgress();
  renderResults();
  renderSummary();

  setRunButtonState("Test again", false);
  runNote.textContent = `Last run: ${DNS_PROVIDERS.length} resolvers, ${TEST_DOMAINS.length} hostnames, ${SAMPLE_ROUNDS} measured rounds.`;
  state.running = false;
}

async function warmupProviders() {
  const jobs = DNS_PROVIDERS.map((provider) => {
    return Promise.allSettled(TEST_DOMAINS.map((domain) => measureDnsLookup(provider, domain)));
  });

  await Promise.allSettled(jobs);
}

async function testProvider(provider) {
  const samplesByDomain = new Map(TEST_DOMAINS.map((domain) => [domain, []]));

  for (let round = 0; round < SAMPLE_ROUNDS; round += 1) {
    const settled = await Promise.allSettled(
      TEST_DOMAINS.map((domain) => measureDnsLookup(provider, domain))
    );

    settled.forEach((result, index) => {
      const domain = TEST_DOMAINS[index];
      samplesByDomain.get(domain).push(result.status === "fulfilled" ? result.value : null);
    });
  }

  const domainResults = TEST_DOMAINS.map((domain) => {
    const samples = samplesByDomain.get(domain);
    const successful = samples.filter((value) => typeof value === "number");

    return {
      domain,
      samples,
      ms: successful.length ? median(successful) : null,
      successCount: successful.length,
      totalCount: samples.length
    };
  });
  const stats = calculateStats(domainResults);
  const analysis = analyzeProvider(provider, domainResults, stats);

  return {
    provider,
    domainResults,
    stats,
    analysis
  };
}

function showProgress(text, current, total) {
  progressWrap.classList.remove("hidden");
  progressText.textContent = text;
  progressCount.textContent = current && total ? `${current}/${total}` : "";
  progressBar.style.width = total ? `${(current / total) * 100}%` : "0%";
}

function hideProgress() {
  progressWrap.classList.add("hidden");
  progressBar.style.width = "0%";
}

function resetBenchmark() {
  if (state.running) return;

  state.results = [];
  state.openProviders.clear();
  resultsList.innerHTML = "";
  resultsSection.classList.add("hidden");
  summarySection.classList.add("hidden");
  analysisSection.classList.add("hidden");
  emptyState.classList.remove("hidden");
  setRunButtonState("Start test", false);
  runNote.textContent = "No benchmark has been run yet.";
  hideProgress();
}

async function measureDnsLookup(provider, domain) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const start = performance.now();

  try {
    const { requestUrl, options } = buildRequest(provider, domain, controller.signal);
    const response = await fetch(requestUrl, options);

    if (provider.allowCors && !response.ok) {
      return null;
    }

    return performance.now() - start;
  } catch (error) {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function buildRequest(provider, domain, signal) {
  const requestUrl = new URL(provider.url);
  const usesJsonApi = requestUrl.pathname.includes("/resolve");
  const dnsQuery = buildDnsQuery(domain);
  const options = {
    method: "GET",
    mode: provider.allowCors ? "cors" : "no-cors",
    cache: "no-store",
    signal
  };

  if (provider.type === "get") {
    if (usesJsonApi) {
      requestUrl.searchParams.set("name", domain);
      requestUrl.searchParams.set("type", "A");
      requestUrl.searchParams.set("nocache", String(Date.now()));
      if (provider.allowCors) options.headers = { Accept: "application/dns-json" };
    } else {
      requestUrl.searchParams.set("dns", base64UrlEncode(dnsQuery));
      if (provider.allowCors) options.headers = { Accept: "application/dns-message" };
    }
  } else if (provider.allowCors) {
    options.method = "POST";
    options.body = dnsQuery;
    options.headers = {
      "Content-Type": "application/dns-message",
      Accept: "application/dns-message"
    };
  } else {
    requestUrl.searchParams.set("dns", base64UrlEncode(dnsQuery));
  }

  return {
    requestUrl: requestUrl.toString(),
    options
  };
}

function buildDnsQuery(hostname) {
  const normalizedHost = normalizeHostname(hostname);
  const labels = normalizedHost.split(".").filter(Boolean);

  if (!labels.length) throw new Error("Invalid hostname");

  const header = new Uint8Array(12);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(header.subarray(0, 2));
  } else {
    const transactionId = Math.floor(Math.random() * 65535);
    header[0] = (transactionId >> 8) & 0xff;
    header[1] = transactionId & 0xff;
  }

  header[2] = 0x01;
  header[5] = 0x01;

  const qnameParts = [];
  labels.forEach((label) => {
    if (label.length > 63) throw new Error("DNS label too long");
    qnameParts.push(label.length);

    for (const char of label) {
      const code = char.charCodeAt(0);
      if (code > 127) throw new Error("Only ASCII/punycode hostnames are supported");
      qnameParts.push(code);
    }
  });

  qnameParts.push(0x00);

  const footer = [0x00, 0x01, 0x00, 0x01];
  const packet = new Uint8Array(header.length + qnameParts.length + footer.length);
  packet.set(header, 0);
  packet.set(qnameParts, header.length);
  packet.set(footer, header.length + qnameParts.length);
  return packet;
}

function normalizeHostname(value) {
  const trimmed = String(value).trim().replace(/\.$/, "");
  try {
    return new URL(`http://${trimmed}`).hostname;
  } catch (error) {
    return trimmed;
  }
}

function base64UrlEncode(bytes) {
  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function calculateStats(domainResults) {
  const allSamples = domainResults.flatMap((item) => item.samples);
  const successful = allSamples.filter((value) => typeof value === "number");
  const scored = allSamples.map((value) => {
    return typeof value === "number" ? value : TIMEOUT_PENALTY_MS;
  });
  const failed = allSamples.length - successful.length;

  scored.sort((a, b) => a - b);

  return {
    min: scored[0],
    max: scored[scored.length - 1],
    avg: scored.reduce((sum, value) => sum + value, 0) / scored.length,
    median: median(scored),
    successCount: successful.length,
    failedCount: failed,
    totalCount: allSamples.length,
    hostCount: domainResults.length,
    timeoutRate: (failed / allSamples.length) * 100
  };
}

function median(values) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[middle - 1] + sorted[middle]) / 2
    : sorted[middle];
}

function analyzeProvider(provider, domainResults, stats) {
  const successfulDomains = domainResults.filter((item) => typeof item.ms === "number");

  if (!successfulDomains.length) {
    return {
      grade: "Failed",
      badgeType: "bad",
      consistency: "No successful samples",
      message: `${provider.name} produced no completed browser DoH samples. It may be blocked by this network, browser policy, VPN rules, or the resolver endpoint.`
    };
  }

  const fastestDomain = successfulDomains.reduce((best, current) => {
    return current.ms < best.ms ? current : best;
  });
  const slowestDomain = successfulDomains.reduce((worst, current) => {
    return current.ms > worst.ms ? current : worst;
  });
  const spread = stats.max - stats.min;

  let consistency;
  if (spread < 60) consistency = "Very consistent";
  else if (spread < 180) consistency = "Good";
  else if (spread < 500) consistency = "Variable";
  else consistency = "Unstable";

  let grade;
  let badgeType;
  if (stats.avg < 90 && stats.timeoutRate === 0) {
    grade = "Excellent";
    badgeType = "good";
  } else if (stats.avg < 180 && stats.timeoutRate <= 15) {
    grade = "Good";
    badgeType = "good";
  } else if (stats.avg < 420 && stats.timeoutRate <= 35) {
    grade = "Mixed";
    badgeType = "warn";
  } else {
    grade = "Poor";
    badgeType = "bad";
  }

  const failureText = stats.failedCount === 0
    ? "No measured samples failed."
    : `${stats.failedCount} of ${stats.totalCount} measured samples failed and were scored as ${TIMEOUT_PENALTY_MS} ms.`;
  const modeText = provider.allowCors
    ? "Browser responses are readable for this resolver."
    : "This resolver is timed through no-CORS reachability, matching the reference approach but without inspecting the response body.";

  return {
    grade,
    badgeType,
    consistency,
    message:
      `${provider.name} completed ${stats.successCount}/${stats.totalCount} measured samples. ` +
      `Average was ${formatMs(stats.avg)} and median was ${formatMs(stats.median)}. ` +
      `Fastest hostname median was ${fastestDomain.domain} at ${formatMs(fastestDomain.ms)}; ` +
      `slowest successful hostname median was ${slowestDomain.domain} at ${formatMs(slowestDomain.ms)}. ` +
      `${failureText} ${modeText}`
  };
}

function buildFinalAnalysis(best, second) {
  if (!best) {
    return "No resolver completed the benchmark. Try disabling VPN/browser privacy extensions or testing from another network.";
  }

  let text =
    `${best.provider.name} ranked first after ${SAMPLE_ROUNDS} measured rounds, ` +
    `with ${formatMs(best.stats.avg)} average latency across ${best.stats.totalCount} scored samples. `;

  if (second) {
    text += `It led ${second.provider.name} by about ${formatMs(second.stats.avg - best.stats.avg)} in this run. `;
  }

  return text + "Use multiple runs at different times before changing router DNS.";
}

function renderResults() {
  const sorted = [...state.results].sort((a, b) => a.stats.avg - b.stats.avg);
  resultsList.innerHTML = "";

  sorted.forEach((result, index) => {
    const card = document.createElement("article");
    const provider = result.provider;
    const stats = result.stats;
    const analysis = result.analysis;

    card.className = `result-card${state.openProviders.has(provider.name) ? " open" : ""}`;
    card.innerHTML = `
      <button class="result-main" type="button">
        <div class="provider-cell">
          <div class="provider-name">${index + 1}. ${provider.name}</div>
          <div class="provider-meta">${provider.ips.length ? provider.ips.join(", ") : "Custom DoH resolver"}</div>
          <span class="badge ${analysis.badgeType}">
            ${analysis.grade} | ${stats.successCount}/${stats.totalCount}
          </span>
        </div>
        <div class="metric">
          <span>Avg</span>
          <strong>${formatMs(stats.avg)}</strong>
        </div>
        <div class="metric">
          <span>Median</span>
          <strong>${formatMs(stats.median)}</strong>
        </div>
        <div class="metric">
          <span>Min</span>
          <strong>${formatMs(stats.min)}</strong>
        </div>
        <div class="metric">
          <span>Max</span>
          <strong>${formatMs(stats.max)}</strong>
        </div>
        <div class="metric">
          <span>Samples</span>
          <strong>${stats.successCount}/${stats.totalCount}</strong>
        </div>
        <div class="detail-cue">
          <span>Details</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </div>
      </button>
      <div class="result-details">
        <div class="detail-grid">
          <div class="detail-box">
            <span>Reliability</span>
            <strong>${stats.successCount}/${stats.totalCount}</strong>
          </div>
          <div class="detail-box">
            <span>Consistency</span>
            <strong>${analysis.consistency}</strong>
          </div>
          <div class="detail-box">
            <span>Browser mode</span>
            <strong>${provider.allowCors ? "Verified response" : "Reachability timing"}</strong>
          </div>
        </div>
        <p>${analysis.message}</p>
        <table class="domain-table">
          <thead>
            <tr>
              <th>Hostname</th>
              <th>Samples</th>
              <th>Median</th>
            </tr>
          </thead>
          <tbody>
            ${result.domainResults.map((item) => `
              <tr>
                <td>${item.domain}</td>
                <td>${item.successCount}/${item.totalCount}</td>
                <td>${formatMs(item.ms)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;

    card.querySelector(".result-main").addEventListener("click", () => {
      const open = !card.classList.contains("open");
      if (open) {
        state.openProviders.add(provider.name);
      } else {
        state.openProviders.delete(provider.name);
      }
      card.classList.toggle("open", open);
    });

    resultsList.appendChild(card);
  });
}

function renderSummary() {
  const successful = state.results
    .filter((item) => item.stats.successCount > 0)
    .sort((a, b) => a.stats.avg - b.stats.avg);
  const best = successful[0];
  const second = successful[1];

  if (!best) {
    $("bestDnsName").textContent = "No result";
    $("bestDnsDetails").textContent = "All resolvers failed.";
    $("bestDnsAvg").textContent = "-";
    $("bestDnsReliability").textContent = "-";
  } else {
    $("bestDnsName").textContent = best.provider.name;
    $("bestDnsDetails").textContent = best.provider.ips.join(", ");
    $("bestDnsAvg").textContent = formatMs(best.stats.avg);
    $("bestDnsReliability").textContent = `${best.stats.successCount}/${best.stats.totalCount}`;
  }

  $("finalAnalysisText").textContent = buildFinalAnalysis(best, second);
  summarySection.classList.remove("hidden");
  analysisSection.classList.remove("hidden");
}

function formatMs(value) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "N/A";
  }

  return `${value.toFixed(1)} ms`;
}
