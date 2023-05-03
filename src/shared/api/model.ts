import { ImageFormatList, PaginationDataResponse } from 'shared/api/types';

export const paginationInitialData: PaginationDataResponse = {
	page: 0,
	pageCount: 0,
	pageSize: 0,
	total: 0
}

export const checkImageFormat = (formats: ImageFormatList) => {
	const keys = Object.keys(formats);

	if (keys.includes("large")) return "large"
	if (keys.includes("medium")) return "medium"
	if (keys.includes("small")) return "small"
	else return "thumbnail"
}