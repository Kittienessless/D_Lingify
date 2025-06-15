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
import languageService from "shared/api/language/languageService.ts";
import { ILanguage } from "entities/language/index.ts";

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
    id: '1',
    label: "Название",
    value: "Title",
  },
  { id: '2',
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

  const [langInfo, setlangInfo] = useState<ILanguage[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await store.getAllLangs();
        setlangInfo(store.languageArray);
      } catch (e) {}
    };
    fetchData();
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

  function onSortHelper(this: any, selectedItem: Option) {
    setSelectedItem(selectedItem);
    switch (selectedItem.value) {
      case "Title":
        return setlangInfo(
          langInfo.sort(function (a, b) {
            if (a.Title > b.Title) {
              return 1;
            }
            if (a.Title < b.Title) {
              return -1;
            }
            return 0;
          })
        );
      case "Date":
        return setlangInfo(
          langInfo.sort(function (a, b) {
            if (a.createdAt > b.createdAt) {
              return 1;
            }
            if (a.createdAt < b.createdAt) {
              return -1;
            }
            // a должно быть равным b
            return 0;
          })
        );
    }
    console.log(selectedItem);
    console.log(langInfo);
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
          onChange={(selectedItem: Option) => onSortHelper(selectedItem)}
        />

        <AddLanguage />
      </FeaturedContainer>
      {store.languageArray
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
              id={lang.id}
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
