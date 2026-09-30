import sharp from 'sharp'

// Generate additive delivery variants. Keep every supplied original intact.
await sharp('public/images/Abhishek.png').resize({ width: 240 }).webp({ quality: 85 }).toFile('public/images/Abhishek-mobile.webp')
await sharp('public/images/Abhishek.png').resize({ width: 900 }).webp({ quality: 88 }).toFile('public/images/Abhishek-desktop.webp')
for (const name of ['nilsson-model', 'tdse-1d', 'pes-visualizer', 'wrf-atlas']) {
  for (const width of [640, 1280]) {
    await sharp(`public/images/demos/${name}.png`).resize({ width, withoutEnlargement: true }).webp({ quality: 88 }).toFile(`public/images/demos/${name}-${width}.webp`)
  }
}
console.log('[optimize-images] Portrait and tool delivery variants generated; originals preserved.')
