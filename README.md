# Color System Export

Wrangles popular color systems into formats that can be used by other dev/design
tools.

## Usage

1. Clone the repo
2. Run `npm install`
3. Run the script `npm run export <ColorSystem> <PaletteId> <ExportTarget>`

## Supported

### Import Radix UI Colors into Sketch

#### Usage

1. Define your palette in `src/radix/palettes`
2. Export the palette from `src/radix/palettes/index.ts`
3. Run `npm run export radix <PaletteId> sketch`
4. Import the generated text file into Sketch using the (free) plugin
   [Import Colors](https://github.com/Ashung/import-colors-sketch)

### Import Radix UI Colors into Figma

1. Define your palette in `src/radix/palettes`
2. Export the palette from `src/radix/palettes/index.ts`
3. Run `npm run export radix <PaletteId> figma`
4. Import the generated JSON files into Figma using the (free) plugin
   [Figma Tokens](https://www.figmatokens.com/)
