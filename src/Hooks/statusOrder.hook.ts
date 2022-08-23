import {AllTasksProjectType, TaskType} from "../types";
import {useMemo} from "react";

export const useStatusOrderSort = (objSort: any) => {
    const STATUS_ORDER = {
        LONG_TERM: 0,
        OPEN: 1,
        IN_PROGRESS: 2,
        IN_TESTING: 3,
        IN_REVIEW: 4,
        FINISHED: 5,
        CANCELLED: 6
    }
    // @ts-ignore
    const comparator = (t1: AllTasksProjectType, t2: AllTasksProjectType): number => STATUS_ORDER[t1.status] - STATUS_ORDER[t2.status];
    return [...objSort]
        .sort(comparator)
}

export const usePinnedSorted = (useStatusOrderSort: any) => {
    return useMemo(() => {
        return [...useStatusOrderSort].sort((t1: AllTasksProjectType, t2: AllTasksProjectType) => +t2.pinned - +t1.pinned)
    }, [useStatusOrderSort])

}

export const useTaskUserIdFilter = (projectName: string, allTasksUserId: TaskType[]) => {
    return useMemo(() => {
        return [...allTasksUserId]
            .sort((a, b) => a.project.name.localeCompare(b.project.name))
    }, [projectName, allTasksUserId])
}
