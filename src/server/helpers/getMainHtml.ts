import SCREEN_CONSTANT from "constant/general/SCREEN_CONSTANT"
import {CDN_URL, SERVER_URL} from "constant/routing/SERVER_URL"
import DEFAULT_HEAD_META_CONTENT from "constant/text/DEFAULT_HEAD_META_CONTENT"
import getHeadMetaParams from "helpers/router/getHeadMetaParams"
import type {ImagePreloadType, ImageSrcType} from "types/ImageType"

interface Props {
	cssLink: string
	jsLink: string
	inlineCss?: string | null
	metaTitle?: string
	metaDescription?: string
	metaImage?: string
	metaPreloadImgs?: Array<{src: ImageSrcType; preload: ImagePreloadType}>
}

function getMainHtml({cssLink, jsLink, inlineCss, metaTitle, metaDescription, metaImage, metaPreloadImgs}: Props) {
	const isDev = process.env.NODE_ENV === "development"
	const {notEscapedTitle, title, description, image} = getHeadMetaParams({title: metaTitle, description: metaDescription, image: metaImage})
	return `
    <!DOCTYPE html>
    <html dir="rtl" lang="fa-IR">
        <head>
            <link rel="manifest" href="/manifest.json?version=${process.env.REACT_APP_VERSION}"/>
            <link rel="shortcut icon" href="/favicon.ico?version=${process.env.REACT_APP_VERSION}"/>
            <link rel="preconnect" href="${CDN_URL}" crossorigin/>
            <link rel="preconnect" href="${SERVER_URL}" crossorigin/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover, user-scalable=0"/>
            <meta name="mobile-web-app-capable" content="yes"/>
            <meta name="apple-mobile-web-app-capable" content="yes"/>
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
            <meta name="theme-color" content="${DEFAULT_HEAD_META_CONTENT.themeColor}"/>
            <meta name="google" content="notranslate"/>
            <meta charset="utf-8"/>
            <title>${notEscapedTitle}</title>
            <meta name="description" content="${description}"/>
            <meta property="og:title" content="${title}"/>
            <meta property="og:description" content="${description}"/>
            <meta property="og:image" content="${image}"/>
            <meta name="twitter:title" content="${title}"/>
            <meta name="twitter:description" content="${description}"/>
            <meta name="twitter:image" content="${image}"/>
            <meta name="twitter:card" content="summary_large_image"/>
            <script src="${jsLink}" defer fetchpriority="high"></script>
            ${(metaPreloadImgs || [])
							.map(
								({src, preload}: {src: ImageSrcType; preload: ImagePreloadType}) =>
									`<link rel="preload" as="image" href="${src}" fetchpriority="high" crossorigin ${preload === "mobile" ? `media="${SCREEN_CONSTANT.mobileMedia}"` : preload === "desktop" ? `media="${SCREEN_CONSTANT.desktopMedia}"` : ""}/>`,
							)
							.join("")}
            <link rel="preload" href="/media/fonts/font.woff2" as="font" type="font/woff2" crossorigin fetchpriority="high"/>
            <style>
                @font-face {
                    font-family: my-font;
                    src: url("/media/fonts/font.woff2") format("woff2-variations");
                    font-display: swap;
                }
            </style>
            ${inlineCss ? `<style id="inline-css">${inlineCss}</style>` : `<link href="${cssLink}" rel="stylesheet" fetchpriority="high"/>`}
              <script>
                const isLoggedIn = localStorage.getItem("user");
                if (isLoggedIn) document.documentElement.style.display = "none";
            </script>
        </head>
        <body${isDev ? ` class="dev"` : ""}>
            <div id="root"></div>
            <div id="svg-container" style="display:none"></div>
            ${inlineCss ? `<link rel="preload" href="${cssLink}" as="style" fetchpriority="low" onload="this.onload=null;this.rel='stylesheet';document.getElementById('inline-css')&&document.getElementById('inline-css').remove()">` : ""}
        </body>
    </html>
`.replace(/\r?\n|\r|\s{2,}/g, "")
}

export default getMainHtml
