import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";
import { RejectedDataType } from "../../types/errorTypes.tsx";
import styled from "styled-components";
import { Text } from "../text";
import ErrorImage from "../../assets/RedErrorIcon.svg";

const FallbackContainer = styled.div`
  .fallback {
    width: 100vw;
    height: 100vh;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    display: flex;

    img {
      max-height: 180px;
    }

    &__title {
      padding: 10px;
      font-size: 22px;
    }

    &__describe {
      padding: 10px;
      font-size: 18px;
    }

    &__link {
      color: var(--text-primary);

      padding: 10px;

      &:hover {
        color: var(--red);
      }

      &:active {
        color: var(--dark-red);
      }
    }
  }
`;

export function Fallback() {
  const error = useRouteError();
  const knownError = error as RejectedDataType;

  if (isRouteErrorResponse(error) && error.status === 401) {
    return (
      <FallbackContainer role="alert">
        <ErrorImage />
        <Text size={"32px"}>Что-то пошло не так</Text>
        <span className="fallback__describe">
          {knownError?.messageError} {knownError?.status}
        </span>
        <Link to="/" className="fallback__link">
          Идти на домашнюю страницу
        </Link>
      </FallbackContainer>
    );
  }
  throw error;
}
