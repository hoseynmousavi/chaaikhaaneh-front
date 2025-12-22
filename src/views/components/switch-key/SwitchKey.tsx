function SwitchKey({isActive}: {isActive: boolean}) {
	return (
		<div className={`switch-key-btn ${isActive ? "active" : ""}`}>
			<div className={`switch-key-btn-dot ${isActive ? "active" : ""}`} />
		</div>
	)
}

export default SwitchKey
