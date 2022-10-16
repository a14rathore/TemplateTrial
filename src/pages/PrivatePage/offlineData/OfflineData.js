import React, { useEffect, useState } from "react";

const OfflineData = () => {
  const [offlineData, setOfflineData] = useState([]);
  useEffect(() => {
    const getofflineData = localStorage.getItem("offlineData")
      ? JSON.parse(localStorage.getItem("offlineData"))
      : [];
    setOfflineData(getofflineData);
  }, []);
  return (
    <div>
      <ul>
        {offlineData.map((ele) => (
          <li style={{ padding: 8 }}>{JSON.stringify(ele)}</li>
        ))}
      </ul>
    </div>
  );
};

export default OfflineData;
