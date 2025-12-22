import type {RefObject} from "react"

function modalDisableAnimation({contRef, isDesktop}: {contRef: RefObject<null | HTMLDivElement>; isDesktop: boolean}) {
	if (isDesktop) {
		contRef.current?.animate?.(
			[
				{transform: "translate3d(-50%,-50%,0)"},
				{transform: "translate3d(calc(-50% - 30px),-50%,0)"},
				{transform: "translate3d(calc(-50% + 30px),-50%,0)"},
				{transform: "translate3d(calc(-50% - 15px),-50%,0)"},
				{transform: "translate3d(calc(-50% + 15px),-50%,0)"},
				{transform: "translate3d(calc(-50% - 7.5px),-50%,0)"},
				{transform: "translate3d(calc(-50% + 7.5px),-50%,0)"},
				{transform: "translate3d(calc(-50% - 3px),-50%,0)"},
				{transform: "translate3d(calc(-50% + 3px),-50%,0)"},
				{transform: "translate3d(calc(-50% - 1px),-50%,0)"},
				{transform: "translate3d(calc(-50% + 1px),-50%,0)"},
				{transform: "translate3d(-50%,-50%,0)"},
			],
			{duration: 500, easing: "ease-in"},
		)
	} else {
		contRef.current?.animate?.(
			[
				{transform: "translate3d(0,0,0)"},
				{transform: "translate3d(-30px,0,0)"},
				{transform: "translate3d(30px,0,0)"},
				{transform: "translate3d(-15px,0,0)"},
				{transform: "translate3d(15px,0,0)"},
				{transform: "translate3d(-7.5px,0,0)"},
				{transform: "translate3d(7.5px,0,0)"},
				{transform: "translate3d(-3px,0,0)"},
				{transform: "translate3d(3px,0,0)"},
				{transform: "translate3d(-1px,0,0)"},
				{transform: "translate3d(1px,0,0)"},
				{transform: "translate3d(0,0,0)"},
			],
			{duration: 500, easing: "ease-in"},
		)
	}
}

export default modalDisableAnimation
