import { AppWindowIcon, CodeIcon, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { toast } from 'sonner'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import { useLoginUserMutation, useRegisterUserMutation } from "../features/api/authApi"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [loginInput, setLoginInput] = useState({
        email: "",
        password: ""
    })
    const [signupInput, setSignInput] = useState({ name: "", email: "", password: "" });

    const [registerUser, {
        data: registerData,
        error: registerError,
        isLoading: registerIsLoading,
        isSuccess: registerIsSuccess
    }] = useRegisterUserMutation();

    const [loginUser, {
        data: loginData,
        error: loginError,
        isLoading: loginIsLoading,
        isSuccess: loginIsSuccess,
    }] = useLoginUserMutation();
    const navigate = useNavigate()
    const changeInputHandler = (e, type) => {

        const { name, value } = e.target;
        if (type === "signup") {
            setSignInput({ ...signupInput, [name]: value })
        }
        else {
            setLoginInput({ ...loginInput, [name]: value })
        }
    }

    const handleRegistration = async (type) => {
        let inpurData = type === "signup" ? signupInput : loginInput;
        // console.log(inpurData);
        const action = type === "signup" ? registerUser : loginUser;
        await action(inpurData)
    };

    useEffect(() => {

        if (registerIsSuccess && registerData) {
            setSignInput({ name: "", email: "", password: "" })
            toast.success(registerData.message || "Register Successful.");
        }
        if (registerError) {
            setSignInput({ email: "", password: "" })
            toast.error(registerError.data?.message || "Signup Failed.");
        }
    }, [registerIsSuccess, registerData, registerError]);

    useEffect(() => {
        if (loginIsSuccess && loginData) {
            setLoginInput({ email: "", password: "" })
            toast.success(loginData.message || "Logged In.");
            navigate("/")
        }
        if (loginError) {
            setLoginInput({ email: "", password: "" })
            toast.error(loginError.data?.message || "Login Failed.");
        }
    }, [loginIsSuccess, loginData, loginError]);


    return (
        <div className="flex w-full justify-center items-center mt-2">
            <Tabs defaultValue="signup" className="max-w-sm w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signup" className="cursor-pointer">Signup</TabsTrigger>
                    <TabsTrigger value="login" className="cursor-pointer">Login</TabsTrigger>
                </TabsList>
                <TabsContent value="signup">
                    <Card>
                        <CardHeader>
                            <CardTitle>Signup</CardTitle>
                            <CardDescription>
                                Create a new account and click signup when you&apos;re
                                done.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    name="name"
                                    type="text"
                                    value={signupInput.name}
                                    onChange={(e) => changeInputHandler(e, "signup")}
                                    placeholder="Enter Your Name"

                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    name="email"
                                    type="email"
                                    value={signupInput.email}
                                    onChange={(e) => changeInputHandler(e, "signup")}
                                    placeholder="Your Email Address" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    name="password"
                                    type="password"
                                    value={signupInput.password}
                                    onChange={(e) => changeInputHandler(e, "signup")}
                                    placeholder="Enter Password" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="cursor-pointer"
                                disabled={registerIsLoading} onClick={() => { handleRegistration("signup") }}>
                                {
                                    registerIsLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                                        </>
                                    ) : "Signup"
                                }
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>
                                Login your password here. After signup, you'll be logged in.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email </Label>
                                <Input
                                    name="email"
                                    type="email"
                                    value={loginInput.email}
                                    onChange={(e) => changeInputHandler(e, "login")}
                                    placeholder="Registered Email" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="password"> password</Label>
                                <Input
                                    name="password"
                                    type="password"
                                    value={loginInput.password}
                                    onChange={(e) => changeInputHandler(e, "login")}
                                    placeholder="Your Password" />
                            </div>
                        </CardContent>
                        <CardFooter>

                            <Button className="cursor-pointer"
                                disabled={loginIsLoading} onClick={() => handleRegistration("login")}>
                                {
                                    loginIsLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                                        </>
                                    ) : "Login"
                                }
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
export default Login
