export const WEATHER_ICONS = {
  sunny: '☀️',
  cloudy: '☁️',
  partlyCloudy: '🌤️',
  rainy: '🌧️',
  snowy: '❄️',
  stormy: '⛈️',
  foggy: '🌫️',
  windy: '💨',
} as const;

export const OUTFIT_ICONS = {
  // Tops
  tshirt: '👕',
  shirt: '👔',
  sweater: '👚',
  hoodie: '🧥',
  
  // Bottoms
  jeans: '👖',
  shorts: '🩳',
  skirt: '👗',
  
  // Outerwear
  jacket: '🧥',
  coat: '🧥',
  cardigan: '🧥',
  
  // Footwear
  sneakers: '👟',
  boots: '🥾',
  sandals: '👡',
  heels: '👠',
  
  // Accessories
  sunglasses: '🕶️',
  hat: '👒',
  umbrella: '☂️',
  scarf: '🧣',
  gloves: '🧤',
  bag: '👜',
} as const;

export const TEMPERATURE_RANGES = {
  VERY_COLD: { min: -Infinity, max: 5 },
  COLD: { min: 5, max: 15 },
  COOL: { min: 15, max: 20 },
  COMFORTABLE: { min: 20, max: 25 },
  WARM: { min: 25, max: 30 },
  HOT: { min: 30, max: Infinity },
} as const;

export const OUTFIT_RECOMMENDATIONS = {
  VERY_COLD: [
    { category: 'outerwear', item: 'ダウンコート', icon: OUTFIT_ICONS.coat },
    { category: 'tops', item: 'セーター', icon: OUTFIT_ICONS.sweater },
    { category: 'accessories', item: '手袋', icon: OUTFIT_ICONS.gloves },
    { category: 'accessories', item: 'マフラー', icon: OUTFIT_ICONS.scarf },
  ],
  COLD: [
    { category: 'outerwear', item: 'ジャケット', icon: OUTFIT_ICONS.jacket },
    { category: 'tops', item: '長袖シャツ', icon: OUTFIT_ICONS.shirt },
    { category: 'bottoms', item: 'ロングパンツ', icon: OUTFIT_ICONS.jeans },
  ],
  COOL: [
    { category: 'outerwear', item: 'カーディガン', icon: OUTFIT_ICONS.cardigan },
    { category: 'tops', item: '長袖シャツ', icon: OUTFIT_ICONS.shirt },
    { category: 'bottoms', item: 'チノパン', icon: OUTFIT_ICONS.jeans },
  ],
  COMFORTABLE: [
    { category: 'tops', item: '半袖シャツ', icon: OUTFIT_ICONS.tshirt },
    { category: 'bottoms', item: 'デニム', icon: OUTFIT_ICONS.jeans },
    { category: 'footwear', item: 'スニーカー', icon: OUTFIT_ICONS.sneakers },
  ],
  WARM: [
    { category: 'tops', item: 'Tシャツ', icon: OUTFIT_ICONS.tshirt },
    { category: 'bottoms', item: 'ショートパンツ', icon: OUTFIT_ICONS.shorts },
    { category: 'accessories', item: 'サングラス', icon: OUTFIT_ICONS.sunglasses },
  ],
  HOT: [
    { category: 'tops', item: 'タンクトップ', icon: OUTFIT_ICONS.tshirt },
    { category: 'bottoms', item: 'ショートパンツ', icon: OUTFIT_ICONS.shorts },
    { category: 'footwear', item: 'サンダル', icon: OUTFIT_ICONS.sandals },
    { category: 'accessories', item: '帽子', icon: OUTFIT_ICONS.hat },
  ],
} as const;