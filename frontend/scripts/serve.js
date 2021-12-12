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

esbuild
  .serve(
    {
      port: 10014,
      servedir: path.join(__dirname, "../dist/"),
    },
    {
      entryPoints: [path.join(__dirname, "../src/main.tsx")],
      bundle: true,
      minify: true,
      sourcemap: true,
      target: ["chrome58", "firefox57", "safari11", "edge16"],
      inject: [path.join(__dirname, "react-shim.js")],
      jsxFactory: "jsx",
      jsxFragment: "Fragment",
      outdir: path.join(__dirname, "../dist/js/"),
      define: {
        API_BASE_URI: JSON.stringify("http://localhost:8014/api/"),
        "process.env.NODE_ENV": JSON.stringify("development"),
      },
    }
  )
  .then((server) => {
    console.log(`Dev server started on http://localhost:${server.port}`);
  });
