import focusOnInput from "helpers/input/focusOnInput"
import numberCorrection from "helpers/input/numberCorrection"
import {type ReactNode, type RefObject, useImperativeHandle, useRef, useState} from "react"

interface Props {
	onChange: (value: string, reset: () => void) => void
	isDisable: boolean
	error: boolean
	ref: RefObject<OTPInputImperativeRef>
	numberOfDigits?: number
	children: ReactNode
}

export interface OTPInputImperativeRef {
	onChange?: ({value}: {value: string}) => void
	blur?: () => void
	focus?: () => void
}

function OTPInput({onChange, isDisable, error, ref, numberOfDigits = 5, children}: Props) {
	const [value, setValue] = useState("")
	const inputRef = useRef<HTMLInputElement>(null)

	useImperativeHandle(ref, () => ({onChange: ({value}: {value: string}) => onInputChange({target: {value}}), focus: () => focusOnInput(inputRef), blur: () => inputRef.current?.blur?.()}), [])

	function resetInput() {
		onInputChange({target: {value: ""}})
	}

	function onInputChange({target: {value: eventValue}}: {target: {value: string}}) {
		const inputValue = numberCorrection(eventValue.replace(/ /g, "").replace(/\./g, ""))
		if (inputValue.length <= numberOfDigits && !Number.isNaN(+inputValue)) {
			setValue(inputValue)
			setTimeout(() => {
				if (inputValue.length === numberOfDigits) onChange(inputValue, resetInput)
				else onChange("", resetInput)
			}, 50)
		}
	}

	return (
		<div className="otp-input">
			<input
				id="otp"
				name="code"
				className="otp-input-field"
				ref={inputRef}
				disabled={isDisable}
				maxLength={numberOfDigits}
				type="text"
				inputMode="numeric"
				value={value}
				onChange={onInputChange}
				autoComplete="one-time-code"
				autoFocus
			/>
			<div className={`otp-input-box ${error ? "error" : ""}`}>
				{Array(numberOfDigits)
					.fill(0)
					.map((_, index) => (
						<div key={index} className={`otp-input-box-item ${isDisable ? "disabled" : ""} ${error ? "error" : ""} ${value[index] ? "fill" : value.length === index ? "ready" : ""}`}>
							{value[index]}
						</div>
					))}
			</div>
			{children}
		</div>
	)
}

export default OTPInput
