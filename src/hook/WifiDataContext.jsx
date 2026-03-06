// src/context/WifiDataContext.js
import React, { createContext, useState, useEffect } from 'react';

export const WifiContext = createContext();

export const WifiProvider = ({ children }) => {
  const [wifiData, setWifiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      const filePaths = [
        '/data/wifi_1.json',
        '/data/wifi_2.json',
        '/data/wifi_3.json',
        '/data/wifi_4.json',
        '/data/wifi_5.json',
        '/data/wifi_6.json'
      ];

      try {
        setLoading(true);
        const responses = await Promise.all(filePaths.map(path => fetch(path)));
        const dataParts = await Promise.all(
          responses.map(res => {
            if (!res.ok) throw new Error(`Fetch error: ${res.url}`);
            return res.json();
          })
        );
        
        // 데이터 합치기
        const combinedData = dataParts.flat();
        setWifiData(combinedData);
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Provider로 데이터와 로딩 상태를 하위 컴포넌트에 전달
  return (
    <WifiContext.Provider value={{ wifiData, loading }}>
      {children}
    </WifiContext.Provider>
  );
};