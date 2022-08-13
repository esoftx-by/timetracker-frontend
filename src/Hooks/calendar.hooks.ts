import {useMemo} from "react";
import {AllTracksByProjectIdType, ProjectType} from "../types";

export const UseSortedTracks = (allTracks: AllTracksByProjectIdType[], allTracksByUserId: AllTracksByProjectIdType[], applicationRole: string, projectName: string) => {
    return useMemo(() => {
        if (applicationRole === 'ADMIN' && allTracks) {
            return allTracks.filter((el) => projectName === '' ? el : el.task.project.name === projectName)
        }
        return allTracksByUserId.filter((el) => projectName === '' ? el : el.task.project.name === projectName)
    }, [allTracks, allTracksByUserId])
}

export const useProjectSorted = (allProjects: ProjectType[], allProjectsByUser: ProjectType[], applicationRole: string) => {
    return useMemo(() => {
        if (applicationRole === 'ADMIN') {
            // @ts-ignore
            return [...new Set(allProjects.map(hs => hs.name))]
        }
        // @ts-ignore
        return [...new Set(allProjectsByUser.map(hs => hs.name))]
    }, [allProjects, allProjectsByUser])
}
