import TomanSvg from "media/svg/TomanSvg"

function HomePaymentCardSkeleton() {
	return (
		<div className="home-payment-card">
			<div className="home-payment-card-first">
				<div className="home-payment-card-first-tick skeleton" />
				<div className="home-payment-card-first-title skeleton">
					<pre>{"               "}</pre>
				</div>
			</div>
			<div className="home-payment-card-second">
				<div className="home-payment-card-second-title skeleton">
					<pre>{"             "}</pre>
				</div>
				<TomanSvg className="home-payment-card-second-icon" />
			</div>
		</div>
	)
}

export default HomePaymentCardSkeleton
