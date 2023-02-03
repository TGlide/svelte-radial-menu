import type { Preset, Rule } from "@unocss/core";
import rules from "./rules";

export const presetPollen = (): Preset => ({
  name: "uno-pollen",
  rules: [
    ...Object.values(rules).reduce<Rule[]>((acc, curr) => {
      acc.push(...curr);
      return acc;
    }, []),
  ] as any,
  variants: [
    // hover:
    (matcher) => {
      if (!matcher.startsWith("hover:")) return matcher;
      return {
        // slice `hover:` prefix and passed to the next variants and rules
        matcher: matcher.slice(6),
        selector: (s) => `${s}:hover`,
      };
    },
  ],
});
