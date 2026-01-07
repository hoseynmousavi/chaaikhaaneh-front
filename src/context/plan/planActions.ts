import API_URLS from "constant/routing/API_URLS"
import type {GetPlanActionType, PlanType} from "context/plan/PlanType"
import type {Dispatch, RefObject} from "react"
import request from "request/request"

function getPlan({planDispatch, cancelToken}: {planDispatch?: Dispatch<GetPlanActionType>; cancelToken?: RefObject<AbortController | null>}) {
	return request.get({url: API_URLS.plan, cancelToken}).then((res: PlanType) => {
		const action: GetPlanActionType = {type: "GET_PLAN", payload: {res}}
		if (planDispatch) {
			planDispatch(action)
		}
		return action
	})
}

const planActions = {getPlan}

export default planActions
