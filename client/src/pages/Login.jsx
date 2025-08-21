import { AppWindowIcon, CodeIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
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
import { useState } from "react"

const Login = () => {
    const [loginInput, setLoginInput] = useState({
        email: "",
        password: ""
    })
    const [signupInput, setSignInput] = useState({ name: "", email: "", password: "" });

    const changeInputHandler = (e, type) => {

        const { name, value } = e.target;
        if (type === "signup") {
            setSignInput({ ...signupInput, [name]: value })
        }
        else {
            setLoginInput({ ...loginInput, [name]: value })
        }
    }

    const handleRegistration = (type) => {
        let inpurData = type === "signup" ? signupInput : loginInput
        console.log(inpurData);

    }

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
                            <Button onClick={() => { handleRegistration("signup") }}>Signup</Button>
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
                            <Button onClick={() => handleRegistration("login")}>Login</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
export default Login
