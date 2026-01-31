import fs from "fs";

export function parseCookie(path: string): string {
  const lines = fs
    .readFileSync(path, "utf-8")
    .split("\n")
    .filter((line) => line && !line.startsWith("#"));

  const cookies: string[] = lines.map((line) => {
    const parts = line.split("\t");
    const key = parts[5];
    const value = parts[6];
    return `${key}=${value}`;
  });

  return cookies.join("; ");
}
