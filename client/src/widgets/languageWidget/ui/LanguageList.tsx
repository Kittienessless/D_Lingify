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
import { useTranslation } from "react-i18next";

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
    id: "1",
    label: "Название",
    value: "Title",
  },
  { id: "2", label: "Дата создания", value: "Date" },
];

const LanguageList: React.FC = () => {
  const { t } = useTranslation();
  //
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof ILanguage>("Title");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [newItem, setNewItem] = useState<Omit<ILanguage[], "id">>();

  // Константы пагинации
  const ITEMS_PER_PAGE = 3;

  //search, filter, sort, create new
  const [selectedItem, setSelectedItem] = useState<Option | null>(null);

  const [IsEmpty, setEmpty] = useState(true);
  const [searchContentData, setSearchContentData] = useState<string>("");
  const navigate = useNavigate();
  const { store } = useContext(UserContext);

  const [langInfo, setlangInfo] = useState<ILanguage[]>([]);
   const processedItems = useMemo(() => {
    // Фильтрация
    const filtered = langInfo.filter(
      (item) =>
        item.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.Description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Сортировка
    return [...filtered].sort((c: any, d: any) => {
      const cValue = c[sortField];
      const dValue = d[sortField];

      if (cValue < dValue) return sortDirection === "asc" ? -1 : 1;
      if (cValue > dValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [langInfo, searchTerm, sortField, sortDirection]);
   // Пагинация
  const totalPages = Math.ceil(processedItems.length / ITEMS_PER_PAGE);
   const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return processedItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [processedItems, currentPage]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await store.getAllLangs();
        setlangInfo(store.languageArray);
      } catch (e) {}
    };
    fetchData();
  }, []);

  if (store.isLoading) {
    return <Loader></Loader>;
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
  }

 

 

   const handleDeleteItem = (id: string) => {
    const updatedItems = langInfo.filter(item => item.id !== id);
    setlangInfo(updatedItems);
    
    // Корректировка текущей страницы при удалении элементов
    if (paginatedItems.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSort = (field: keyof ILanguage) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1); // Сброс на первую страницу при изменении сортировки
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <ContainerList>
      <FeaturedContainer>
        <Search searchHandler={searchHandler}></Search>

        <Select
          placeholder={t("profile.LangList")}
          selected={selectedItem}
          options={options}
          onChange={(selectedItem: Option) => onSortHelper(selectedItem)}
        />

        <AddLanguage />
      </FeaturedContainer>
      {/* {langInfo
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
          <div key={index}>
            <LanguageCart
              id={lang.id}
              title={lang.Title}
              desc={lang.Description}
            />
          </div>
        ))} */}
   {/* Сортировка */}
      <div>
        Сортировать по:
        <button onClick={() => handleSort('Title')}>
          Названию {sortField === 'Title' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
        </button>
        <button onClick={() => handleSort('createdAt')}>
          Дате {sortField === 'createdAt' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
        </button>
      </div>
    <ul>
        {paginatedItems.length > 0 ? (
          paginatedItems.map((lang, index)=> (
             <div key={index}>
            <LanguageCart
              id={lang.id}
              title={lang.Title}
              desc={lang.Description}
            />
             <Button 
                onClick={() => handleDeleteItem(lang.id)}
                className="delete-btn"
              >
                Удалить
              </Button>
          </div>
           
          ))
        ) : (
          <li>Элементы не найдены</li>
        )}
      </ul>
      {selectedItem && <div></div>}
        {totalPages > 1 && (
        <div>
          <button 
            onClick={() => handlePageChange(1)} 
            disabled={currentPage === 1}
          >
            &laquo;
          </button>
          <button 
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1}
          >
            &lsaquo;
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={currentPage === page ? 'active' : ''}
            >
              {page}
            </button>
          ))}
          
          <button 
            onClick={() => handlePageChange(currentPage + 1)} 
            disabled={currentPage === totalPages}
          >
            &rsaquo;
          </button>
          <button 
            onClick={() => handlePageChange(totalPages)} 
            disabled={currentPage === totalPages}
          >
            &raquo;
          </button>
        </div>
      )}
      
      <div>
        Всего элементов: {langInfo.length} | Отображено: {processedItems.length} | Страница {currentPage} из {totalPages}
      </div>
    
  
 
    </ContainerList>
  );
};
export default observer(LanguageList);
