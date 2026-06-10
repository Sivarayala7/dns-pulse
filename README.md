# DNS Pulse

DNS Pulse is a browser-based DNS-over-HTTPS speed test. It benchmarks popular public DNS resolvers from the user's own browser and shows speed, reliability, consistency, ISP information, and a final recommendation.

## Features

- Browser-based DNS-over-HTTPS benchmark
- Popular website test list
- ISP/provider detection
- Public IP and approximate location display
- Average, median, min, and max response time
- Reliability scoring
- Consistency analysis
- Warm-up pass before timing
- Three measured rounds per hostname
- Per-domain DNS result breakdown
- Dark mode
- GitHub Pages ready

## How it works

DNS Pulse builds a DNS A-record query in JavaScript, sends it to DNS-over-HTTPS providers, and measures request time with `performance.now()`.

Before measuring, DNS Pulse runs a warm-up pass across the resolver and hostname matrix. This reduces the effect of first-request TCP/TLS setup. After warm-up, each resolver is tested across three measured rounds per hostname. Failed samples are scored as 5000 ms.

Some resolvers support readable browser responses through CORS. Others are timed with browser `no-cors` reachability checks, which can measure request completion but cannot inspect the DNS answer body.

Each provider is tested against popular domains such as:

- google.com
- youtube.com
- facebook.com
- instagram.com
- chatgpt.com
- wikipedia.org
- reddit.com
- x.com
- amazon.com
- microsoft.com
- apple.com
- cloudflare.com

Failed or timed-out samples are scored as 5000 ms.

## Important note

Results depend on the user's:

- ISP
- physical location
- VPN/proxy status
- browser
- network congestion
- DNS provider availability

If a user is using a VPN, the ISP detector may show the VPN provider instead of the real ISP.

## Run locally

Use VS Code Live Server or any simple local HTTP server. Opening `index.html` directly may work, but browser privacy and network APIs are more reliable from `http://localhost`.

Recommended:

1. Install the VS Code extension: Live Server
2. Right-click `index.html`
3. Click `Open with Live Server`

## Deploy on GitHub Pages

1. Push this repository to GitHub
2. Open repository settings
3. Go to Pages
4. Select branch: `main`
5. Select folder: `/root`
6. Save
7. Open the generated GitHub Pages URL

## License

MIT
