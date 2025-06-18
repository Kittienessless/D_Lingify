import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import { useTranslation } from "react-i18next";
import { SearchIcon } from "shared/assets/SearchIcon";
import { IconButton } from "shared/ui/button/IconButton";
import styled from "styled-components";

const SearchBlock = styled.div`
  display: flex;
  width: 100%;
  font-weight: 600;
  border-radius: 13px;
  border: 1px solid rgb(184, 184, 241);
  margin: 5px;
  padding: 3px;
`;
const SearchInput = styled.input`
  background-color: transparent;
  height: 2.3rem;
  padding: 5px;
  width: 100%;
  border-color: transparent;
  color: ${({ theme }) => theme.colors.font};
`;
export type SearchProps = {
  searchHandler: ChangeEventHandler;
};

export const Search = (props: SearchProps) => {
  const { searchHandler } = props;
  const { t } = useTranslation();
  const [value, setValue] = useState(t("LanguageList.text3"));

   
 
  return (
    <SearchBlock>
      <SearchInput
        type="search"
        name="search"
        placeholder={value}
        onChange={(event) => searchHandler(event)}
         
      />
      <IconButton title={"search"} icon={<SearchIcon />}></IconButton>
    </SearchBlock>
  );
};

export default Search;
