export type userType = {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    applicationRole: string
}


export type projectType = {
    id: number,
    name: string,
    description: string,
    customer: string
}

export type taskType = {
    id: number,
    name: string,
    description: string,
    estimatedHours: number,
    currentAssignee: userType,
    project: projectType,
    status: string
}

export type allTracksByProjectIdType = {
    id: number,
    task: taskType,
    user: userType,
    startTime: string,
    endTime: string
}

export type allTasksProjectType = {
    id: number,
    name: string,
    description: string,
    estimatedHours: number,
    currentAssignee: userType,
    project: projectType,
    status: string
}

export type authContextType = {
    token: string | null
    userId: number | null,
    lastName:string | null,
    login: (jwtToken: string | null, id: number | null, lastName: string | null) => void,
    logout: () => void,
    isAuthenticated: boolean
}
