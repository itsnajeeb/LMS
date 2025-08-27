import React from 'react'
import { Card, CardContent,CardTitle } from "@/components/ui/card"

const Dashboard = () => {
  return (
    <div className=' grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        <Card>
            <CardTitle>
                <h1>Total Sales</h1>
            </CardTitle>
        </Card>
    </div>
  )
}

export default Dashboard