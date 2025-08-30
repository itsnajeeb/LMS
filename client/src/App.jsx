import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import HeroSection from './pages/student/HeroSection'
import Course from './pages/student/courses'
import MainLayout from './layout/MainLayout'
import MyLearning from './pages/student/MyLearning'
import Profile from './pages/student/Profile'
import Sidebar from './pages/admin/Sidebar'
import Dashboard from './pages/admin/Dashboard'
import CourseList from './pages/admin/course/CourseList'
import { CreateCourse } from './pages/admin/course/CreateCourse'
import { EditCourse } from './pages/admin/course/EditCourse'
import CreateLecture from './pages/admin/lecture/CreateLecture'
import EditLecture from './pages/admin/lecture/EditLecture'
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element:
          <>
            <HeroSection />
            <Course />
          </>
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "signup",
        element: <Login />
      },
      {
        path: "my-learning",
        element: <MyLearning />
      },
      {
        path: "profile",
        element: <Profile />
      },

      //Admin Router 
      {
        path: "admin",
        element: <Sidebar />,
        children: [
          {
            path: 'dashboard',
            element: <Dashboard />
          },
          {
            path: "course",
            element: <CourseList />

          },
          {
            path: "course/create-course",
            element: <CreateCourse />
          },
          {
            path: "course/:courseId",
            element: <EditCourse />
          },
          {
            path: "course/:courseId/lecture",
            element: <CreateLecture />
          }, 
          {
            path: "course/:courseId/lecture/:lectureId",
            element: <EditLecture />
          },
         
        ]

      }

    ]
  }
])
function App() {
  return (
    <main>
      <RouterProvider router={appRouter} />

    </main>
  )
}

export default App