function getSendPage(page: number | undefined) {
	return typeof page === "number" ? page : 1
}

export default getSendPage
