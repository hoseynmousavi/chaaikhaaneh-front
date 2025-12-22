function createMockRedis() {
	const data: {[key: string]: string | undefined} = {}
	return {
		set: (key: string, value: string): Promise<void> =>
			new Promise(resolve => {
				data[key] = value
				resolve()
			}),
		get: (key: string): Promise<string | null> =>
			new Promise(resolve => {
				resolve(data[key] || null)
			}),
		del: (key: string): Promise<void> =>
			new Promise(resolve => {
				delete data[key]
				resolve()
			}),
	}
}

export default createMockRedis
