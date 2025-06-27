import React, {
  useState,
  useEffect,
  ChangeEventHandler,
  useContext,
  useMemo,
} from "react";
import { List } from "antd";
import { LangAPI } from "shared/api";
import { LanguageCart } from "./LanguageCart";
import styled from "styled-components";
import { Search } from "shared/ui/featuredInputs";
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
import { useTranslation } from "react-i18next";
import { Menu } from "shared/ui/menu/index.tsx";
import { OpenMenuButton } from "shared/ui/button/OpenMenuButton.tsx";

import { Divider } from "shared/ui/divider";
import { Text } from "shared/ui/text";
import { EditIcon } from "shared/assets/EditIcon";
import { TrashBinIcon } from "shared/assets/TrashBinIcon";
import { DownloadIcon } from "shared/assets/DownloadIcon";
import { MenuOption, MenuOptionProps } from "shared/ui/menu/MenuOption.tsx";
import { borderRadius } from "shared/lib/borderRadius.tsx";

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

const PaginatonButton = styled.button`
  padding: 0.4em 0.6em;
  width: 2em;
  height: auto;
  ${borderRadius.s};
  background-color: ${({ theme }) => theme.colors.container};
  color: ${({ theme }) => theme.colors.font};
  border: 1px solid ${({ theme }) => theme.colors.container};
  cursor: pointer;
  margin: 0.2em;
  font-size: 12pt;
  transition:
    background-color 0.3s,
    color 0.3s;

  &.active {
    background-color: #fff;
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
`;

const HeaderContainer = styled.div`
  margin-left: 95%;
  z-index: -1;
`;

