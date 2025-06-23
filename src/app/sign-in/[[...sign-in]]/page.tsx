import { AppLayout } from '@/components/AppLayout'
import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <AppLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <SignIn redirectUrl="/dashboard" />
      </div>
    </AppLayout>
  )
}