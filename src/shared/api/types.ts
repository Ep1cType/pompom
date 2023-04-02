export interface MetaDataResponse {
	pagination: PaginationDataResponse;
}

export interface PaginationDataResponse {
	page: number;
	pageCount: number;
	pageSize: number;
	total: number;
}

export interface ResponseDataItem<T> {
	id: number;
	attributes: T;
}

export interface ApiCollectionResponse<Y> {
	data: ResponseDataItem<Y>[];
	meta: MetaDataResponse;
}

export interface ApiSingleResponse<Y> {
	data: ResponseDataItem<Y>;
	meta: {}
}

export interface CreateBody<T> {
	data: T
}