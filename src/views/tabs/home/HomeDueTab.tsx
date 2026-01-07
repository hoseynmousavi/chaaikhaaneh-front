import useGetPlan from "context/plan/hooks/useGetPlan"
import getTextConstant from "helpers/general/getTextConstant"
import HomeEmptyState from "views/components/home/HomeEmptyState"
import HomePaymentCardSkeleton from "views/components/home/HomePaymentCardSkeleton"
import HomeSelectPayment from "views/components/home/HomeSelectPayment"

const mock = [
	{id: 3, amount: 100000, data: new Date("2026/01/21"), isOverdue: false},
	{id: 2, amount: 100000, data: new Date("2025/12/22"), isOverdue: true},
]

function HomeDueTab() {
	const textConstant = getTextConstant()
	const {data, isLoading} = useGetPlan()
	const {amount} = data || {}
	return (
		<div className="home-page-tab">
			{isLoading ? (
				new Array(3).fill(0).map((_, index) => <HomePaymentCardSkeleton key={index} />)
			) : amount ? (
				<HomeSelectPayment items={mock} />
			) : (
				<HomeEmptyState title={textConstant.dueEmpty} btn={{text: textConstant.payGift, onClick: () => undefined}} />
			)}
		</div>
	)
}

export default HomeDueTab
