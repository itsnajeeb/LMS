import React from 'react'
import { Button } from '../../../components/ui/button'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter
} from "@/components/ui/table"
import { Link } from 'react-router-dom'
const CourseList = () => {

    const invoices = [
        {
            invoice: "INV001",
            paymentStatus: "Paid",
            totalAmount: "$250.00",
            paymentMethod: "Credit Card"
        },

        {
            invoice: "INV002",
            paymentStatus: "Pending",
            totalAmount: "$200.00",
            paymentMethod: "Bank Transfer"
        },

        {
            invoice: "INV003",
            paymentStatus: "Paid",
            totalAmount: "$430.00",
            paymentMethod: "Debit Card"
        },

        {
            invoice: "INV004",
            paymentStatus: "Un-Paid",
            totalAmount: "$450.00",
            paymentMethod: "Bank Transfer"
        },

        {
            invoice: "INV005",
            paymentStatus: "Paid",
            totalAmount: "$450.00",
            paymentMethod: "Credit Card"
        },

        {
            invoice: "INV006",
            paymentStatus: "Paid",
            totalAmount: "$250.00",
            paymentMethod: "Paypal"
        },

        {
            invoice: "INV007",
            paymentStatus: "Paid",
            totalAmount: "$250.00",
            paymentMethod: "Credit Card"
        },

        {
            invoice: "INV008",
            paymentStatus: "Paid",
            totalAmount: "$100.00",
            paymentMethod: "Paypal"
        },


    ]

    
    return (
        <div className='mx-5'>
            <Button><Link to={'create-course'}>Create a new course</Link></Button>
            <Table className="mt-8 w-11/12">
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {
                        invoices.map((invoice) => {
                            return (
                                <TableRow key={invoice.invoice}>
                                    <TableCell className="font-medium">{invoice.invoice}</TableCell>
                                    <TableCell >{invoice.paymentStatus}</TableCell>
                                    <TableCell >{invoice.paymentMethod}</TableCell>
                                    <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                                </TableRow>
                            )

                        })
                    }

                </TableBody>

                <TableFooter className="py-5">
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">$1020.00</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}

export default CourseList