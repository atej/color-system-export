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

1. Define your palette in a new file in `src/radix/palettes`
2. Export the newly created palette from `src/radix/palettes/index.ts`
3. Run `npm run generate radix <PaletteId> sketch`
4. Import the generated text file into Sketch using the plugin
   [Import Colors](https://github.com/Ashung/import-colors-sketch)
