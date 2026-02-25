import {memo} from "react"
import type {MaterialLinkType} from "types/MaterialLinkType"
import useMaterialLink from "views/components/material/useMaterialLink"

function MaterialLink(props: MaterialLinkType) {
	const {
		children,
		isDiv,
		isLabel,
		rippleColor,
		className = "",
		style,
		onClick,
		onDisableClick,
		isDisable,
		disableRipple,
		ariaLabel,
		link,
		ref,
		onMouseEnter,
		onMouseLeave,
	} = props

	const {to, target} = link || {}
	const Tag = isLabel ? "label" : isDiv ? "div" : to ? "a" : "button"
	const {propRef, _onClick} = useMaterialLink({onClick, rippleColor, isDisable, disableRipple, onDisableClick, ref, link})
	return (
		<Tag
			aria-label={isDiv ? undefined : ariaLabel}
			// @ts-expect-error - ok
			ref={propRef}
			style={style}
			className={`material ${className}`}
			disabled={isDisable}
			onClick={_onClick}
			href={to}
			target={target}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			{children}
		</Tag>
	)
}

export default memo(MaterialLink)
