function checkIsDone({offset, count}: {offset: number | undefined; count: number | undefined}) {
	return {getDone: typeof count === "number" && typeof offset === "number" && offset >= count}
}

export default checkIsDone
