
import react from 'react'
import styled from "styled-components";
import { Tabs as BaseTabs } from "antd";
import { GetAllUsers } from './GetAllUsers';
import { GetAllLangs } from './GetAllLangs';
import { GetStatistic } from './GetStatistic';
import { Space } from 'shared/ui/space';

const Tabs = styled(BaseTabs)`
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: ${({ theme }) => theme.colors.font} !important;
    font-weight: 400;
  }
  .ant-tabs-tab {
    color: ${({ theme }) => theme.colors.fontSecondary} !important;
    & :hover {
      color: ${({ theme }) => theme.colors.fontHover} !important;
    }
  }

  .ant-tabs-tab-active {
    color: ${({ theme }) => theme.colors.font} !important;
  }
`;

const items = [
  {
    label: "Пользователи",
    children: <GetAllUsers></GetAllUsers> ,
    key: "1",
  },
  {
    label: "Языки",
    children: <GetAllLangs></GetAllLangs> ,
    key: "2",
  },
  {
    label: "Статистика",
    children: <GetStatistic></GetStatistic> ,
    key: "3",
  },
 
];
const ProfileDiv = styled.div`
background-color: ${({ theme }) => theme.colors.bg};
color:  ${({ theme }) => theme.colors.font};
max-width: 80vw;
min-width: 20vw;
`;

export const AdminDashBoard = () => {

 
 
  return (
    <ProfileDiv>
      
      <Tabs tabPosition={"left"} items={items} />
    </ProfileDiv>
  );
}