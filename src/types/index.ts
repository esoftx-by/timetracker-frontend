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
    currentAssignee: Array<userType>,
    project: Array<projectType>,
    status: string
}

export type allTracksByProjectIdType = {
    id: number,
    task: Array<taskType>,
    user: Array<userType>,
    startTime: string,
    endTime: string
}

export type allTasksProjectType = {
    id: number,
    name: string,
    description: string,
    estimatedHours: number,
    currentAssignee: Array<userType>,
    project: Array<projectType>,
    status: string
}
