export function hexToRgba(hex: string, alpha: number): string {
  // Remove the hash character if it exists
  hex = hex.replace(/^#/, "");

  // Parse the hex values to separate R, G, B components
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  // Validate alpha value and default to 1 if not provided
  alpha = (alpha !== undefined) ? Math.min(1, Math.max(0, alpha)) : 1;

  // Create and return the RGBA string
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}