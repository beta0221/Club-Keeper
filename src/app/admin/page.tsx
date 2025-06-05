import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  // Fetch statistics
  const totalUsers = await prisma.subscription.count();
  const activeSubscriptions = await prisma.subscription.count({
    where: {
      sub_status: "active",
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Total Users</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">{totalUsers}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Active Subscriptions</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">{activeSubscriptions}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Conversion Rate</h3>
          <p className="mt-2 text-3xl font-bold text-purple-600">
            {totalUsers > 0
              ? `${((activeSubscriptions / totalUsers) * 100).toFixed(1)}%`
              : "0%"}
          </p>
        </div>
      </div>
    </div>
  );
}