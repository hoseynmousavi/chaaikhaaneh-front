import type {RefObject} from "react"

export type SubdomainType = "oAuth" | "default"

interface RequestType {
	url: string
	params?: Record<string, string | number | null | Array<string>>
	cancelToken?: RefObject<AbortController | null>
	dontToast?: boolean
	subdomain?: SubdomainType
	priority?: "low" | "high"
}

export interface RequestGetType extends RequestType {
	ignoreRedis?: boolean
}

export interface RequestDelType extends RequestType {}

export interface RequestPostType extends RequestType {
	data: object
}

export interface RequestPatchType extends RequestType {
	data: object
}

export interface RequestUploadAxiosType extends RequestType {
	method: "post" | "patch"
	data: object
	progress?: (progress: number) => void
}

export interface RequestServerErrorType {
	status: number
	data: {message?: string; error?: string; status?: string; detail?: string}
}

export interface RequestErrorType extends RequestServerErrorType {
	callback: (value: any) => any
}

export interface getByNetworkProps {
	reqUrl: string
	dontToast?: boolean
	cancelToken?: RefObject<AbortController | null>
	priority?: "low" | "high"
}
