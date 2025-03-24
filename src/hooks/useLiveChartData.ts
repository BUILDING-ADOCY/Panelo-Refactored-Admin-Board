'use client';

import { useEffect, useState } from 'react';
import io from 'socket.io-client';

type DataPoint = {
  day: string;
  queries: number;
  users: number;
};

export function useLiveChartData() {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    const socket = io('http://localhost:3000'); // ✅ Change in production

    socket.on('weeklyChartData', (newData: DataPoint[]) => {
      setData(newData);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return data;
}
