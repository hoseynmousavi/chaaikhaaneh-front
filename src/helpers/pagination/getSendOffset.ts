function getSendOffset(offset: number | undefined) {
	return typeof offset === "number" ? offset : 0
}

export default getSendOffset
