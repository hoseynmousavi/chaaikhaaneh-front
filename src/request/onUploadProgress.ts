import type {AxiosProgressEvent} from "axios"

function onUploadProgress({progress}: {progress?: (percent: number) => void}) {
	return (p: AxiosProgressEvent) => progress?.(Math.floor((p.loaded * 99) / (p.total || 1)))
}

export default onUploadProgress
