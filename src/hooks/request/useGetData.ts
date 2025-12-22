import {useEffect, useRef, useState} from "react"

interface UseGetDataProps {
	getData: () => Promise<any> | undefined
	isLoading: boolean
	dependencies?: Array<any>
}

function useGetData(props: UseGetDataProps) {
	const {getData, isLoading, dependencies} = props
	const [notFound, setNotFound] = useState(false)
	const cancelToken = useRef<AbortController>(null)

	useEffect(() => {
		if (isLoading) {
			getData()?.catch?.(err => {
				setNotFound(err?.status === 404)
			})

			return () => {
				cancelToken?.current?.abort?.("CANCEL")
			}
		}
	}, [...(dependencies || []), isLoading])

	return {notFound, cancelToken}
}

export default useGetData
