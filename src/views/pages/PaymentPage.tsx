import IMAGES from "constant/images/IMAGES"
import URLS from "constant/routing/URLS"
import useGetPaymentResult from "context/plan/hooks/useGetPaymentResult"
import getTextConstant from "helpers/general/getTextConstant"
import showNumber from "helpers/input/showNumber"
import parseQueryString from "helpers/query-param/parseQueryString"
import TomanSvg from "media/svg/TomanSvg"
import Button from "views/components/button/Button"
import Image from "views/components/image/Image"
import LoadingWrapper from "views/components/loading/LoadingWrapper"

function PaymentPage() {
	const textConstant = getTextConstant()
	const {track_id} = parseQueryString()
	const {data, isLoading} = useGetPaymentResult({track_id: track_id as string})
	const {amount, status} = data || {}
	const isSuccess = status === "paid"
	const imgSrc = isSuccess ? IMAGES.payment.success : IMAGES.payment.fail
	const title = isSuccess ? textConstant.paySuccess : textConstant.payFail
	const desc = isSuccess ? textConstant.paySuccessDesc : textConstant.payFailDesc

	if (isLoading) return <LoadingWrapper />
	return (
		<div className="payment">
			<Image className="payment-pic" src={imgSrc} resize={{size: null, aspectRatio: null}} />
			<div className="payment-price">
				<div>{showNumber(amount)}</div>
				<TomanSvg className="payment-price-icon" />
			</div>
			<div className="payment-title">{title}</div>
			<div className="payment-desc">{desc}</div>
			{/*{!isSuccess && (*/}
			{/*	<Button mobileSize="medium" mobileType="on-surface-first" mobileIsRounded mobileIsFullWidth className="payment-pay">*/}
			{/*		{textConstant.paymentAgain}*/}
			{/*	</Button>*/}
			{/*)}*/}
			<Button
				mobileSize="medium"
				mobileType="surface-second-on-surface-first"
				mobileIsRounded
				mobileIsFullWidth
				link={{to: URLS.mainContainer.routes.home.routes.homeNotPaid, replace: true}}
			>
				{textConstant.paymentBack}
			</Button>
		</div>
	)
}

export default PaymentPage
