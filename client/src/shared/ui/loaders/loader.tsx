import styled from "styled-components";
import "./loader.css";

const LoaderWraper = styled.div`
  margin: 0 auto;
  background-color: transparent; 
  margin-top: 5em;
`

export const Loader = () => {
  return <LoaderWraper><span className="loader"></span></LoaderWraper>;
};
