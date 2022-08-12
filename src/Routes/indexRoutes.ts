import {MainPage} from "../pages/mainPage";
import LoginForm from "../components/LoginForm";
import {Projects} from "../pages/projects/projects";
import {ProjectContainer} from "../pages/project";
import {TaskPage} from "../pages/taskPage";
import SettingsPage from "../pages/settingsPage";
import NotFoundPage from "../pages/notFoundPage";
import CalendarPage from "../pages/calendarPage";


export const privateRoutes = [
    {path: '/home', element: MainPage},
    {path: '/projects', element: Projects},
    {path: '/projects/:id', element: ProjectContainer},
    {path: '/task/:id', element: TaskPage},
    {path: '/settings', element: SettingsPage},
    {path: '*', element: NotFoundPage},
    {path: '/calendar', element: CalendarPage}
]

export const publicRoutes = [
    {path: '/login', element: LoginForm},
]
