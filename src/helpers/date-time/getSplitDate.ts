function getSplitDate(date: string) {
	const splitChar = date.includes("-") ? "-" : "/"
	const [year, month = 1, day = 1] = date.split(splitChar)
	return {year: +year, month: +month, day: +day}
}

export default getSplitDate
