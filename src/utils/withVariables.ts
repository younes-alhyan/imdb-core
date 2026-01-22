import type { Operation } from "../types/internal.js";

export function withVariables(op: Operation, ...args: any[]): Operation {
  let variablesObj: Record<string, any> = {};

  if (typeof op.variables === "function") {
    // call the function with arguments
    variablesObj = op.variables(...args);
  } else if (typeof op.variables === "object") {
    // already an object
    variablesObj = op.variables;
  }

  return {
    ...op,
    variables: variablesObj, // now always an object
  };
}
