import React from "react";
import styled from "styled-components";

export interface IProgressBar {
   progress: number;
}

const ProgressBar = ({progress} : IProgressBar) => {
  const ContainerStyles = styled.div`
    height: 20,
    width: "100%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 50
  `

  const FillerStyles = styled.div`
    height: "100%";
    width: ${progress}%;
    background-color: ${({ theme }) => theme.colors.primary};;
    border-radius: "inherit";
    text-align: "right";

  `

  const labelStyles = {
    padding: 5,
    color: "white",
    fontWeight: "bold"
  };

  return (
    <ContainerStyles>
      <FillerStyles>
        <span style={labelStyles}>{progress}%</span>
      </FillerStyles>
    </ContainerStyles>
  );
};

export default ProgressBar;
