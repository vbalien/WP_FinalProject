const path = require("path");
const esbuild = require("esbuild");
const shell = require("shelljs");

// clean dist
shell.rm("-rf", path.join(__dirname, "../dist/*"));

// copy resources
shell.cp(
  "-R",
  path.join(__dirname, "../public/*"),
  path.join(__dirname, "../dist/")
);

esbuild.buildSync({
  entryPoints: [path.join(__dirname, "../src/main.tsx")],
  bundle: true,
  minify: true,
  sourcemap: true,
  loader: { ".png": "file" },
  inject: [path.join(__dirname, "react-shim.js")],
  jsxFactory: "jsx",
  jsxFragment: "Fragment",
  outdir: path.join(__dirname, "../dist/"),
  define: {
    "process.env.API_BASE_URI": JSON.stringify("/api"),
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
});
