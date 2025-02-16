"use client";

import { useState } from "react";
import { FC } from "react";
import { FaCheckCircle, FaTrash, FaBell } from "react-icons/fa"; // Import icons

interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  category?: "alert" | "update" | "message"; // Dynamic categories
}

interface NotificationProps {
  notification: Notification;
  onUpdate: (id: string, isRead: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const NotificationItem: FC<NotificationProps> = ({ notification, onUpdate, onDelete }) => {
  const [loading, setLoading] = useState(false);

  const handleMarkRead = async () => {
    setLoading(true);
    try {
      await onUpdate(notification.id, !notification.isRead);
    } catch (error) {
      console.error("Error updating notification:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await onDelete(notification.id);
    } catch (error) {
      console.error("Error deleting notification:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🎨 Dynamic Styling for Different Notification Types
  const categoryStyles = {
    alert: "bg-red-100 text-red-700 border-red-500",
    update: "bg-blue-100 text-blue-700 border-blue-500",
    message: "bg-green-100 text-green-700 border-green-500",
    default: "bg-gray-100 text-gray-700 border-gray-400",
  };

  return (
    <div
      className={`p-4 border-l-4 flex justify-between items-center transition-all duration-300 rounded-lg shadow-sm ${
        notification.isRead ? "opacity-50" : "opacity-100"
      } ${categoryStyles[notification.category || "default"]}`}
    >
      <div className="flex items-center gap-3">
        <FaBell className="text-lg" /> {/* Notification Icon */}
        <div>
          <h4 className="font-semibold">{notification.title}</h4>
          <p className="text-sm">{notification.message}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          className={`text-sm flex items-center gap-1 px-3 py-1 rounded ${
            notification.isRead ? "bg-gray-300" : "bg-green-500 text-white"
          }`}
          onClick={handleMarkRead}
          disabled={loading}
        >
          <FaCheckCircle />
          {notification.isRead ? "Unread" : "Read"}
        </button>
        <button
          className="text-sm flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded"
          onClick={handleDelete}
          disabled={loading}
        >
          <FaTrash />
          Delete
        </button>
      </div>
    </div>
  );
};

export default NotificationItem;