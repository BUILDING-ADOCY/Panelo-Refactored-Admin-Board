"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import NotificationItem from "./NotificationItem";

const socket = io();

interface Notification {
  id: string;
  title: string;
  message: string;
  category: "alert" | "update" | "message" | undefined;
  isRead: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetchNotifications();

    socket.on("new_notification", (newNotification: Notification) => {
      setNotifications((prev) => [newNotification, ...prev]);
    });

    return () => {
      socket.off("new_notification");
    };
  }, []);

  // ✅ Updated fetchNotifications function with a default notification
  const fetchNotifications = async (pageNum = 1) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/notifications?userId=123&page=${pageNum}&pageSize=${pageSize}`);
      const data = await res.json();

      if (data.notifications && Array.isArray(data.notifications)) {
        let updatedNotifications = data.notifications;

        // ✅ Add a default notification if none exist
        if (updatedNotifications.length === 0 && pageNum === 1) {
          updatedNotifications = [
            {
              id: "default-notification",
              title: "Welcome to Notifications!",
              message: "This is your first notification. New updates will appear here.",
              category: "update",
              isRead: false,
            },
          ];
        }

        setNotifications((prev) =>
          pageNum === 1 ? updatedNotifications : [...prev, ...updatedNotifications]
        );
        setPage(pageNum);
      } else {
        console.error("Invalid API response:", data);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>

      {loading && notifications.length === 0 ? (
        <p>Loading...</p>
      ) : notifications.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        <div>
          {notifications.map((notification) => (
            <NotificationItem
                  key={notification.id}
                  notification={notification} onUpdate={function (id: string, isRead: boolean): Promise<void> {
                      throw new Error("Function not implemented.");
                  } } onDelete={function (id: string): Promise<void> {
                      throw new Error("Function not implemented.");
                  } }            />
          ))}
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => fetchNotifications(page + 1)}
            disabled={loading}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}