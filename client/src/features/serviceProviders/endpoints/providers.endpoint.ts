interface GetUserEndpointType {
    type: string,
    category?: string,
    search?: string

}

export const getUsersEndpoint = ({ type, category, search }: GetUserEndpointType) => {
    const queryParams = new URLSearchParams({ type });
    console.log(category)
    if (category !== undefined) {
        queryParams.append('category', category);
    }

    if (search !== undefined) {
        queryParams.append('search', search);
    }

    console.log(queryParams)

    return `/api/user?${queryParams}`
}