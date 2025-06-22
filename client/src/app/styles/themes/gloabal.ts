import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    ...
  }

  *::before,
  *::after {
    ...
  }
ul {
  list-style: none; /* Убираем маркеры списка, если нужно */
  padding: 0;       /* Убираем внутренние отступы */
  margin: 0;        /* Убираем внешние отступы */
}

li {
   text-decoration: none;      /* Без подчеркивания */
  transition: none;           /* Отключаем переходы при наведении */
}

/* Если нужно, чтобы цвет не менялся при наведении, можно добавить: */
li:hover {
 }
  body {
    ...
  }
 
`;
