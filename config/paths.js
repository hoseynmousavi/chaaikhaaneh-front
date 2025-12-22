const path = require("node:path")
const fs = require("node:fs")

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /ok/42.
// We can't use a relative path in HTML because we don't want to load something
// like /ok/42/static/js/bundle.7289d.js. We have to know the root.
const publicUrlOrPath = `${process.env.PUBLIC_URL || ""}/`

const moduleFileExtensions = ["web.mjs", "mjs", "web.js", "js", "web.ts", "ts", "web.tsx", "tsx", "json", "web.jsx", "jsx"]

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
	const extension = moduleFileExtensions.find(extension => fs.existsSync(resolveFn(`${filePath}.${extension}`)))

	if (extension) {
		return resolveFn(`${filePath}.${extension}`)
	}

	return resolveFn(`${filePath}.js`)
}

// config after eject: we're in ./config/
module.exports = {
	dotenv: resolveApp(".env"),
	appPath: resolveApp("."),
	appBuild: resolveApp("build"),
	appBuildDev: resolveApp("build-dev"),
	appPublic: resolveApp("public"),
	appIndexJs: resolveModule(resolveApp, "src/index"),
	appPackageJson: resolveApp("package.json"),
	appSrc: resolveApp("src"),
	appTsConfig: resolveApp("tsconfig.json"),
	testsSetup: resolveModule(resolveApp, "src/setupTests"),
	appNodeModules: resolveApp("node_modules"),
	appWebpackCache: resolveApp("node_modules/.cache"),
	appTsBuildInfoFile: resolveApp("node_modules/.cache/tsconfig.tsbuildinfo"),
	swSrc: resolveModule(resolveApp, "src/service-worker"),
	publicUrlOrPath,
	serverDir: resolveApp("src/server"),
}

module.exports.moduleFileExtensions = moduleFileExtensions
