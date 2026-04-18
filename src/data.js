// Seed plants — shown when localStorage is empty
export const SEED_PLANTS = [
  { id: '1', name: 'Monstera', species: 'Monstera Deliciosa', room: 'Wohnzimmer', letter: 'M', hue: 150,
    frequency: 4, light: 'indirect', reminderTime: '08:00', createdAt: new Date().toISOString() },
  { id: '2', name: 'Ficus', species: 'Ficus Lyrata', room: 'Arbeitszimmer', letter: 'F', hue: 145,
    frequency: 7, light: 'bright', reminderTime: '08:00', createdAt: new Date().toISOString() },
  { id: '3', name: 'Sanse', species: 'Sansevieria', room: 'Schlafzimmer', letter: 'S', hue: 135,
    frequency: 14, light: 'low', reminderTime: '08:00', createdAt: new Date().toISOString() },
  { id: '4', name: 'Calathea', species: 'Calathea Orbifolia', room: 'Bad', letter: 'C', hue: 160,
    frequency: 3, light: 'indirect', reminderTime: '08:00', createdAt: new Date().toISOString() },
  { id: '5', name: 'Pilea', species: 'Pilea Peperomioides', room: 'Küche', letter: 'P', hue: 155,
    frequency: 5, light: 'bright', reminderTime: '08:00', createdAt: new Date().toISOString() },
  { id: '6', name: 'Epipremnum', species: 'Epipremnum Aureum', room: 'Flur', letter: 'E', hue: 148,
    frequency: 7, light: 'indirect', reminderTime: '08:00', createdAt: new Date().toISOString() },
]

export const DISCOVER = [
  { id: 'd1', name: 'Monstera Deliciosa', tag: 'Tropisch', letter: 'M', hue: 150, diff: 'Leicht', light: 'Indirekt', cats: ['easy','trop','air'] },
  { id: 'd2', name: 'Pothos', tag: 'Kletterpflanze', letter: 'P', hue: 148, diff: 'Leicht', light: 'Wenig–Hell', cats: ['easy','low','air'] },
  { id: 'd3', name: 'Snake Plant', tag: 'Sukkulente', letter: 'S', hue: 135, diff: 'Sehr leicht', light: 'Wenig', cats: ['easy','low','succ','air'] },
  { id: 'd4', name: 'Calathea Medallion', tag: 'Tropisch', letter: 'C', hue: 160, diff: 'Mittel', light: 'Indirekt', cats: ['pet','trop'] },
  { id: 'd5', name: 'ZZ Plant', tag: 'Robust', letter: 'Z', hue: 142, diff: 'Sehr leicht', light: 'Wenig', cats: ['easy','low'] },
  { id: 'd6', name: 'Fiddle Leaf Fig', tag: 'Baum', letter: 'F', hue: 145, diff: 'Schwer', light: 'Hell', cats: ['trop'] },
  { id: 'd7', name: 'Spider Plant', tag: 'Klassiker', letter: 'S', hue: 150, diff: 'Leicht', light: 'Indirekt', cats: ['easy','pet','air'] },
  { id: 'd8', name: 'Aloe Vera', tag: 'Sukkulente', letter: 'A', hue: 130, diff: 'Leicht', light: 'Hell', cats: ['easy','succ'] },
  { id: 'd9', name: 'Peace Lily', tag: 'Blühend', letter: 'P', hue: 155, diff: 'Mittel', light: 'Wenig', cats: ['low','air'] },
]

export const CATEGORIES = [
  { id: 'all', label: 'Alle' },
  { id: 'easy', label: 'Anfängerfreundlich' },
  { id: 'low', label: 'Wenig Licht' },
  { id: 'pet', label: 'Haustiersicher' },
  { id: 'air', label: 'Luftreinigend' },
  { id: 'trop', label: 'Tropisch' },
  { id: 'succ', label: 'Sukkulenten' },
]

export const ROOMS = ['Wohnzimmer', 'Schlafzimmer', 'Küche', 'Bad', 'Arbeitszimmer', 'Flur', 'Balkon']

export const LIGHTS = [
  { id: 'low', label: 'Wenig Licht', desc: 'Nordfenster oder dunklere Ecke' },
  { id: 'indirect', label: 'Indirektes Licht', desc: 'Helle Position ohne direkte Sonne' },
  { id: 'bright', label: 'Helles Licht', desc: 'Süd- oder Westfenster, viel Sonne' },
]

// Hue values per position for new plants
export const PLANT_HUES = [150, 145, 135, 160, 155, 148, 142, 138, 152, 147]
