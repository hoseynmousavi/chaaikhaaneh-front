import HomePaymentCard from "views/components/home/HomePaymentCard"

function HomeDueTab() {
	return (
		<div className="home-page-tab">
			<HomePaymentCard amount={300000} date={new Date()} />
		</div>
	)
}

export default HomeDueTab
