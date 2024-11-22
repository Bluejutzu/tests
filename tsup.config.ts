import { defineConfig } from "tsup";
import * as glob from "glob";
import * as path from "path";

const entries = Object.fromEntries(
    glob.sync("src/**/*.ts").map(entry => [
        // Simplifying key, no need for slice if we use a direct relative path
        path.relative("src", entry.slice(0, entry.lastIndexOf("."))),
        path.posix.normalize(entry)
    ])
);

export default defineConfig({
    entry: entries,
    format: ["esm", "cjs"],
    target: "es2020",
    dts: true,
    clean: true,
    splitting: false,
    treeshake: false,
    minify: true,
    minifySyntax: true,
    outDir: "dist"
});
