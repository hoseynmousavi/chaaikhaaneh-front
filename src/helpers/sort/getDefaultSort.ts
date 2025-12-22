import parseQueryString from "helpers/query-param/parseQueryString"

function getDefaultSort({list, query}: {list: Array<string>; query?: string}) {
	const {sort} = parseQueryString({query})
	if (sort && typeof sort === "string" && list.indexOf(sort) !== -1) return sort
	else return list[0]
}

export default getDefaultSort