const Total = styled.div`
  color: ${({ theme }) => theme.colors.font};
  background-color: ${({ theme }) => theme.colors.container};
  ${borderRadius.s};
  padding-left: 0.9em;
  padding-right: 0.9em;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  margin-top: 2em;

  width: fit-content;
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

const LanguageList: React.FC = () => {
  const Container = styled.div`
    background-color: ${({ theme }) => theme.colors.container};
    color: ${({ theme }) => theme.colors.font};
    margin-bottom: 2em;
    border-radius: 8px;
    max-width: 50em;
    max-height: fit-content;
    white-space: initial;
    padding: 2em;
    overflow: hidden;
    word-break: break-word;
  `;

  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Константы пагинации
  const ITEMS_PER_PAGE = 3;

  //search, filter, sort, create new
  const [selectedItem, setSelectedItem] = useState<Option | null>(null);

  const [IsEmpty, setEmpty] = useState(true);
  const [searchContentData, setSearchContentData] = useState<string>("");
  const navigate = useNavigate();
  const { store } = useContext(UserContext);

  const [langInfo, setlangInfo] = useState<ILanguage[] | null>(null);

  const totalPages = langInfo ? Math.ceil(langInfo.length / ITEMS_PER_PAGE) : 0;

  const paginatedItems = useMemo(() => {
    if (!langInfo) return [];
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return langInfo.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [langInfo, currentPage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await store.getAllLangs();
        // Фильтруем null значения и преобразуем в ILanguage[]
        const filteredLanguageArray = store.languageArray?.filter(
          Boolean
        ) as ILanguage[];
        setlangInfo(filteredLanguageArray || null); // Хорошая практика - не использовать пустой массив, а null
      } catch (e) {
        setlangInfo(null);
      }
    };

    setlangInfo(null); // Установим начальное значение как null перед загрузкой
    fetchData();
  }, [store]); // Добавим store в зависимости

  if (store.isLoading) {
    return <Loader />;
  }
  if (!store.isAuth) {
    return <LoginWidget />;
  }

  const options: Option[] = [
    {
      id: "1",
      label: t("LanguageList.text1"),
      value: "Title",
    },
    { id: "2", label: t("LanguageList.text2"), value: "Date" },
  ];

  const searchHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setSearchContentData(e.currentTarget.value);
  };

  function onSortHelper(selectedItem: Option) {
    setSelectedItem(selectedItem);
    setCurrentPage(1); // Сброс на первую страницу при изменении сортировки

    if (!langInfo) return;

    switch (selectedItem.value) {
      case "Title":
        setlangInfo(
          [...langInfo].sort((a, b) => a.Title.localeCompare(b.Title))
        );
        break;
      case "Date":
        setlangInfo(
          [...langInfo].sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
        );
        break;
    }
  }

  function OnEdit(key: string) {
    navigate(`/redactLanguage/${key}`);
  }

  async function handleDownloadFile(key: string, title: string) {
    try {
      const response = await languageService.download(key);
      const a = document.createElement("a");
      a.style.display = "none";
      document.body.appendChild(a);

      const blobFile = new Blob([JSON.stringify(response.data)], {
        type: "text/plain",
      });
      const url = window.URL.createObjectURL(blobFile);
      a.href = url;
      a.download = "Language " + title;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.log(e);
    }
  }

  function OnDownload(key: string, title: string) {
    handleDownloadFile(key, title);
  }

  const handleDeleteItem = async (id: string) => {
    try {
      await languageService.delete(id);
      if (langInfo) {
        const updatedItems = langInfo.filter((item) => item.id !== id);
        setlangInfo(updatedItems);

        // Корректировка текущей страницы при удалении элементов
        if (paginatedItems.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      }
    } catch (e) {}
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <ContainerList>
      <FeaturedContainer>
        <Search searchHandler={searchHandler} />
        <Select
          placeholder={t("profile.LangList")}
          selected={selectedItem}
          options={options}
          onChange={(selectedItem: Option) => onSortHelper(selectedItem)}
        />
        <AddLanguage />
      </FeaturedContainer>
      {paginatedItems.length > 0 ? (
        paginatedItems
          .filter(
            (lang) =>
              lang.Title.toLowerCase().startsWith(
                searchContentData.toLowerCase()
              ) ||
              lang.Description.toLowerCase().startsWith(
                searchContentData.toLowerCase()
              )
          )
          .map((lang, index) => (
            <div key={index}>
              <Container>
                <HeaderContainer>
                  <Menu
                    title={t("LanguageCart.text1")}
                    renderOpener={({ props: { ref, ...props } }) => (
                      <OpenMenuButton ref={ref} {...props} />
                    )}
                    renderContent={({ view, onClose }) => {
                      const options: MenuOptionProps[] = [
                        {
                          text: t("LanguageCart.text2"),
                          onSelect: () => {
                            OnEdit(lang.id);
                          },
                          icon: <EditIcon />,
                        },
                        {
                          text: t("LanguageCart.text3"),
                          onSelect: () => {
                            OnDownload(lang.id, lang.Title);
                          },
                          icon: <DownloadIcon />,
                        },
                        {
                          text: t("LanguageCart.text4"),
                          onSelect: () => {
                            handleDeleteItem(lang.id);
                          },
                          icon: <TrashBinIcon />,
                        },
                      ];

                      return options.map((props, index) => (
                        <MenuOption view={view} key={index} {...props} />
                      ));
                    }}
                  />
                </HeaderContainer>
                <Text weight={400} centerVertically height="l">
                  {lang.Title}
                </Text>
                <Divider />
                <Text weight={400} centerVertically height="s">
                  {lang.Description}
                </Text>
              </Container>
            </div>
          ))
      ) : (
        <li>
          <Empty />
        </li>
      )}

      {totalPages > 1 && (
        <div>
          <PaginatonButton
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            &laquo;
          </PaginatonButton>
          <PaginatonButton
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lsaquo;
          </PaginatonButton>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginatonButton
              key={page}
              onClick={() => handlePageChange(page)}
              className={currentPage === page ? "active" : ""}
            >
              {page}
            </PaginatonButton>
          ))}

          <PaginatonButton
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &rsaquo;
          </PaginatonButton>
          <PaginatonButton
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            &raquo;
          </PaginatonButton>
        </div>
      )}

      <Total>
        {t("total.totalElements")}: {langInfo ? langInfo.length : 0} |{" "}
        {t("total.displayed")}: {langInfo ? langInfo.length : 0} |{" "}
        {t("total.pageInfo")} {currentPage} {t("total.pageInfoFrom")}{" "}
        {totalPages}
      </Total>
    </ContainerList>
  );
};

export default observer(LanguageList);
