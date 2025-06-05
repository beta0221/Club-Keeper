import { UserList } from "@/components/admin/UserList";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">會員管理</h1>
      </div>
      <UserList />
    </div>
  );
} 