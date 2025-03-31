import { Dispatch, SetStateAction } from "react"

export interface FilterProviderProps {
    setSelectedCategory: Dispatch<SetStateAction<string>>
    selectedCategory: string
}