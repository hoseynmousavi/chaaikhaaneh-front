import planActions from "context/plan/planActions"
import {useState} from "react"

function usePayByPlan() {
	const [isLoading, setIsLoading] = useState(false)

	function payByPlan({months}: {months: number}) {
		setIsLoading(true)
		planActions
			.payByPlan({months})
			.then(({payment_url}) => {
				window.location.href = payment_url
			})
			.catch(() => setIsLoading(false))
	}

	return {isLoading, payByPlan}
}

export default usePayByPlan
