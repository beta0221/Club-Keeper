import { AppLayout } from '@/components/AppLayout';
import AppointmentList from '@/components/appointments/AppointmentList';
import { UserProfile } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default function ProfilePage() {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile</h1>

          <div className="space-y-8">

            <div className="md:bg-white rounded-lg md:shadow md:p-6">
              <AppointmentList />
              {/* </div>

            <div className="bg-white rounded-lg shadow p-6"> */}
              <div className='my-6'>

              </div>
              <div className="md:bg-white rounded-lg md:shadow md:p-6">
                <h2 className="text-xl font-semibold mb-4">Profile</h2>
                <UserProfile appearance={{
                  elements: {
                    rootBox: 'w-full md:w-10/12',
                    card: 'w-full'
                  },
                }} />
              </div>

            </div>

          </div>
        </div>
      </div>
    </AppLayout>
  );
} 