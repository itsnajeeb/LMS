import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import HeroSection from './pages/student/HeroSection'
import Course from './pages/student/courses'
import MainLayout from './layout/MainLayout'
import MyLearning from './pages/student/MyLearning'
import Profile from './pages/student/Profile'
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
            <Course/>
          </>
      },
      {
        path: "login",
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

    ]
  }
])
function App() {
  return (
    <main>
      <RouterProvider router={appRouter}/>
      
    </main>
  )
}

export default App