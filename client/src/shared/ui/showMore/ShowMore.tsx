import React, { useState } from "react";
import { Button } from "../button/index.tsx";
import { IconButton } from "../button/IconButton";
import styled from "styled-components";
import { Text } from "../text/index.tsx";
import { ArrowDownIcon } from "shared/assets/ArrowDownIcon.tsx";
import { borderRadius } from "shared/lib/borderRadius.tsx";
import { Space } from "../space/Space.tsx";
import { Divider } from "../divider/divider.tsx";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

interface ShowMoreProps {
  text: string;
  FullText: string;
  src: any;
}

const ShowMoreContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.container};
  color: ${({ theme }) => theme.colors.font};
  padding: 1em;
  margin-bottom: 1em;
  ${borderRadius.m};
  width: 100%;
  height: 100%;
  margin-left: 5em;
  @media (width <= 1350px) {
    width: 100%;
    margin-left: 0;
  }
`;

const Card = styled.div`
 
  align-items: center;
  background-color: ${({ theme }) => theme.colors.container};
  color: ${({ theme }) => theme.colors.font};
  padding: 1em;
  margin-bottom: 1em;
  ${borderRadius.m};
 
`;
const ImageCard = styled.img`
  max-width: 15%;

  @media (width <= 1350px) {
    max-width: 10%;
  }
`;
const ShowMore: React.FC<ShowMoreProps> = ({
  text,
  FullText,
  src,
}: ShowMoreProps) => {
  const [showFullText, setShowFullText] = useState(false);

  const toggleShowMore = () => {
    setShowFullText(!showFullText);
  };

  return (
    <>
      <ShowMoreContainer>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Text weight={400} size={"16pt"}>
            {text}
          </Text>
          <IconButton
            icon={showFullText ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            title="Show more"
            onClick={toggleShowMore}
          ></IconButton>
        </div>

        {showFullText && (
          <Card>
            <Space height="s" />
            <Divider></Divider>
            <Space height="s" />
            <div style={{ display: "flex" }}>
              <Text weight={400} size={"18px"}>
                {FullText}
              </Text>

              <ImageCard src={src} alt="" />
            </div>
              
          </Card>
        )}
      </ShowMoreContainer>
    </>
  );
};

export default ShowMore;
