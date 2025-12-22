import EXTERNAL_ROUTES from "constant/routing/EXTERNAL_ROUTES"
import {clientsClaim} from "workbox-core"
import {ExpirationPlugin} from "workbox-expiration"
import {createHandlerBoundToURL, precacheAndRoute} from "workbox-precaching"
import {Route, registerRoute} from "workbox-routing"
import {CacheFirst, NetworkFirst, NetworkOnly} from "workbox-strategies"

clientsClaim()

const fileExtensionRegexp = /\/[^/?]+\.[^/]+$/

registerRoute(new Route(({sameOrigin, url}) => sameOrigin && EXTERNAL_ROUTES.some(item => url.pathname.startsWith(item)), new NetworkOnly()))

registerRoute(new Route(({request, sameOrigin}) => sameOrigin && request.destination === "document", new NetworkFirst({cacheName: "documents", plugins: [new ExpirationPlugin({maxEntries: 200})]})))

precacheAndRoute(self.__WB_MANIFEST)

registerRoute(({request, url}) => {
	if (request.mode !== "navigate") return false
	else if (url.pathname.startsWith("/_")) return false
	else return !url.pathname.match(fileExtensionRegexp)
}, createHandlerBoundToURL("/index.html"))

registerRoute(
	new Route(({request, url}) => request.destination === "image" && url.pathname.endsWith("tooltip.png"), new CacheFirst({cacheName: "tooltips", plugins: [new ExpirationPlugin({maxEntries: 4})]})),
)

registerRoute(new Route(({request}) => request.destination === "image", new CacheFirst({cacheName: "images", plugins: [new ExpirationPlugin({maxEntries: 400})]})))

registerRoute(new Route(({request}) => request.destination === "font", new CacheFirst({cacheName: "fonts", plugins: [new ExpirationPlugin({maxEntries: 5})]})))

self.addEventListener("message", event => {
	if (event.data && event.data.type === "SKIP_WAITING" && "skipWaiting" in self && typeof self.skipWaiting === "function") {
		self.skipWaiting()
	}
})

self.addEventListener("install", () => {
	if ("skipWaiting" in self && typeof self.skipWaiting === "function") {
		self.skipWaiting()
	}
})
