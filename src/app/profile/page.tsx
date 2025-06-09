import { AppLayout } from '@/components/AppLayout';
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
          <div className="bg-white rounded-lg shadow p-6 min-h-screen flex items-center justify-center bg-gray-50">
          {/* <div className="bg-white rounded-lg shadow p-6"> */}
            <UserProfile />
          </div>
        </div>
      </div>
    </AppLayout>
  );
} 