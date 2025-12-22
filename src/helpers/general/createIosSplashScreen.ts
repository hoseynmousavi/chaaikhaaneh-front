function createIosSplashScreen({icon, backgroundColor}: {icon: string; backgroundColor: string}) {
	const i = window.screen.width,
		a = window.screen.height,
		h = window.devicePixelRatio || 1,
		n = document.createElement("canvas"),
		l = document.createElement("canvas"),
		r = n.getContext("2d"),
		d = l.getContext("2d"),
		o = new Image()
	o.src = icon
	if (r && d) {
		o.onload = () => {
			const t = o.width / (3 / h),
				g = o.height / (3 / h)
			n.width = l.height = i * h
			n.height = l.width = a * h
			r.fillStyle = backgroundColor
			d.fillStyle = backgroundColor
			r.fillRect(0, 0, n.width, n.height)
			d.fillRect(0, 0, l.width, l.height)
			const c = (n.width - t) / 2,
				p = (n.height - g) / 2,
				s = (l.width - t) / 2,
				w = (l.height - g) / 2
			r.drawImage(o, c, p, t, g)
			d.drawImage(o, s, w, t, g)
			const m = n.toDataURL("image/png"),
				u = l.toDataURL("image/png"),
				f = document.createElement("link")
			f.setAttribute("rel", "apple-touch-startup-image")
			f.setAttribute("media", "screen and (orientation: portrait)")
			f.setAttribute("href", m)
			document.head.appendChild(f)
			const A = document.createElement("link")
			A.setAttribute("rel", "apple-touch-startup-image")
			A.setAttribute("media", "screen and (orientation: landscape)")
			A.setAttribute("href", u)
			document.head.appendChild(A)
		}
	}
}

export default createIosSplashScreen
