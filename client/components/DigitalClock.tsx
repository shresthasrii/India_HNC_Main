import React, { useState, useEffect } from "react";

export default function DigitalClock() {
  const [time, setTime] = useState<string>("00:00:00");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Get IST (Asia/Kolkata) timezone
      const istTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      const hours = String(istTime.getHours()).padStart(2, "0");
      const minutes = String(istTime.getMinutes()).padStart(2, "0");
      const seconds = String(istTime.getSeconds()).padStart(2, "0");
      setTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center">
      <div className="text-4xl font-mono font-bold tracking-wider text-primary">
        {time}
      </div>
      <div className="text-xs text-muted-foreground mt-1">IST</div>
    </div>
  );
}
