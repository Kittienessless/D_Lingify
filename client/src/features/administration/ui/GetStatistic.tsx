import { UserContext } from "app/providers";
import { observer } from "mobx-react-lite";
import react, { useContext, useEffect, useState } from "react";
import AdminService from "shared/api/user/AdminServive";
import styled from "styled-components";

export type Statistic = {
  label: string;
  value: string;
};

const GetStatistic = () => {
  const [stats, setStats] = useState<Statistic[]>([]);
  const { store } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }

    async function fetchLangs() {
      try {
        const res = await AdminService.getStats();
        setStats(res.data);
      } catch (e) {}
    }

    fetchLangs();
  }, []);

  

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
        gap: "10px",
        padding: "20px",
        backgroundColor: "transparent",
        justifyItems: "center",
        minHeight: "100vh",
      }}
    >
      {stats.map((stat, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "24pt" }}>{stat.value}</div>
          <div style={{ marginTop: "8px", fontSize: "14px" }}>{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default observer(GetStatistic)