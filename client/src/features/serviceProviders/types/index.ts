import { Dispatch, SetStateAction } from "react"

export interface FilterProviderProps {
    setSelectedGroups: Dispatch<SetStateAction<string[]>>
    selectedGroups: string[]
}