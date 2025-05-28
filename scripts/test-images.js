#!/usr/bin/env node

/**
 * Test script to verify image accessibility for GitHub Pages deployment
 */

const https = require('https');
const http = require('http');

const baseUrl = 'https://nrenx.github.io/portfilio';

const imagePaths = [
  '/assets/images/Finding joy in the simplicity of the sea ............beach bridge ocean smile sunny monument collage sunset sunrise travelphotography travel.jpg',
  '/assets/images/Finding paradise wherever the waves take me. . . . . . . . . . . . . . . .beachbound beachlife beach beachdreaming ocean paradise wavesfordays explore rainyday shorelineadventures seasideescape beach.jpg',
  '/assets/macOS-wallpaper/wallpaperflare.com_wallpaper (1).jpg',
  '/assets/macOS-wallpaper/wallpaperflare.com_wallpaper.jpg'
];

function testImageUrl(url) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https:') ? https : http;

    protocol.get(url, (res) => {
      console.log(`✓ ${url} - Status: ${res.statusCode}`);
      resolve({ url, status: res.statusCode, success: res.statusCode === 200 });
    }).on('error', (err) => {
      console.log(`✗ ${url} - Error: ${err.message}`);
      resolve({ url, status: 'error', success: false, error: err.message });
    });
  });
}

async function testAllImages() {
  console.log('Testing image accessibility for GitHub Pages...\n');

  const results = [];

  for (const imagePath of imagePaths) {
    const fullUrl = `${baseUrl}${imagePath}`;
    const result = await testImageUrl(fullUrl);
    results.push(result);
  }

  console.log('\n--- Summary ---');
  const successful = results.filter(r => r.success).length;
  const total = results.length;

  console.log(`${successful}/${total} images accessible`);

  if (successful === total) {
    console.log('✓ All images are accessible!');
    process.exit(0);
  } else {
    console.log('✗ Some images are not accessible');
    process.exit(1);
  }
}

testAllImages().catch(console.error);
