import { useEffect, useState } from "react";
import type { User } from "./types/user.types";
import Button from "@/components/Button/Button";

interface UserCardProps {
  userId: number;
}

async function fetchUser(id: number): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        name: "Milan Patel",
        email: "milan@example.com",
        role: "admin",
      });
    }, 1000);
  });
}

const roleBadgeClasses: Record<string, string> = {
  admin: "bg-purple-100 text-purple-800",
  editor: "bg-blue-100 text-blue-800",
  viewer: "bg-gray-100 text-gray-700",
};

function UserCard({ userId }: UserCardProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetchUser(userId)
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        setError("Failed to load user.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-gray-500">Loading user...</p>
      </div>
    );
  }

  if (error) {
     return (
      <div className="rounded-md bg-red-50 p-4">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  if (!user) {
    return null
  }
  return (
     <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
          <p className="mt-1 text-sm text-gray-500">{user.email}</p>
        </div>

        {/* Role badge */}
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${roleBadgeClasses[user.role]}`}>
          {user.role}
        </span>
      </div>

      <div className="mt-4 flex gap-3">
        <Button label="Edit User" onClick={() => console.log('Edit', user.id)} />
        <Button
          label="Remove"
          variant="danger"
          size="sm"
          onClick={() => console.log('Remove', user.id)}
        />
      </div>
    </div>
  )
}

export default UserCard
