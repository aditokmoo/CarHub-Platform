interface GetUserEndpointType {
    type: string,
    category: string
}

export const getUsersEndpoint = ({ type, category }: GetUserEndpointType) => {
    const queryParams = new URLSearchParams({ type });
    console.log(category)
    if (category !== '') {
        queryParams.append('category', category);
    }

    console.log(queryParams)

    return `/api/user?${queryParams}`
}