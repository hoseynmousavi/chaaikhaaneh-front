import planActions from "context/plan/planActions"
import {useState} from "react"

function usePayGift() {
	const [isLoading, setIsLoading] = useState(false)

	function payByPlan({amount}: {amount: number}) {
		setIsLoading(true)
		planActions
			.payGift({amount})
			.then(({payment_url}) => {
				window.location.href = payment_url
			})
			.catch(() => setIsLoading(false))
	}

	return {isLoading, payByPlan}
}

export default usePayGift
