import planActions from "context/plan/planActions"
import {planContext} from "context/plan/planProvider"
import checkIsDone from "helpers/pagination/checkIsDone"
import getSendPage from "helpers/pagination/getSendPage"
import useGetPaginatedData from "hooks/request/useGetPaginatedData"
import {use} from "react"

function useGetPaidTransactions() {
	const {
		planState: {
			paidTransactions: {list: data, count, page},
		},
		planDispatch,
	} = use(planContext)
	const pageSize = 10
	const {getDone} = checkIsDone({page, pageSize, count})

	const {cancelToken, isLoading} = useGetPaginatedData({getData, getDone, offset: page})

	function getData() {
		return planActions.getPaidTransactions({page: getSendPage(page), pageSize, planDispatch, cancelToken})
	}

	return {data, isLoading}
}

export default useGetPaidTransactions
