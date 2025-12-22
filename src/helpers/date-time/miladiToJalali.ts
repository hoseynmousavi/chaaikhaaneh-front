import getSplitDate from "helpers/date-time/getSplitDate"

function miladiToJalali(gregorianDate: string) {
	const {year: gYear, month: gMonth, day: gDay} = getSplitDate(gregorianDate)

	// Days of the year in Gregorian calendar before the month
	const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]

	// Determine if it's a leap year in the Gregorian calendar
	function isLeapGregorian(year: number) {
		return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
	}

	// Calculate the day number in the Gregorian calendar
	let g_day_no = 365 * (gYear - 1600) + Math.floor((gYear - 1600 + 3) / 4) - Math.floor((gYear - 1600 + 99) / 100) + Math.floor((gYear - 1600 + 399) / 400)
	g_day_no += g_d_m[gMonth - 1] + gDay - 1

	if (gMonth > 2 && isLeapGregorian(gYear)) {
		g_day_no += 1
	}

	// Days passed since 622-03-19 (start of Jalali calendar)
	let j_day_no = g_day_no - 79

	// Jalali year calculation
	const j_np = Math.floor(j_day_no / 12053) // 12053 days in 33 years (32 regular years + 1 leap year)
	j_day_no %= 12053

	let jy = 979 + 33 * j_np + 4 * Math.floor(j_day_no / 1461) // 1461 days in 4 years
	j_day_no %= 1461

	if (j_day_no >= 366) {
		jy += Math.floor((j_day_no - 1) / 365)
		j_day_no = (j_day_no - 1) % 365
	}

	// Determine the month and day
	const j_d_m = [0, 31, 62, 93, 124, 155, 186, 216, 246, 276, 306, 336]
	let jm = 0
	for (let i = 1; i < 13; i++) {
		if (j_day_no < j_d_m[i]) {
			jm = i
			break
		}
	}
	const jd = j_day_no - j_d_m[jm - 1] + 1

	return {year: jy, month: jm, day: jd}
}

export default miladiToJalali
