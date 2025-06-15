import { UserContext } from "app/providers";
import { observer } from "mobx-react-lite";
import react, { useContext, useEffect, useState } from "react";
import AdminService from "shared/api/user/AdminServive";

export type Statistic = {
  id: string;
  label: string;
  value: string;
};

const GetStatistic = () => {
  const { store } = useContext(UserContext);

  const [userStats, setUserStats] = useState<Statistic>();
  const [langStats, setLangStats] = useState<Statistic>();

  async function fetchStatistic() {
    try {
      const res2 = await AdminService.getUsersStatistics();
      const res3 = await AdminService.getLangsStatistics();

      setUserStats(res2.data);
      setLangStats(res3.data);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
    }

    fetchStatistic();
  }, [store.isAuth]);

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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "24pt" }}>{userStats?.value}</div>
        <div style={{ marginTop: "8px", fontSize: "14px" }}>
          {userStats?.label}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "24pt" }}>{langStats?.value}</div>
        <div style={{ marginTop: "8px", fontSize: "14px" }}>
          {langStats?.label}
        </div>
      </div>
    </div>
  );
};

export default observer(GetStatistic);
