import useGetPaidTransactions from "context/plan/hooks/useGetPaidTransactions"
import getTextConstant from "helpers/general/getTextConstant"
import HomeEmptyState from "views/components/home/HomeEmptyState"
import HomePaymentCard from "views/components/home/HomePaymentCard"
import HomePaymentCardSkeleton from "views/components/home/HomePaymentCardSkeleton"

function HomePaymentsTab() {
	const textConstant = getTextConstant()
	const {data, isLoading} = useGetPaidTransactions()
	return (
		<div className="home-page-tab">
			{data.length
				? data.map(({id, amount, paid_at, payment_type}) => <HomePaymentCard key={id} amount={amount} isGift={payment_type === "extra"} date={paid_at} isPaid />)
				: !isLoading && <HomeEmptyState title={textConstant.paymentsEmpty} />}

			{isLoading && new Array(3).fill(0).map((_, index) => <HomePaymentCardSkeleton key={index} />)}
		</div>
	)
}

export default HomePaymentsTab
