import getSplitDate from "helpers/date-time/getSplitDate"

function miladiToMiladi(gregorianDate: string) {
	const {year, month, day} = getSplitDate(gregorianDate)
	return {year, month, day}
}

export default miladiToMiladi
