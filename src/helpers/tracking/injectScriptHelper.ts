function injectScriptInline(stringScript: string) {
	const script = document.createElement("script")
	script.type = "text/javascript"
	script.innerHTML = stringScript
	document.head.appendChild(script)
}

const injectScriptHelper = {injectScriptInline}

export default injectScriptHelper
