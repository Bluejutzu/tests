import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["./src/**"],
    format: ["esm"],
    bundle: true,
    keepNames: true,
    skipNodeModulesBundle: true,
    outExtension: () => ({ ts: ".ts", dts: ".d.ts" }),
    minify: true,
    clean: true
});
