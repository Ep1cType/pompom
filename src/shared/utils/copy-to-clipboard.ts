export const copyToClipboard = (text: string) => {
	if (navigator.clipboard) {
		navigator.clipboard.writeText(text)
			.then(() => alert("Скопировано"))
			.catch(() => alert("Скопируйте, пожалуйста, в ручную"))
	}
}