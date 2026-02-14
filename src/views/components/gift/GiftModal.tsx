import IMAGES from "constant/images/IMAGES"
import usePayGift from "context/plan/hooks/usePayGift"
import getTextConstant from "helpers/general/getTextConstant"
import TomanSvg from "media/svg/TomanSvg"
import {useState} from "react"
import type {InputChangeOutputType} from "types/InputType"
import Button from "views/components/button/Button"
import Image from "views/components/image/Image"
import Input from "views/components/input/Input"
import Modal from "views/components/modal/Modal"

interface Props {
	close: () => void
}

function GiftModal({close}: Props) {
	const textConstant = getTextConstant()
	const [amount, setAmount] = useState(0)
	const {payByPlan, isLoading} = usePayGift()
	const isSubmitDisable = !amount

	function onChange({value}: InputChangeOutputType) {
		setAmount(value ? +value : 0)
	}

	function submit() {
		payByPlan({amount})
	}

	return (
		<Modal className="gift-modal" close={close}>
			<Image className="gift-modal-img" src={IMAGES.payment.heart} resize={{size: null, aspectRatio: null}} />
			<div className="gift-modal-title">{textConstant.payGift}</div>
			<Input
				className="gift-modal-input"
				isDisable={isLoading}
				placeholder={textConstant.payGiftHolder}
				onSubmit={submit}
				disableSubmit={isSubmitDisable}
				name="gift"
				onChange={onChange}
				validation="number"
				minLength={5000}
				EndIcon={TomanSvg}
				ltr
				type="search"
				inputMode="tel"
				enterKeyHint="enter"
			/>
			<Button mobileIsFullWidth isLoading={isLoading} isDisable={isSubmitDisable} onClick={submit}>
				{textConstant.pay}
			</Button>
		</Modal>
	)
}

export default GiftModal
