export const existingEventColors = [
  '#CDDDDD',
  '#F2F6D0',
  '#ACBDBA',
  '#F2D0D0',
  '#F2D0F2',
  '#D0D0F2',
];

export const newEventColor = '#19BBFF';

let usedColors: Record<string, Set<string>> = {};
let eventTypeAndNameToColor: Record<string, Record<string, string>> = {};

export function getColorForEvent(entryType: 'zoom' | 'google-calendar', entry: string): string {
  if (!eventTypeAndNameToColor[entryType]) {
    eventTypeAndNameToColor[entryType] = {};
  }

  if (eventTypeAndNameToColor[entryType][entry]) {
    return eventTypeAndNameToColor[entryType][entry];
  }

  if (!usedColors[entryType]) {
    usedColors[entryType] = new Set();
  }

  for (const color of existingEventColors) {
    if (!usedColors[entryType].has(color)) {
      usedColors[entryType].add(color);
      eventTypeAndNameToColor[entryType][entry] = color;
      return color;
    }
  }

  return "#333333"; // Fallback color
}