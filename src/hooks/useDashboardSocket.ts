'use client';

import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Change to production URL when deploying

export function useDashboardSocket() {
  const [stats, setStats] = useState<{
  totalQueries: number;
  avgResponseTime: number;
  activeUsers: number;
  frequentInquiry: string;
  dailyPeak: string;
  resolutions: number;
  } | null>(null);

  useEffect(() => {
    socket.on('dashboardUpdate', (data) => {
      setStats(data);
    });

    return () => {
      socket.off('dashboardUpdate');
    };
  }, []);

  return stats;
}
