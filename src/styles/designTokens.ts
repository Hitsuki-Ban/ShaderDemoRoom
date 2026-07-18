export const colorTokenNames = {
  shellBackground: '--bg',
  roomAccent: {
    cyan: '--accent-cyan',
    amber: '--accent-amber',
    magenta: '--accent-magenta',
    mint: '--accent-mint',
  },
} as const;

export const roomAccentTokens = {
  cyan: `var(${colorTokenNames.roomAccent.cyan})`,
  amber: `var(${colorTokenNames.roomAccent.amber})`,
  magenta: `var(${colorTokenNames.roomAccent.magenta})`,
  mint: `var(${colorTokenNames.roomAccent.mint})`,
} as const;

export type RoomAccentToken =
  (typeof roomAccentTokens)[keyof typeof roomAccentTokens];

export function readRequiredRootColorToken(
  tokenName: typeof colorTokenNames.shellBackground,
): string {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(tokenName)
    .trim();

  if (!value) {
    throw new Error(`Required root color token ${tokenName} is not defined.`);
  }

  return value;
}
