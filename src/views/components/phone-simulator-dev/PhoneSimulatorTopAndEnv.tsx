import EarthSvg from "media/svg/EarthSvg"

function PhoneSimulatorTopAndEnv() {
	return (
		<div className="dev-simulate">
			<div
				style={{
					height: "var(--top-env-padding)",
					position: "fixed",
					top: "0",
					insetInline: "0",
					zIndex: "10",
					padding: "0 16px",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					viewTransitionName: "simulate-top",
				}}
			>
				<div style={{height: "80%", width: "42%", borderRadius: "0 0 12px 12px", backgroundColor: "black", position: "absolute", left: "50%", top: "0", transform: "translateX(-50%)"}} />
				<EarthSvg style={{fill: "white", width: "20px", backgroundColor: "black", borderRadius: "50%"}} />
				<EarthSvg style={{fill: "white", width: "20px", backgroundColor: "black", borderRadius: "50%"}} />
			</div>

			<div
				style={{
					height: "5px",
					width: "130px",
					backgroundColor: "rgba(255,255,255,0.8)",
					border: "1px solid var(--on-surface-third)",
					borderRadius: "4px",
					position: "fixed",
					left: "50%",
					bottom: "8px",
					transform: "translateX(-50%)",
					zIndex: "10",
					pointerEvents: "none",
					viewTransitionName: "simulate-bottom",
				}}
			/>
		</div>
	)
}

export default PhoneSimulatorTopAndEnv
