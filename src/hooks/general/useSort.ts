import useScreen from "context/screen/hooks/useScreen"
import createQueryString from "helpers/query-param/createQueryString"
import getFullUrl from "helpers/router/getFullUrl"
import router from "helpers/router/router"
import getDefaultSort from "helpers/sort/getDefaultSort"
import useEffectJustChanges from "hooks/general/useEffectJustChanges"
import {useState} from "react"

function useSort({list}: {list: Array<string>}) {
	const [sort, setSort] = useState(() => getDefaultSort({list}))
	const {modalStackCount} = useScreen()
	const isAnyModalOpen = modalStackCount > 0

	useEffectJustChanges(() => {
		setSort(getDefaultSort({list}))
	}, [list])

	useEffectJustChanges(() => {
		if (!isAnyModalOpen) {
			router.replaceState({url: getFullUrl().pathUrl + createQueryString({params: {sort: sort === list[0] ? null : sort}}), data: "for-history"})
		}
	}, [sort, isAnyModalOpen])

	return {sort, setSort}
}

export default useSort
