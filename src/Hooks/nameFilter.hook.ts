import {useMemo} from "react";
import {TaskType} from "../types";

export const useNameFilter = (searchQuery: string, valueObject: TaskType[]) => {
    return useMemo(() => {
        return valueObject.filter(el => el.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [searchQuery, valueObject])
}
