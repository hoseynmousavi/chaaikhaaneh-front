import getTextConstant from "helpers/general/getTextConstant"
import useEffectJustChanges from "hooks/general/useEffectJustChanges"
import {type Dispatch, type SetStateAction, useEffect, useState} from "react"
import Button from "views/components/button/Button"
import Loader from "views/components/loading/Loader"

interface Props {
	isLoading: boolean
	timeInSeconds: number
	getCode: () => void
	submitLoading: boolean
	setCodeIsExpired: Dispatch<SetStateAction<boolean>>
}

function OTPBtn({isLoading, timeInSeconds, getCode, submitLoading, setCodeIsExpired}: Props) {
	const textConstant = getTextConstant()
	const [remain, setRemain] = useState(timeInSeconds)
	const disableGetCode = remain !== 0

	function fixFormat(seconds: number) {
		return `${Math.floor(seconds / 60)
			.toString()
			.padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`
	}

	useEffectJustChanges(() => {
		setCodeIsExpired(remain === 0)
	}, [remain])

	useEffect(() => {
		setRemain(timeInSeconds)
		let timer: ReturnType<typeof setInterval>
		if (!isLoading) {
			const start = new Date()
			timer = setInterval(() => {
				const remainSeconds = Math.floor(timeInSeconds + (+start - Date.now()) / 1000)
				if (remainSeconds >= 0) {
					setRemain(remainSeconds)
				} else if (remainSeconds < 0) {
					setRemain(0)
					clearInterval(timer)
				}
			}, 900)
		}

		return () => clearInterval(timer)
	}, [isLoading])

	return (
		<Button className={`otp-btn ${disableGetCode ? "disabled" : ""}`} isDisable={disableGetCode} isLoading={isLoading} onClick={getCode}>
			<div
				className={`otp-btn-progress ${submitLoading ? "submit-loading" : ""}`}
				style={isLoading ? {} : {transition: `all linear ${timeInSeconds}s`, animation: `progress linear ${timeInSeconds}s`}}
			/>
			<div className="otp-btn-text">
				{submitLoading ? <Loader color="var(--on-primary-color)" width={20} /> : remain !== 0 ? textConstant.otpTimerBtn(fixFormat(remain)) : textConstant.otpTimerSend}
			</div>
		</Button>
	)
}

export default OTPBtn
