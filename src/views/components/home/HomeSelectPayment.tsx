import usePayByPlan from "context/plan/hooks/usePayByPlan"
import getTextConstant from "helpers/general/getTextConstant"
import {useState} from "react"
import Button from "views/components/button/Button"
import HomePaymentCard from "views/components/home/HomePaymentCard"

interface Props {
	items: Array<{amount: number; date: Date; isOverdue: boolean}>
}

function HomeSelectPayment({items}: Props) {
	const textConstant = getTextConstant()
	const [selectedForPay, setSelectedForPay] = useState<number[]>(items.map((_, index) => index))
	const isPayDisable = selectedForPay.length === 0
	const {payByPlan, isLoading: payLoading} = usePayByPlan()

	function pay() {
		payByPlan({months: selectedForPay.length})
	}

	function toggleSelect(index: number) {
		return () => {
			if (!payLoading) {
				setSelectedForPay(selectedForPay.includes(index) ? selectedForPay.filter(i => i !== index) : [...selectedForPay, index])
			}
		}
	}

	return (
		<>
			{items.map((item, index) => (
				<HomePaymentCard key={index} amount={item.amount} date={item.date} isOverdue={item.isOverdue} isPaid={false} isSelectedForPay={selectedForPay.includes(index)} onClick={toggleSelect(index)} />
			))}
			<div className="home-page-pay">
				<Button mobileIsFullWidth isDisable={isPayDisable} isLoading={payLoading} onClick={pay}>
					{textConstant.pay}
				</Button>
			</div>
		</>
	)
}

export default HomeSelectPayment
