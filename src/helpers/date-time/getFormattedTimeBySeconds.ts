function getFormattedTimeBySeconds(timeInSeconds: number) {
	let duration = new Date(timeInSeconds * 1000).toISOString().slice(11, 19)
	if (duration.slice(0, 2) === "00") duration = duration.slice(3, 8)
	return duration
}

export default getFormattedTimeBySeconds
