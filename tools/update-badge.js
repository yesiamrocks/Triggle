import { execSync } from "child_process";
import fs from "fs";
import stripAnsi from "strip-ansi";
import path from "path";

// --- Get package size from npm pack ---
const output = stripAnsi(execSync("npm pack --dry-run").toString());
const lines = output.split(/\r?\n/);

const sizeLine = lines.find((line) => /package size:/i.test(line));

let packageSize = "";
if (sizeLine) {
  const match = sizeLine.match(/package size:\s*([0-9.]+\s*[kKmMbB]+)/);
  if (match) {
    packageSize = match[1].trim();
  }
}

const packageSizeBadge = packageSize
  ? `![npm package size](https://img.shields.io/badge/npm%20size-${encodeURIComponent(
      packageSize
    )}-blue?style=for-the-badge)`
  : null;

// --- Get minified JS file size ---
const filePath = path.resolve("./dist/triggle.min.js");
let fileSizeBadge = "";

if (fs.existsSync(filePath)) {
  const bytes = fs.statSync(filePath).size;
  const sizeKB = (bytes / 1024).toFixed(1);
  fileSizeBadge = `![minified size](https://img.shields.io/badge/minified--js-${encodeURIComponent(
    sizeKB + " kB"
  )}-blue?style=for-the-badge)`;
} else {
  console.error("❌ dist/triggle.min.js not found");
}

// --- Update README ---
const readmePath = "./README.md";
let readme = fs.readFileSync(readmePath, "utf-8");

// Replace or append both badges
const pkgBadgeRegex =
  /!\[npm package size\]\(https:\/\/img\.shields\.io\/badge\/npm%20size-[^)]*style=for-the-badge\)/;
const fileBadgeRegex =
  /!\[minified size\]\(https:\/\/img\.shields\.io\/badge\/minified--js-[^)]*style=for-the-badge\)/;

if (packageSizeBadge) {
  if (pkgBadgeRegex.test(readme)) {
    readme = readme.replace(pkgBadgeRegex, packageSizeBadge);
  } else {
    readme += `\n\n${packageSizeBadge}`;
  }
}

if (fileSizeBadge) {
  if (fileBadgeRegex.test(readme)) {
    readme = readme.replace(fileBadgeRegex, fileSizeBadge);
  } else {
    readme += `\n${fileSizeBadge}`;
  }
}

fs.writeFileSync(readmePath, readme, "utf-8");
console.log("✅ Badges updated in README.md");
