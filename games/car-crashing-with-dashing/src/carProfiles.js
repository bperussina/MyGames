/** Visual proportions and iconic cues per car — makes each model read like the real thing. */
const STYLE_DEFAULTS = {
  sedan: {
    length: 4.55, width: 1.88, ride: 0.52, cabinH: 0.78, cabinLen: 2.15, hoodLen: 1.35,
    wheelR: 0.36, wheelX: 0.86, wheelZ: 1.36, grille: true, chromeTrim: true,
  },
  sports: {
    length: 4.15, width: 1.92, ride: 0.38, cabinH: 0.52, cabinLen: 1.42, hoodLen: 1.62,
    wheelR: 0.34, wheelX: 0.9, wheelZ: 1.22, low: true, spoiler: true, wideHips: true,
  },
  suv: {
    length: 4.65, width: 2.02, ride: 0.72, cabinH: 0.98, cabinLen: 2.55, hoodLen: 1.15,
    wheelR: 0.4, wheelX: 0.92, wheelZ: 1.48, roofRails: true, upright: true,
  },
  truck: {
    length: 5.4, width: 2.05, ride: 0.78, cabinH: 0.82, cabinLen: 1.55, hoodLen: 1.05,
    wheelR: 0.42, wheelX: 0.96, wheelZ: 1.38, bedLen: 2.45, bed: true,
  },
  compact: {
    length: 3.35, width: 1.62, ride: 0.46, cabinH: 0.68, cabinLen: 1.65, hoodLen: 0.85,
    wheelR: 0.32, wheelX: 0.72, wheelZ: 1.05,
  },
  vintage: {
    length: 3.85, width: 1.72, ride: 0.68, cabinH: 0.62, cabinLen: 1.45, hoodLen: 1.1,
    wheelR: 0.36, wheelX: 0.78, wheelZ: 1.2, fenders: true, tall: true,
  },
  van: {
    length: 4.55, width: 1.92, ride: 0.95, cabinH: 1.38, cabinLen: 3.2, hoodLen: 0.55,
    wheelR: 0.37, wheelX: 0.88, wheelZ: 1.38, flatFront: true,
  },
  cybertruck: { bodyShape: 'cybertruck' },
};

