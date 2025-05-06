interface GetUserEndpointType {
    type: string,
    category?: string,
    search?: string,
    availability?: string,
    location?: string,
    page?: number,
    limit?: number
}

export const getUsersEndpoint = (params: GetUserEndpointType) => {
    const filterParams = Object.fromEntries(Object.entries(params).filter(([_, value]) => value !== undefined));
    const newParams = new URLSearchParams(filterParams);
    return `/api/user?${newParams}`
}