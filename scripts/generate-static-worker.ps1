$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$dist = Join-Path $root 'dist'
$server = Join-Path $dist 'server'
New-Item -ItemType Directory -Force -Path $server | Out-Null

function To-Base64([string] $path) {
  return [Convert]::ToBase64String([IO.File]::ReadAllBytes($path))
}

$html = To-Base64 (Join-Path $dist 'index.html')
$css = To-Base64 (Join-Path $dist 'styles.css')
$app = To-Base64 (Join-Path $dist 'app.js')

$worker = @"
const assets = {
  "/": { type: "text/html; charset=utf-8", data: "$html" },
  "/index.html": { type: "text/html; charset=utf-8", data: "$html" },
  "/styles.css": { type: "text/css; charset=utf-8", data: "$css" },
  "/app.js": { type: "application/javascript; charset=utf-8", data: "$app" }
};

function decode(value) {
  const binary = atob(value);
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export default {
  async fetch(request) {
    const path = new URL(request.url).pathname;
    const asset = assets[path] || assets["/"];
    return new Response(decode(asset.data), {
      headers: {
        "content-type": asset.type,
        "cache-control": "no-cache"
      }
    });
  }
};
"@

Set-Content -LiteralPath (Join-Path $server 'index.js') -Value $worker -Encoding utf8
