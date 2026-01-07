import getTextConstant from "helpers/general/getTextConstant"
import {useState} from "react"
import Button from "views/components/button/Button"
import HomePaymentCard from "views/components/home/HomePaymentCard"

interface Props {
	items: Array<{id: number; amount: number; data: Date; isOverdue: boolean}>
}

function HomeSelectPayment({items}: Props) {
	const textConstant = getTextConstant()
	const [selectedForPay, setSelectedForPay] = useState<number[]>(items.map(i => i.id))
	const isPayDisable = selectedForPay.length === 0

	function toggleSelect(id: number) {
		return () => {
			setSelectedForPay(selectedForPay.includes(id) ? selectedForPay.filter(i => i !== id) : [...selectedForPay, id])
		}
	}

	return (
		<>
			{items.map(item => (
				<HomePaymentCard
					key={item.id}
					amount={item.amount}
					date={item.data}
					isOverdue={item.isOverdue}
					isPaid={false}
					isSelectedForPay={selectedForPay.includes(item.id)}
					onClick={toggleSelect(item.id)}
				/>
			))}
			<div className="home-page-pay">
				<Button mobileIsFullWidth isDisable={isPayDisable}>
					{textConstant.pay}
				</Button>
			</div>
		</>
	)
}

export default HomeSelectPayment
