import type { Rule } from "@unocss/core";
import pollen from "../pollen";

export const grid: Rule[] = [
  // displays
  ["grid", { display: "grid" }],
  ["inline-grid", { display: "inline-grid" }],
  // Grid Template
  ...Object.keys(pollen.grid).reduce<Rule[]>((acc, key) => {
    if (Number.isNaN(Number(key))) return acc;
    return [
      ...acc,
      [
        `grid-cols-${key}`,
        { "grid-template-columns": `repeat(${key}, minmax(0, 1fr))` },
      ],
      [
        `grid-rows-${key}`,
        { "grid-template-rows": `repeat(${key}, minmax(0, 1fr))` },
      ],
    ];
  }, []),
  // Grid Page
  ["grid-page", { "grid-template-columns": "var(--grid-page)" }],
  ["grid-page-main", { "grid-column": "var(--grid-page-main)" }],
];
