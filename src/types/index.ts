export type UserType = {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    applicationRole: string
}


export type ProjectType = {
    id: number,
    name: string,
    description: string,
    customer: string
}

export type TaskType = {
    id: number,
    name: string,
    description: string,
    estimatedHours: number,
    currentAssignee: UserType,
    project: ProjectType,
    status: string
}

export type AllTracksByProjectIdType = {
    id: number,
    task: TaskType,
    user: UserType,
    startTime: string,
    endTime: string
}

export type AllTasksProjectType = {
    id: number,
    name: string,
    description: string,
    estimatedHours: number,
    currentAssignee: UserType,
    project: ProjectType,
    status: string
}

export type AuthContextType = {
    token: string | null
    userId: number | null,
    lastName:string | null,
    login: (jwtToken: string | null, id: number | null, lastName: string | null) => void,
    logout: () => void,
    isAuthenticated: boolean
}


export type Events = {
    id: number
    title: string
    start: number
    end: number
    url: string
    backgroundColor: string
}
