import { Menu, School } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from './ui/button';
import { DarkMode } from '../DarkMode';
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../features/authSlice.js";
import { authApi } from "../features/api/authApi.js";


const Navbar = () => {

    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutUser, { data, isSuccess }] = useLogoutUserMutation()


    const logoutHandler = async () => {
        await logoutUser().unwrap();         // backend logout API
        dispatch(userLoggedOut());           // authSlice clear
        dispatch(authApi.util.resetApiState()); // RTK Query cache clear
        navigate('/login')
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message || "Loguout Successfully")
        }
    }, [isSuccess])


    return (
        <div className='h-16 dark:bg-[#0A0A0A] bg-white  border-b dark:border-b-gray-800  gap-10 fixed top-0 w-full z-10'>
            <div className=' max-w-7xl mx-auto hidden md:flex  md:justify-between md:items-center gap-10 h-full px-4'>
                <div className='flex gap-2'>
                    <School size={30} />
                    <h1 className='hidden md:block text-2xl font-extrabold'>E-Learning</h1>
                </div>

                {/* User Icon and dark mode icon  */}
                <div className='flex items-center gap-8'>
                    {
                        user ?
                            (
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user?.profileUrl || "https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8="} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel className="cursor-pointer">My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="cursor-pointer"><Link to={'my-learning'}>My Learning</Link></DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer"><Link to={'profile'}>Edit Profile</Link></DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer" onClick={logoutHandler}> Log out</DropdownMenuItem>

                                        {
                                            user.role === "instructor" && (
                                                <>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="cursor-pointer">Dashboard</DropdownMenuItem>
                                                </>
                                            )
                                        }

                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <div className='flex items-center gap-2'>
                                    <Button className="cursor-pointer" variant="outline " onClick={() => navigate('/login')}>Login</Button>
                                    <Button className="cursor-pointer" onClick={() => navigate('/signup')}>Signup</Button>
                                </div>
                            )}
                    <div className="cursor-pointer" >
                        <DarkMode />
                    </div>
                </div>
            </div>

            {/* Mobile Navbar  */}
            <div className='flex md:hidden items-center justify-between px-4 h-full'>
                <div className='flex  items-center gap-2 justify-center'>
                    <School />
                    <h1 className=' sm:text-2xl font-extrabold self-center text-xl'>E-Learning</h1>
                </div>
                <MobileNavbar />
            </div>
        </div>
    )
}

export default Navbar

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet"
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Link, } from 'react-router-dom';
import { useLogoutUserMutation } from '../features/api/authApi';
import { useEffect } from 'react';
import {  useSelector } from 'react-redux';

const MobileNavbar = () => {
    const role = 'instructor'
    const navigate = useNavigate()
    const [logoutUser, { data, isSuccess }] = useLogoutUserMutation()
    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message || "Loguout Successfully")
            navigate("/login")
        }
    }, [isSuccess])

    const logoutHandler = async () => {
        await logoutUser()
    }
    return (
        <Sheet>
            <SheetTrigger asChild  >
                <Button size='icon'
                    className="rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer "
                    variant="outline">
                    <Menu />
                </Button>
            </SheetTrigger>

            <SheetContent className="flex flex-col  ">
                <SheetHeader className="flex flex-row items-center justify-between w-full  mt-10">
                    <SheetTitle>E-Learning</SheetTitle>
                    <div className="cursor-pointer">
                        <DarkMode />
                    </div>
                </SheetHeader>

                <Separator className='mr-2' />
                <nav className='flex flex-col space-y-4 px-4'>
                    <span> My Learning</span>
                    <span> Edit Profile</span>
                    <span onClick={logoutHandler}> Log out</span>
                </nav>

                {
                    role === "instructor" && (
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button type="submit">Dashboard</Button>
                            </SheetClose>
                        </SheetFooter>
                    )
                }
            </SheetContent>
        </Sheet>
    )
}