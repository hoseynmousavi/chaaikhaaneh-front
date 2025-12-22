import getComputedStyleHelper from "helpers/theme/getComputedStyleHelper"

function getCssVariableInNumber({variable, unit = "px"}: {variable: string; unit?: string}) {
	return +getComputedStyleHelper(variable).replace(unit, "")
}

export default getCssVariableInNumber
