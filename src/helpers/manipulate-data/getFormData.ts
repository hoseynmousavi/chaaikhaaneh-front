function getFormData({data}: {data: Object}) {
	const formData = new FormData()
	Object.entries(data)
		.filter(([key, value]) => !!key && !!value)
		.forEach(([key, value]) => {
			if (Array.isArray(value)) {
				value.forEach((element, index) => {
					formData.append(`${key}[${index}]`, element)
				})
			} else if (typeof value === "string" || (typeof value === "object" && value instanceof File)) {
				formData.append(key, value)
			}
		})
	return formData
}

export default getFormData
