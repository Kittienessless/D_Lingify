import react from "react";
import styled from "styled-components";

export const GetStatistic = () => {
  // Фейковые данные
  const stats = [
    {
      value: 12500,
      label: "Количество пользователей",
    },
    {
      value: 3500,
      label: "Посещений в неделю",
    },
    {
      value: 75,
      label: "Среднее время сессии (мин)",
    },
    {
      value: 120,
      label: "Новые регистрации за месяц",
    },
    {
      value: 15,
      label: "Новых языков за месяц",
    },
    {
      value: 3000,
      label: "Средне количество слов в языках",
    },
  ];

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
          <div style={{ fontSize: "24pt" }}>
            {stat.value}
          </div>
          <div style={{ marginTop: "8px", fontSize: "14px" }}>{stat.label}</div>
        </div>
      ))}
    </div>
  );
};
