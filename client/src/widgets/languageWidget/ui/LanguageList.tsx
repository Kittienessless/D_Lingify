import React, {
  useState,
  useEffect,
  ChangeEventHandler,
  useContext,
} from "react";
import { List } from "antd";
import { LangAPI } from "shared/api";
import { LanguageCart } from "./LanguageCart";
import styled from "styled-components";
import { Search } from "shared/ui/featuredInputs";
import { IconButton } from "shared/ui/button/IconButton";
import { FilterIcon } from "shared/assets/FilterIcon";
import { SortIcon } from "shared/assets/SortIcon";
import { Button } from "shared/ui/button";
import { useNavigate } from "react-router-dom";
import { AddLanguage } from "features/languageCard";
import { Option } from "../../../shared/types/Option.tsx";
import { Select } from "shared/ui/dropdown";
import { Empty } from "shared/ui/empty/Empty.tsx";
import { observer } from "mobx-react-lite";
import { UserContext } from "app/providers";
import { Loader } from "shared/ui/loaders/loader.tsx";
import { LoginWidget } from "widgets/loginWidget/ui/LoginWidget.tsx";

const ContainerList = styled.div`
  margin: 10px;
  padding: 5px;
  top: 50%;
  left: 50%;
  position: relative;
  background-color: transparent;

  transform: translateY(-50%);
  transform: translateX(-50%);
`;
const FeaturedContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 12px;
  border: 1px solid rgb(221, 221, 221);
  width: 40vw;
  justify-content: space-around;
  padding: 4px;
  margin-bottom: 10px;
`;
const options: Option[] = [
  {
    label: "Название",
    value: "Title",
  },
  {
    label: "Дата создания",
    value: "Date",
  },
];

const LanguageList: React.FC = () => {
  //search, filter, sort, create new
  const [selectedItem, setSelectedItem] = useState<Option | null>(null);

  const [IsEmpty, setEmpty] = useState(true);
  const [searchContentData, setSearchContentData] = useState<string>("");
  const navigate = useNavigate();
  const { store } = useContext(UserContext);

  const [langInfo, setlangInfo] = useState([
    {
      id: "",
      Title: "",
      Description: "",
      userID: "",
      LangPath: "",
      createdAt: "",
      updatedAt: "",
    },
  ]);
  useEffect(() => {
    const fetchDataForPosts = async () => {
      try {
        const response = await LangAPI.langInfo.getAllLangsInfo();
        setlangInfo(response);
      } catch (e) {}
    };
    fetchDataForPosts();
  }, []);

  function handlerOnSave() {}

  if (store.isLoading) {
    return <Loader></Loader>;
  }
  if (!store.isAuth) {
    return <LoginWidget />;
  }

  const searchHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setSearchContentData(e.currentTarget.value);
  };

  function onSortHelper(this: any, selectedItem: any) {
    setSelectedItem(selectedItem);
    switch(selectedItem)  {
      case 'Title' : return this.setState(langInfo.sort((a: any, b: any) => b.Title - a.Title));
      case 'Date' : return this.setState(langInfo.sort((a: any, b: any) => parseFloat(b.createdAt) - parseFloat(a.createdAt)));
    }
     
  }

  function onFilterHelper() {}

  

  return (
    <ContainerList>
      <FeaturedContainer>
        <Search searchHandler={searchHandler}></Search>

        <Select
          placeholder="Сортировать..."
          selected={selectedItem}
          options={options}
          onChange={(selection: Option) => onSortHelper(selection)}
        />

        <AddLanguage />
      </FeaturedContainer>
      { 
        langInfo
          .filter(
            (lang) =>
              lang.Title.toLowerCase().startsWith(
                searchContentData.toLowerCase()
              ) ||
              lang.Description.toLowerCase().startsWith(
                searchContentData.toLowerCase()
              ) ||
              `${lang.Title} `
                .toLowerCase()
                .startsWith(searchContentData.toLowerCase())
          )
           
          .map((lang, index) => (
            <li key={index}>
              <LanguageCart
                key={lang.id}
                title={lang.Title}
                desc={lang.Description}
              />
            </li>
          ))}

      {selectedItem && <div></div>}
    </ContainerList>
  );
};
export default observer(LanguageList);
