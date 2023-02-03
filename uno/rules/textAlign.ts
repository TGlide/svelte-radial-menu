import type { Rule } from "@unocss/core";
import { globalKeywords } from "../constants";

export const textAlign: Rule[] = [
  "center",
  "left",
  "right",
  "justify",
  "start",
  "end",
  ...globalKeywords,
].map((v) => [`text-${v}`, { "text-align": v }]);
