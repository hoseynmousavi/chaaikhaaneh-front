import {MODAL_DONT_GESTURE} from "constant/modal/MODAL_DONT_GESTURE"
import ZoomInSvg from "media/svg/ZoomInSvg"
import ZoomOutSvg from "media/svg/ZoomOutSvg"
import type {ChangeEvent} from "react"
import Button from "views/components/button/Button"

interface CropZoomSliderProps {
	value: number
	disabled?: boolean
	onChange: (value: number) => void
	min: number
	max: number
}

function CropZoomSlider({value, disabled, onChange, min, max}: CropZoomSliderProps) {
	function onSliderChange(e: ChangeEvent<HTMLInputElement>) {
		onChange(+e.currentTarget.value)
	}

	function zoomIn() {
		onChange(Math.min(value + 0.1, max))
	}

	function zoomOut() {
		onChange(Math.max(value - 0.1, min))
	}

	return (
		<div className={`crop-zoom-slider ${MODAL_DONT_GESTURE}`}>
			<Button desktopSize="large" desktopIsSquare desktopType="ghost-on-surface-first" escapeStart escapeBlock onClick={zoomIn}>
				<ZoomOutSvg />
			</Button>
			<div className="crop-zoom-slider-input">
				<input disabled={disabled} type="range" min={min} max={max} step="0.1" className="crop-zoom-slider-input-main" value={value} onChange={onSliderChange} />
				<div className="crop-zoom-slider-progress" style={{width: `${((value - min) / (max - min)) * 100}%`}} />
			</div>
			<Button desktopSize="large" desktopIsSquare desktopType="ghost-on-surface-first" escapeEnd escapeBlock onClick={zoomOut}>
				<ZoomInSvg />
			</Button>
		</div>
	)
}

export default CropZoomSlider
