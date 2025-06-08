import { UserContext } from "app/providers";
import { observer } from "mobx-react-lite";
import react, { useContext, useEffect, useState } from "react";
import AdminService from "shared/api/user/AdminServive";


export type Statistic = {
  label: string;
  value: string;
};

const GetStatistic = () => {
  const [stats, setStats] = useState<Statistic[]>([]);
  const { store } = useContext(UserContext);

  const [userStats, setUserStats] = useState<Statistic[]>([]);
  const [langStats, setLangStats] = useState<Statistic[]>([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }

    async function fetchStatistic() {
      try {
        const res1 = await AdminService.getStats();
        const res2 = await AdminService.getUsersStatistics();
        const res3 = await AdminService.getLangsStatistics();

        setStats(res1.data);
        setUserStats(res2.data);
        setLangStats(res3.data);
      } catch (e) {
        console.log(e)
      }
    }

    fetchStatistic();
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
        {userStats.map((stat, index) => (
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
       {langStats.map((stat, index) => (
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

export default observer(GetStatistic);
