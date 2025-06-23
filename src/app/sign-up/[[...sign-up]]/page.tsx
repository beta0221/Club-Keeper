import { AppLayout } from '@/components/AppLayout'
import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <AppLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <SignUp redirectUrl="/dashboard" />
      </div>
    </AppLayout>
  )
}