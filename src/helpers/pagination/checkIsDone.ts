function checkIsDone({page, pageSize, count}: {page: number | undefined; pageSize: number; count: number | undefined}) {
	return {getDone: typeof count === "number" && typeof page === "number" && page * pageSize >= count}
}

export default checkIsDone
