import useGetPlan from "context/plan/hooks/useGetPlan"
import getTextConstant from "helpers/general/getTextConstant"
import HomeEmptyState from "views/components/home/HomeEmptyState"
import HomePaymentCard from "views/components/home/HomePaymentCard"
import HomePaymentCardSkeleton from "views/components/home/HomePaymentCardSkeleton"

const mock = [
	{
		id: 1,
		amount: 100000,
		data: new Date("2025/11/22"),
	},
]

function HomePaymentsTab() {
	const textConstant = getTextConstant()
	const {data, isLoading} = useGetPlan()
	const {amount} = data || {}
	return (
		<div className="home-page-tab">
			{isLoading ? (
				new Array(3).fill(0).map((_, index) => <HomePaymentCardSkeleton key={index} />)
			) : amount ? (
				mock.map(item => <HomePaymentCard key={item.id} amount={item.amount} date={item.data} isPaid />)
			) : (
				<HomeEmptyState title={textConstant.paymentsEmpty} />
			)}
		</div>
	)
}

export default HomePaymentsTab
