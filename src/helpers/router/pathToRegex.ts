function pathToRegex({path, exact = false}: {path: string; exact?: boolean}) {
	return new RegExp(path === "*" ? ".*" : `^${path.replace(/:\w+/g, "(.+)")}${exact ? `(\\/?)$` : ""}`)
}

export default pathToRegex
