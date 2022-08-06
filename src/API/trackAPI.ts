import {AllTracks, instance, Track} from "./api";

export default class TracksAPI {
    static newTrack(userId: number, taskId: number, startTime: string, hours: number) {
        return instance.post<Track>('tracks', {userId, taskId, startTime, hours})
            .then(response => {
                return response
            })
    }

    static setAllTracks() {
        return instance.get<AllTracks>('tracks')
            .then(response => {
                return response
            })
    }

    static setAllTracksByUserId(userId: number) {
        return instance.get<AllTracks>(`tracks/user/${userId}`)
            .then(response => {
                return response
            })
    }

    static setTracksByTaskId(taskId: number) {
        return instance.get<AllTracks>(`tracks/task/${taskId}`)
            .then(response => {
                return response
            })
    }

    static setAllTracksByProjectId(projectId: number) {
        return instance.get<AllTracks>(`tracks/project/${projectId}`)
            .then(response => {
                return response
            })
    }

    static deleteTrack(id: number) {
        return instance.delete(`tracks/${id}`)
    }

    static updateTrack(id: number, startTime: string, endTime: string) {
        return instance.patch('tracks', null, {
            params: {
                id: id,
                startTime: startTime,
                endTime: endTime
            }
        })
            .then(response => {
                return response
            })
    }
}
