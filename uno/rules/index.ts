import { align } from "./align";
import { border } from "./border";
import { color } from "./color";
import { display } from "./display";
import { flex } from "./flex";
import { grid } from "./grid";
import { justify } from "./justify";
import { layout } from "./layout";
import { placement } from "./placement";
import { position } from "./position";
import { textAlign } from "./textAlign";
import { typography } from "./typography";
import { opacity } from "./opacity";
import { cursor } from "./cursor";
import { Rule } from "@unocss/core";

// TODO: Implement border rules

const rules = {
  display,
  typography,
  layout,
  grid,
  color,
  flex,
  textAlign,
  position,
  justify,
  align,
  placement,
  border,
  opacity,
  cursor,
} as Record<string, Rule[]>;

export default rules;
