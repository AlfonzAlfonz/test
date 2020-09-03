import path from "path";
import { promises as fs } from "fs";
import R from "ramda";

export const contentPath = (...p: string[]) => path.join(process.cwd(), "content", ...p);

export const directoryFiles = (p: string) =>
  fs.readdir(p, { withFileTypes: true })
    .then(dir => Promise.all(dir
      .filter(f => !f.isDirectory() && f.name !== ".config.json")
      .map(f => f.name)));