const ID_OVERRIDES = {
  cybertruck: { bodyShape: 'cybertruck' },
  beetle: { bodyShape: 'round', length: 3.25, width: 1.58, ride: 0.5, roundH: 1.02 },
  'citroen-2cv': { bodyShape: 'round', length: 3.45, width: 1.48, ride: 0.48, roundH: 0.95, softTop: true },
  'fiat-500': { bodyShape: 'round', length: 2.95, width: 1.42, ride: 0.42, roundH: 0.88 },
  'vw-bus': { bodyShape: 'flat-van', length: 4.55, width: 1.88, ride: 1.05, splitWindshield: true },
  'porsche-911': { bodyShape: '911', length: 4.35, width: 1.9, ride: 0.4, rearHump: true, roundLights: true },
  'ford-mustang': { bodyShape: 'fastback', length: 4.55, width: 1.92, hoodLen: 1.75, fastback: true, scoop: true },
  'dodge-charger': { bodyShape: 'fastback', length: 4.85, width: 1.98, hoodLen: 1.7, fastback: true, muscle: true },
  'chevy-camaro': { bodyShape: 'fastback', length: 4.45, width: 1.9, hoodLen: 1.65, fastback: true },
  delorean: { bodyShape: 'wedge', stainless: true, length: 4.2, width: 1.85, ride: 0.42, gullwing: true },
  'lamborghini-aventador': { bodyShape: 'supercar', length: 4.55, width: 2.05, ride: 0.32, scissor: true, wide: true },
  'lamborghini-miura': { bodyShape: 'supercar', length: 4.35, width: 1.92, ride: 0.34 },
  'ferrari-308': { bodyShape: 'supercar', length: 4.25, width: 1.88, ride: 0.35, roundLights: true },
  'bugatti-chiron': { bodyShape: 'supercar', length: 4.55, width: 2.08, ride: 0.3, wide: true, horseshoe: true },
  'jeep-wrangler': { bodyShape: 'box-suv', length: 4.2, width: 1.88, ride: 0.82, spare: true, roundLights: true, upright: true },
  'mercedes-g': { bodyShape: 'box-suv', length: 4.55, width: 1.95, ride: 0.88, boxy: true, spare: false },
  'hummer-h1': { bodyShape: 'box-suv', length: 4.85, width: 2.15, ride: 0.95, wide: true, military: true },
  'model-t': { bodyShape: 'vintage-tall', length: 3.35, width: 1.55, ride: 0.82, tall: true, spoked: true },
  'rolls-silver-ghost': { bodyShape: 'vintage-tall', length: 4.85, width: 1.82, ride: 0.95, tall: true, longHood: true },
  'tesla-model-s': { bodyShape: 'ev-sedan', length: 4.75, width: 1.92, ride: 0.48, smooth: true, noGrille: true },
  'tesla-model-3': { bodyShape: 'ev-sedan', length: 4.55, width: 1.85, ride: 0.45, smooth: true, noGrille: true },
  'tesla-model-x': { bodyShape: 'ev-suv', length: 4.75, width: 2.0, ride: 0.72, falcon: true, noGrille: true },
  'tesla-model-y': { bodyShape: 'ev-suv', length: 4.65, width: 1.92, ride: 0.68, smooth: true, noGrille: true },
  'tesla-roadster': { bodyShape: 'supercar', length: 4.0, width: 1.88, ride: 0.34, smooth: true, noGrille: true },
  'rivian-r1t': { bodyShape: 'ev-truck', length: 5.35, width: 2.05, ride: 0.82, bed: true, roundLights: true },
  'ford-f150': { bodyShape: 'truck', length: 5.55, width: 2.08, ride: 0.82, bedLen: 2.55, chromeGrille: true },
  'dodge-ram': { bodyShape: 'truck', length: 5.65, width: 2.1, ride: 0.85, bedLen: 2.6, tallGrille: true },
  'mercedes-300sl': { bodyShape: 'gullwing', length: 4.35, width: 1.82, ride: 0.42, gullwing: true },
  'jaguar-e-type': { bodyShape: 'fastback', length: 4.45, width: 1.78, hoodLen: 1.85, longNose: true },
  'vw-id4': { bodyShape: 'ev-suv', length: 4.55, width: 1.92, ride: 0.7, smooth: true },
  'renault-5-ev': { bodyShape: 'round', length: 3.55, width: 1.65, ride: 0.48, roundH: 0.82, retro: true },
  'mini-cooper': { bodyShape: 'round', length: 3.55, width: 1.62, ride: 0.44, roundH: 0.72 },
  'ford-gt': { bodyShape: 'supercar', length: 4.35, width: 1.95, ride: 0.33, stripe: true },
  'ford-gt40': { bodyShape: 'supercar', length: 4.15, width: 1.92, ride: 0.32, stripe: true },
  'aston-db5': { bodyShape: 'fastback', length: 4.45, width: 1.82, hoodLen: 1.55, elegant: true },
  'rolls-phantom': { bodyShape: 'luxury-sedan', length: 5.35, width: 2.0, ride: 0.58, tall: true, longHood: true },
  'cadillac-escalade': { bodyShape: 'luxury-suv', length: 5.05, width: 2.05, ride: 0.78, chromeGrille: true },
  trabant: { bodyShape: 'round', length: 3.25, width: 1.48, ride: 0.46, roundH: 0.78, twoStroke: true },
  'toyota-prius': { bodyShape: 'hybrid', length: 4.35, width: 1.78, ride: 0.5, wedgeRear: true },
  'hyundai-ioniq5': { bodyShape: 'ev-suv', length: 4.55, width: 1.92, ride: 0.68, pixelLights: true, retro: true },
};

export function getCarProfile(spec) {
  const style = spec.style ?? 'sedan';
  const base = { ...(STYLE_DEFAULTS[style] ?? STYLE_DEFAULTS.sedan) };
  const over = ID_OVERRIDES[spec.id] ?? {};
  const profile = {
    ...base,
    ...over,
    id: spec.id,
    name: spec.name,
    style,
    color: spec.color ?? 0xb8bdc4,
    year: spec.year ?? 2000,
    maker: spec.maker ?? '',
  };
  if (!profile.bodyShape) profile.bodyShape = style;
  return profile;
}
