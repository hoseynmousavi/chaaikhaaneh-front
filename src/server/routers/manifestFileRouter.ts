import {DOMAIN_URL, O_AUTH_SERVER_URL} from "constant/routing/SERVER_URL"
import {APP_NAME_FA} from "constant/text/APP_NAME_FA"
import DEFAULT_HEAD_META_CONTENT from "constant/text/DEFAULT_HEAD_META_CONTENT"
import type {Express} from "express"
import type {ExpressResponseType} from "types/ExpressResponseType"

function manifestFileRouter(app: Express) {
	app.route("/manifest.json").get((_, res: ExpressResponseType) => {
		res.send({
			short_name: APP_NAME_FA,
			name: APP_NAME_FA,
			icons: [
				{purpose: "maskable", src: `icon_maskable_128.png?version=${process.env.REACT_APP_VERSION}`, sizes: "128x128", type: "image/png"},
				{purpose: "maskable", src: `icon_maskable_192.png?version=${process.env.REACT_APP_VERSION}`, sizes: "192x192", type: "image/png"},
				{purpose: "maskable", src: `icon_maskable_512.png?version=${process.env.REACT_APP_VERSION}`, sizes: "512x512", type: "image/png"},
				{src: `icon_512.png?version=${process.env.REACT_APP_VERSION}`, sizes: "512x512", type: "image/png"},
				{src: `icon_192.png?version=${process.env.REACT_APP_VERSION}`, sizes: "192x192", type: "image/png"},
				{src: `icon_180.png?version=${process.env.REACT_APP_VERSION}`, sizes: "180x180", type: "image/png"},
				{src: `icon_128.png?version=${process.env.REACT_APP_VERSION}`, sizes: "128x128", type: "image/png"},
			],
			start_url: "/",
			id: `/?version=${process.env.REACT_APP_VERSION}`,
			display: "standalone",
			theme_color: DEFAULT_HEAD_META_CONTENT.themeColor,
			background_color: DEFAULT_HEAD_META_CONTENT.backgroundColor,
			orientation: "portrait-primary",
			dir: "rtl",
			lang: "fa",
			description: DEFAULT_HEAD_META_CONTENT.description,
			prefer_related_applications: false,
			handle_links: "preferred",
			scope_extensions: [
				{type: "origin", origin: DOMAIN_URL},
				{type: "origin", origin: O_AUTH_SERVER_URL},
			],
			launch_handler: {client_mode: ["navigate-existing", "auto"]},
			display_override: ["standalone", "window-controls-overlay"],
			categories: ["entertainment"],
		})
	})
}

export default manifestFileRouter
