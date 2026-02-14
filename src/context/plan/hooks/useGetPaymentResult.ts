import type {TransactionType} from "context/plan/PlanType"
import planActions from "context/plan/planActions"
import useGetData from "hooks/request/useGetData"
import {useState} from "react"

function useGetPaymentResult({track_id}: {track_id: string}) {
	const [data, setData] = useState<TransactionType | null>(null)
	const isLoading = !data

	const {cancelToken} = useGetData({getData, isLoading})

	function getData() {
		return planActions.getPaymentResult({track_id, cancelToken}).then(res => setData(res))
	}

	return {data, isLoading}
}

export default useGetPaymentResult
