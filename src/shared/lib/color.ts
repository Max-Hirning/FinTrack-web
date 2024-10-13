export function hexToRgba(hex: string, opacity: number): string {
  // Remove the hash (#) if present
  hex = hex.replace(/^#/, '');

  // Parse r, g, b values from the hex string
  let r: number, g: number, b: number;

  if (hex.length === 3) {
    // For shorthand hex codes like #03F
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    // For full hex codes like #0033FF
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  } else {
    throw new Error('Invalid hex color');
  }

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
