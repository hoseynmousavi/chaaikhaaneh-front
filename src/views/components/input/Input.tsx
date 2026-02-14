import REGEX from "constant/general/REGEX"
import {INPUT_MIN_ERROR, INPUT_VALIDATION_ERROR} from "constant/input/INPUT_VALIDATION_ERROR"
import focusOnInput from "helpers/input/focusOnInput"
import numberCorrection from "helpers/input/numberCorrection"
import numToPersian from "helpers/input/numToPersian"
import onInputKeyDown from "helpers/input/onInputKeyDown"
import getIsMobile from "helpers/theme/getIsMobile"
import CircleDangerSvg from "media/svg/CircleDangerSvg"
import CircleFillCloseSvg from "media/svg/CircleFillCloseSvg"
import {type MouseEvent, type ReactNode, useEffect, useImperativeHandle, useRef, useState} from "react"
import type {InputChangeInputType, InputType} from "types/InputType"
import AutoHeight from "views/components/auto-height/AutoHeight"
import ShowValidation from "views/components/input/ShowValidation"
import MaterialLink from "views/components/material/MaterialLink"

function Input(props: InputType) {
	const {
		className = "",
		name,
		label,
		Icon,
		EndIcon,
		EndIconClassName = "",
		onEndIconClick,
		showClear,
		validation,
		ltr,
		ltrFont,
		ref,
		defaultValue,
		parentError,
		parentSuccess,
		onClick,
		onChange,
		focusOnMountDesktop,
		onSubmit,
		onSubmitDisable,
		disableSubmit,
		type = "text",
		inputMode,
		enterKeyHint,
		isDisable,
		minLength,
		maxLength,
		placeholder = " ",
		autoComplete = "off",
		autoCapitalize = "off",
		onBlur,
		onFocus,
		dontShowError,
		size = "large",
		isAutoDir,
		isArea,
		areaMinHeight,
		areaMaxHeight,
	} = props
	const inputRef = useRef<HTMLInputElement>(null)
	const errorTimer = useRef<ReturnType<typeof setTimeout>>(null)
	const [error, setError] = useState<string | ReactNode>("")
	const [value, setValue] = useState<string>(defaultValue || "")
	const showError = parentError || error
	const showSuccess = parentSuccess

	useImperativeHandle(
		ref,
		() => ({
			onChange: ({value}: {value: string}) => onInputChange({target: {value}, isCalledByParent: true}),
			focus: () => focusOnInput(inputRef),
			blur: () => inputRef.current?.blur?.(),
		}),
		[],
	)

	useEffect(() => {
		const isMobile = getIsMobile()
		if (focusOnMountDesktop && !isMobile) {
			setTimeout(() => focusOnInput(inputRef), 400)
		}

		return () => {
			if (errorTimer.current) {
				clearTimeout(errorTimer.current)
			}
		}
	}, [])

	useEffect(() => {
		if (isArea && areaMaxHeight && areaMinHeight && inputRef.current) {
			inputRef.current.style.height = `${areaMinHeight}px`
			inputRef.current.style.height = `${Math.max(areaMinHeight, Math.min(inputRef.current.scrollHeight, areaMaxHeight))}px`
		}
	}, [value])

	function getAcceptableValue(value: string) {
		switch (validation) {
			case "number": {
				const acceptableValue = numberCorrection(value.replace(/ /g, "").replace(/\./g, ""))
				return {acceptableValue, canContinue: !Number.isNaN(+acceptableValue)}
			}
			case "phone": {
				const acceptableValue = numberCorrection(value.replace(/ /g, "").replace(/\./g, "")).slice(0, 11)
				return {acceptableValue, canContinue: !Number.isNaN(+acceptableValue)}
			}
			case "username":
			case "url":
			case "email": {
				const acceptableValue = numberCorrection(value.replace(/ /g, "")).toLowerCase()
				return {acceptableValue, canContinue: true}
			}
			default: {
				const acceptableValue = numberCorrection(maxLength ? value.slice(0, maxLength) : value)
				return {acceptableValue, canContinue: true}
			}
		}
	}

	function getValidatedValue(value: string) {
		switch (validation) {
			case "number": {
				return !minLength || +value >= minLength ? value : ""
			}
			case "phone": {
				const phone = value.startsWith("0") ? value : `0${value}`
				return REGEX.PHONE_REGEX.test(phone) ? phone : ""
			}
			case "username": {
				return value
			}
			case "url": {
				return REGEX.URL_REGEX.test(value) ? (value.startsWith("http") ? value : `https://${value}`) : ""
			}
			case "email": {
				return REGEX.EMAIL_REGEX.test(value) ? value : ""
			}
			default: {
				const trimmedValue = value.trim()
				return !minLength || trimmedValue.length >= minLength ? trimmedValue : ""
			}
		}
	}

	function checkError() {
		if (!dontShowError) {
			if (errorTimer.current) clearTimeout(errorTimer.current)
			const value = inputRef.current?.value
			if (value) {
				const checkedValue = getValidatedValue(value)
				if (!checkedValue && !!value.length) {
					setError(validation ? INPUT_VALIDATION_ERROR[validation] : minLength ? INPUT_MIN_ERROR(minLength) : "")
				}
			}
		}
	}

	function onInputChange({target: {value}, isCalledByParent}: InputChangeInputType) {
		const {acceptableValue, canContinue} = getAcceptableValue(value)
		if (canContinue) {
			setError("")
			setValue(acceptableValue)
			const checkedValue = getValidatedValue(acceptableValue)
			const hasError = !checkedValue && !!acceptableValue.length
			onChange({
				name,
				value: checkedValue,
				isCalledByParent: !!isCalledByParent,
				hasError,
				errorValue: hasError ? acceptableValue : "",
			})

			if (errorTimer.current) clearTimeout(errorTimer.current)
			errorTimer.current = setTimeout(checkError, 1500)
		}
	}

	function _onBlur() {
		onBlur?.()
		checkError()
	}

	function onEndElClick(e: MouseEvent) {
		e.preventDefault()
		e.stopPropagation()
		if (showClearEl) {
			onInputChange({target: {value: ""}})
			focusOnInput(inputRef)
		} else {
			onEndIconClick?.()
		}
	}

	const showClearEl = !!showClear && !!value
	const showEndIcon = !!EndIcon
	const showEndEl = showClearEl || showEndIcon
	const Tag = isArea ? "textarea" : "input"
	return (
		<>
			{/** biome-ignore lint/a11y/noLabelWithoutControl: <ok> */}
			<label className={`input-label input-${size} ${isDisable ? "disabled" : ""} ${ltr ? "ltr" : ""} ${ltrFont ? "ltr-font" : ""} ${className}`}>
				<MaterialLink isDiv className={`input-label-end ${showEndEl ? "" : "hide"}`} onClick={onEndElClick}>
					{showEndIcon ? <EndIcon className={`input-label-end-icon ${EndIconClassName}`} /> : <CircleFillCloseSvg className="input-label-end-icon" />}
				</MaterialLink>
				<Tag
					className={`input-field hide-scroll ${!label ? "empty-label" : ""} ${showSuccess ? "success" : ""} ${showError ? "error" : ""} ${Icon ? "have-icon" : ""} ${showEndEl ? "have-end-el" : ""}`}
					name={name}
					style={{minHeight: areaMinHeight}}
					placeholder={placeholder}
					value={value}
					onChange={onInputChange}
					onBlur={_onBlur}
					// @ts-expect-error
					onFocus={onFocus}
					// @ts-expect-error
					ref={inputRef}
					// @ts-expect-error
					onClick={onClick}
					onKeyDown={onInputKeyDown({onSubmit, onSubmitDisable, checkError, disableSubmit})}
					type={type}
					inputMode={inputMode}
					enterKeyHint={enterKeyHint}
					disabled={isDisable}
					autoComplete={autoComplete}
					autoCapitalize={autoCapitalize}
					dir={isAutoDir && !!value.trim().length ? "auto" : undefined}
				/>
				<div className="input-icons">
					{Icon && <Icon className={`input-label-icon ${showSuccess ? "success" : ""} ${showError ? "error" : ""}`} />}
					{label && (
						<div className={`input-label-title ${showSuccess ? "success" : ""} ${showError ? "error" : ""} ${Icon && !ltr ? "have-icon" : ""}`}>
							<div className="input-label-title-inner">{label}</div>
						</div>
					)}
				</div>
				{validation === "number" && (
					<AutoHeight className="input-field-number">
						{!!+value && (
							<>
								{numToPersian(value)}
								{" تومان"}
							</>
						)}
					</AutoHeight>
				)}
				<ShowValidation isError={true} text={showError} Icon={CircleDangerSvg} />
				<ShowValidation isError={false} text={showSuccess} />
			</label>
		</>
	)
}

export default Input
