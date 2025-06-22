import { UserContext } from "app/providers";
import { observer } from "mobx-react-lite";
import react, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AdminService from "shared/api/user/AdminServive";
import { Text } from "shared/ui/text";
import styled from "styled-components";

export type Statistic = {
  id: string;
  label: string;
  value: string;
};

const Container = styled.div`
  margin: 10px;
  padding: 10px;

  width: 90vw;
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.font};
`;
const GetStatistic = () => {
  const { store } = useContext(UserContext);
  const { t } = useTranslation();

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
    <Container>
      <Text>{t("admin.header3")}</Text>
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
            {t("admin.title7")}
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
            {t("admin.title8")}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default observer(GetStatistic);
