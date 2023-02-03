import type { Rule } from "@unocss/core";

export const cursor: Rule[] = [
  [/cursor-([a-z-]+)/, ([, v]) => ({ cursor: v })],
];
