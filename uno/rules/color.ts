import type { Rule } from "@unocss/core";
import pollen from "../pollen";

export const color: Rule[] = [
  ...Object.keys(pollen.color).reduce<Rule[]>((acc, key) => {
    return [
      ...acc,
      [`bg-${key}`, { "background-color": `var(--color-${key})` }],
      [`color-${key}`, { color: `var(--color-${key})` }],
    ];
  }, []),
];
