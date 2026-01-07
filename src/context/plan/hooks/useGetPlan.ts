import planActions from "context/plan/planActions"
import {planContext} from "context/plan/planProvider"
import useGetData from "hooks/request/useGetData"
import {use} from "react"

function useGetPlan() {
	const {
		planState: {plan: data},
		planDispatch,
	} = use(planContext)
	const isLoading = !data

	const {cancelToken} = useGetData({getData, isLoading})

	function getData() {
		return planActions.getPlan({planDispatch, cancelToken})
	}

	return {data, isLoading}
}

export default useGetPlan
