#!/usr/bin/env node
/**
 * post-build.js
 *
 * Runs after `next build` to prepare the `out/` folder for Hostinger shared hosting.
 *
 * What it does:
 * 1. Renames `out/_next` → `out/next_assets` (Apache blocks underscore-prefix dirs)
 * 2. Rewrites ALL file references: `/_next/` → `/next_assets/`
 * 3. INLINES all CSS directly into every HTML file (eliminates external CSS requests)
 *    This is the key fix — even if Apache can't serve `/next_assets/static/css/*.css`,
 *    the styles are already inside the HTML so they ALWAYS load correctly.
 */

const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, 'out');
const OLD_FOLDER = path.join(OUT_DIR, '_next');
const NEW_FOLDER = path.join(OUT_DIR, 'next_assets');

// ─── Step 1: Rename _next → next_assets ──────────────────────────────────────
if (fs.existsSync(OLD_FOLDER)) {
    fs.renameSync(OLD_FOLDER, NEW_FOLDER);
    console.log('✅ Renamed: _next → next_assets');
} else if (fs.existsSync(NEW_FOLDER)) {
    console.log('ℹ️  next_assets already exists — skipping rename');
} else {
    console.warn('⚠️  Neither _next nor next_assets found — check build output');
}

// ─── Step 2: Rewrite all /_next/ references ──────────────────────────────────
const TEXT_EXTENSIONS = ['.html', '.css', '.js', '.json', '.txt', '.xml', '.map'];

function rewriteReferences(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const updated = content
            .replaceAll('/_next/', '/next_assets/')
            .replaceAll('"_next/', '"next_assets/')
            .replaceAll("'_next/", "'next_assets/");
        if (updated !== content) {
            fs.writeFileSync(filePath, updated, 'utf8');
        }
    } catch (e) {
        // Skip binary files
    }
}

function walkDir(dir, callback) {
    try {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                walkDir(fullPath, callback);
            } else {
                callback(fullPath, entry.name);
            }
        }
    } catch (e) {
        console.warn(`Cannot read dir ${dir}:`, e.message);
    }
}

walkDir(OUT_DIR, (filePath, name) => {
    const ext = path.extname(name).toLowerCase();
    if (TEXT_EXTENSIONS.includes(ext)) {
        rewriteReferences(filePath);
    }
});
console.log('✅ Rewrote all /_next/ → /next_assets/ references');

// ─── Step 3: Inline CSS into all HTML files ───────────────────────────────────
// This is the CRITICAL fix for Hostinger: no external CSS requests needed.
// The full CSS is embedded directly in each HTML <head>.

// Collect all CSS files from next_assets/static/css/
const CSS_DIR = path.join(NEW_FOLDER, 'static', 'css');
let inlinedCSS = '';

if (fs.existsSync(CSS_DIR)) {
    const cssFiles = fs.readdirSync(CSS_DIR).filter(f => f.endsWith('.css'));
    for (const cssFile of cssFiles) {
        const fullPath = path.join(CSS_DIR, cssFile);
        const cssContent = fs.readFileSync(fullPath, 'utf8');
        inlinedCSS += cssContent;
        console.log(`  📄 Read CSS: ${cssFile} (${(cssContent.length / 1024).toFixed(1)} KB)`);
    }
} else {
    console.warn('⚠️  No CSS directory found — skipping inline');
}

if (inlinedCSS) {
    // Find all HTML files in out/
    let htmlCount = 0;
    walkDir(OUT_DIR, (filePath, name) => {
        if (!name.endsWith('.html')) return;

        let html = fs.readFileSync(filePath, 'utf8');

        // Remove existing <link rel="stylesheet" ...> tags that point to next_assets
        html = html.replace(/<link[^>]+rel=["']stylesheet["'][^>]*href=["'][^"']*next_assets[^"']*["'][^>]*\/?>/gi, '');

        // Also remove any preload links for CSS
        html = html.replace(/<link[^>]+as=["']style["'][^>]*href=["'][^"']*next_assets[^"']*["'][^>]*\/?>/gi, '');

        // Inject inline CSS before </head>
        const styleTag = `<style>${inlinedCSS}</style>`;
        html = html.replace('</head>', `${styleTag}</head>`);

        fs.writeFileSync(filePath, html, 'utf8');
        htmlCount++;
    });

    console.log(`✅ Inlined CSS into ${htmlCount} HTML files`);
} else {
    console.warn('⚠️  No CSS content found to inline');
}

console.log('\n🎉 Post-build complete! Contents of out/ are ready for Hostinger public_html.');
