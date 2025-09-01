import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { useCreateCheckoutSessionMutation } from '../features/api/purchaseApi'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

const ByCourseButton = ({ courseId }) => {

  const [createCheckoutSession, { data, isLoading, isSuccess, isError, error }] = useCreateCheckoutSessionMutation()

  const purchaseCourseHandler = async () => {
    await createCheckoutSession(courseId)
  }
  useEffect(() => {
    if (isSuccess) {
      if (data?.url) {
        window.location.href = data.url //Redirect to stripe checkout
      }
      else {
        toast.error("Invalid Response")
      }
    }

    if(isError){
      toast.error(error?.data?.message || "Failed to create checkout")
    }

  }, [data, isSuccess, isError, error])
  return (
    <div className='w-full'>
      <Button className='w-full'
        disabled={isLoading}
        onClick={purchaseCourseHandler}>
        {
          isLoading ? (<>
            <Loader2 className='mr-2 w-4 h-4 animate-spin' /> Please Wait
          </>)
            :
            (
              "Purchase Course"
            )
        }
      </Button>
    </div>
  )
}

export default ByCourseButton