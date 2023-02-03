import type { Rule } from "@unocss/core";
import { cornerMap, directionMap, globalKeywords } from "./constants";

export function makeGlobalStaticRules(prefix: string, property?: string) {
  return globalKeywords.map(
    (keyword) =>
      [`${prefix}-${keyword}`, { [property ?? prefix]: keyword }] as Rule
  );
}

function createRulesFn(map: Record<string, string[]>) {
  return function createRules(
    classFormat: (corner: string) => string,
    propFormat: (corner: string) => string,
    value: string
  ): Rule[] {
    return Object.entries(map).reduce<Rule[]>((acc, [classKey, propKeys]) => {
      const valueMap = Object.fromEntries(
        propKeys.map((k) => [propFormat(k), value])
      );

      return [...acc, [`${classFormat(classKey)}`, valueMap]];
    }, []);
  };
}

export const createDirectionRules = createRulesFn(directionMap);
export const createCornerRules = createRulesFn(cornerMap);
