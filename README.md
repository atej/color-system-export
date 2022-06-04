# Color System Export

Wrangles popular color systems into formats that can be used by other dev/design
tools.

## Usage

```bash
npm run generate <ColorSystem> <PaletteId> <ExportTarget>
```

## Supported

### Import Radix Colors into Sketch

#### Usage

Workflow:

1. Define your palette in a new file in `src/radix/palettes`
2. Export the newly created palette from `src/radix/palettes/index.ts`
3. Run `npm run generate radix <PaletteId> sketch`
4. Import the generated text file into Sketch using a plugin like
   [Import Colors](https://github.com/Ashung/import-colors-sketch)
