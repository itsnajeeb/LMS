import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectLabel,
    SelectGroup
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
const categories = [
    { id: "Next JS", label: "Next JS" },
    { id: "data science", label: "Data Science" },
    { id: "frontend development", label: "Frontend Development" },
    { id: "fullstack development", label: "Fullstack Development" },
    { id: "backend development", label: "Backend Development" },
    { id: "mern stack development", label: "MERN Stack Development" },
    { id: "javascript", label: "JavaScript" },
    { id: "mongodb", label: "MongoDB" },
    { id: "docker", label: "Docker" },
    { id: "html", label: "HTML" },
]
const Filter = ({handleFilterChange }) => {

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [sortByPrice, setSortByPrice] = useState("")

    const handleCategoryChange = (categoryId) => {
        setSelectedCategories((prevCategories) => {
            const newCategories = prevCategories.includes(categoryId)
                ? prevCategories.filter((id) => id !== categoryId)
                : [...prevCategories, categoryId]

            handleFilterChange(newCategories, sortByPrice)
            return newCategories
        });
    };


    const selectByPriceHandler = (selectedValue) => {
        setSortByPrice(selectedValue)
        handleFilterChange(selectedCategories, selectedValue)
    }

    return (
        <div className='w-full md:w-1/4 '>
            <div className='flex justify-between items-center'>
                <h1 className='font-semibold text-lg md:text-xl'>Filter Options</h1>

                <Select onValueChange={selectByPriceHandler}>
                    <SelectTrigger className=" cursor-pointer">
                        <SelectValue placeholder="Short By" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Short by price</SelectLabel>
                            <SelectItem value="low">Low to High</SelectItem>
                            <SelectItem value="high">High to Low</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <Separator className='my-4' />

            <div className=''>
                <h1 className='font-semibold mb-2'>CATEGORY</h1>
                {
                    categories.map((category) => (

                        <div key={category.id} className='flex items-center space-x-2 my-3'>
                            <Checkbox
                                className="cursor-pointer"
                                id={category.id}
                                onCheckedChange={() => handleCategoryChange(category)} />
                            <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{category.label}</Label>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Filter