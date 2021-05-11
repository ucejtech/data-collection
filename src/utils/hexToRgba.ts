export function hexToRgba(hex: string, a = 0.15): string {
    const result = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    return result
      ? `rgba(${parseInt(result[1], 16)}, ${parseInt(
          result[2],
          16
        )}, ${parseInt(result[3], 16)}, ${a})`
      : `rgba(0, 0, 0, ${a})`;
  }