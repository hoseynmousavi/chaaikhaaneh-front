function getSecondsByTimeFormat(time?: string) {
	if (time) {
		const [hours, minutes, seconds] = time.split(":")
		return +hours * 60 * 60 + +minutes * 60 + +seconds
	} else {
		return 0
	}
}

export default getSecondsByTimeFormat
