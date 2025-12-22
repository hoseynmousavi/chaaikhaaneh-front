import crypto from "node:crypto"
import {PurgeCSS} from "purgecss"
import purgeHtml from "purgecss-from-html"

function getCriticalCss({renderedBody, mainCSS}: {renderedBody: string; mainCSS?: string}) {
	if (mainCSS && global.redisClient) {
		const cssMD5 = crypto.createHash("md5").update(mainCSS).digest("hex")
		const renderedBodyMD5 = crypto.createHash("md5").update(renderedBody).digest("hex")
		const redisCssKey = `${renderedBodyMD5}-${cssMD5}`
		return global.redisClient
			.get(redisCssKey)
			.then(css => {
				if (css) {
					return css
				} else {
					return computeCriticalCss({renderedBody, mainCSS, redisCssKey})
				}
			})
			.catch(err => {
				console.error("redis get error: ", err)
				return computeCriticalCss({renderedBody, mainCSS, redisCssKey})
			})
	} else {
		return new Promise<null>(resolve => resolve(null))
	}
}

function computeCriticalCss({renderedBody, mainCSS, redisCssKey}: {renderedBody: string; mainCSS: string; redisCssKey: string}) {
	return new PurgeCSS()
		.purge({
			content: [{raw: renderedBody, extension: "html"}],
			css: [{raw: mainCSS}],
			extractors: [{extractor: purgeHtml, extensions: ["html"]}],
			safelist: [/loading-wrapper/],
			keyframes: true,
			fontFace: true,
			variables: true,
		})
		.then(([{css}]) => {
			if (global.redisClient) {
				global.redisClient
					.set(
						redisCssKey,
						css,
						{EX: 5184000}, // 60 days in seconds
					)
					.catch(err => console.error("write to redis failed: ", err))
			}

			return css
		})
}

export default getCriticalCss
