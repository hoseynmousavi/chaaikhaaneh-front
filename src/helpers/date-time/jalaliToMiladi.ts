function jalaliToMiladi({year, month, day}: {year: number; month: number; day: number}) {
	const breaks = [-61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178]

	function d2g(jdn: number) {
		let j: number, i: number, gd: number, gm: number, gy: number
		j = 4 * jdn + 139361631
		j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908
		i = div(mod(j, 1461), 4) * 5 + 308
		gd = div(mod(i, 153), 5) + 1
		gm = mod(div(i, 153), 12) + 1
		gy = div(j, 1461) - 100100 + div(8 - gm, 6)
		return {gy: gy, gm: gm, gd: gd}
	}

	function j2d(jy: number, jm: number, jd: number) {
		const r = jalCal(jy, true)
		return g2d(r.gy, 3, r.march) + (jm - 1) * 31 - div(jm, 7) * (jm - 7) + jd - 1
	}

	function g2d(gy: number, gm: number, gd: number) {
		let d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4) + div(153 * mod(gm + 9, 12) + 2, 5) + gd - 34840408
		d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752
		return d
	}

	function div(a: number, b: number) {
		return ~~(a / b)
	}

	function mod(a: number, b: number) {
		return a - ~~(a / b) * b
	}

	function jalCal(jy: number, withoutLeap: boolean) {
		let bl = breaks.length,
			gy = jy + 621,
			leapJ = -14,
			jp = breaks[0],
			jm: number,
			jump: number,
			leap: number,
			leapG: number,
			march: number,
			n: number,
			i: number

		if (jy < jp || jy >= breaks[bl - 1]) throw new Error(`Invalid Jalaali year ${jy}`)

		// Find the limiting years for the Jalaali year jy.
		for (i = 1; i < bl; i += 1) {
			jm = breaks[i]
			jump = jm - jp
			if (jy < jm) break
			leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4)
			jp = jm
		}
		n = jy - jp

		// Find the number of leap years from AD 621 to the beginning
		// of the current Jalaali year in the Persian calendar.
		leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4)
		// @ts-expect-error
		if (mod(jump, 33) === 4 && jump - n === 4) leapJ += 1

		// And the same in the Gregorian calendar (until the year gy).
		leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150

		// Determine the Gregorian date of Farletdin the 1st.
		march = 20 + leapJ - leapG

		// return with gy and march when we don't need leap
		if (withoutLeap) return {gy: gy, march: march}

		// Find how many years have passed since the last leap year.
		// @ts-expect-error
		if (jump - n < 6) n = n - jump + div(jump + 4, 33) * 33
		leap = mod(mod(n + 1, 33) - 1, 4)
		if (leap === -1) {
			leap = 4
		}

		return {leap: leap, gy: gy, march: march}
	}

	const {gy, gm, gd} = d2g(j2d(year, month, day))
	return {year: gy, month: gm, day: gd}
}

export default jalaliToMiladi
