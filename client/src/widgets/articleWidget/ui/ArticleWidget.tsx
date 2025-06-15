import React from "react";
import { borderRadius } from "shared/lib/borderRadius";
import { Divider } from "shared/ui/divider";
import { Space } from "shared/ui/space";
import { Text } from "shared/ui/text";
import styled from "styled-components";
import Girl1 from "../../../shared/assets/G1.svg";
import Girl2 from "../../../shared/assets/GIRL2.svg";
import Girl3 from "../../../shared/assets/business-person-with-a-resolved-expression-svgrepo-com.svg";
import Girl4 from "../../../shared/assets/sad.svg";
import Girl5 from "../../../shared/assets/a-woman-who-uses-a-computer-negative-svgrepo-com.svg";
import Girl6 from "../../../shared/assets/happy-woman-svgrepo-com.svg";
import { Link, Element } from "react-scroll";
import ShowMore from "shared/ui/showMore/ShowMore";

const Container = styled.div`
  display: flex;
  justify-content: space-between;

  @media (width <= 1350px) {
    flex-direction: column;
  }
`;
const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.container};
  color: ${({ theme }) => theme.colors.font};
  padding: 1em;
  margin-bottom: 1em;
  ${borderRadius.m};
  width: 80%;
  height: 100%;
  margin-left: 5em;
  @media (width <= 1350px) {
    width: 100%;
    margin-left: 0;
  }
`;

const ImageCard = styled.img`
  max-width: 15%;

  @media (width <= 1350px) {
    max-width: 10%;
  }
`;
const Menu = styled.div`
  color: ${({ theme }) => theme.colors.font};
  background-color: ${({ theme }) => theme.colors.container};
  ${borderRadius.m};
  min-width: 15em;
  text-wrap: wrap;
  padding: 2em;
  margin: 3em;
  height: 100%;
  @media (width <= 1350px) {
    width: 100%;
    margin: 0;
    margin-bottom: 1em;
  }
  & :hover {
    cursor: pointer;
  }
`;
export const ArticleWidget: React.FC = () => {
  return (
    <>
      {" "}
      <Text weight={"bold"} height="m" size={"40px"} centerHorizontally>
        Руководство
      </Text>
      <Space height="s" />
      <Divider></Divider>
      <Space height="s" />
      <Container>
        <Menu>
          <ul>
            <li>
              <Link to="section1" smooth={true} duration={500}>
                Создание языка
              </Link>
            </li>
            <li>
              <Link to="section2" smooth={true} duration={500}>
                Редактирование языка
              </Link>{" "}
            </li>
            <li>
              <Link to="section3" smooth={true} duration={500}>
                Создание языка с помощью нейронных сетей
              </Link>{" "}
            </li>
            <li>
              <Link to="section4" smooth={true} duration={500}>
                Управление языками
              </Link>{" "}
            </li>
            <li>
              <Link to="section5" smooth={true} duration={500}>
                Управление аккаунтом
              </Link>{" "}
            </li>
            <li>
              <Link to="section6" smooth={true} duration={500}>
                Настройки сайта
              </Link>{" "}
            </li>
          </ul>
        </Menu>

        <div>
          <Element name="section1">
            <ShowMore
              text="Создание языка"
              FullText="Перейдите в раздел, где можно создать новый язык. Введите название языка — например, Мой язык. Потом настройте его: укажите, сколько слов в словаре, как будут строиться предложения, какие части речи есть (существительные, глаголы и так далее). Выберите стиль — например, официальный или дружелюбный. Определите правила письма и произношения. Можно указать, какие буквы используются. После того как всё заполните и проверите, нажмите кнопку Создать. Новый язык появится в вашем списке"
              src={Girl1}
            />
          </Element>
          <Element name="section2">
            <ShowMore
              text="Редактирование языка"
              FullText="Выберите язык из списка своих языков. Нажмите кнопку Редактировать. В открывшемся окне вы можете изменить название языка, правила его построения, стиль или добавить новые слова. Внесите нужные изменения и сохраните их. Всё обновится сразу. Если передумали — есть кнопка Отмена, чтобы выйти без сохранения."
              src={Girl2}
            />
          </Element>
          <Element name="section3">
            <ShowMore
              text="Создание языка с помощью нейронных сетей"
              FullText="Перейдите в раздел для автоматического создания языка с помощью искусственного интеллекта. Заполните поля: название языка, сколько слов должно быть в словаре, какой стиль и грамматика вам нужны. Можно выбрать параметры для обучения нейросети или оставить стандартные настройки. Нажмите кнопку Генерировать и подождите немного — нейросеть создаст язык по вашим параметрам. После этого вы можете проверить результат и сохранить его или изменить вручную."
              src={Girl3}
            />
          </Element>
          <Element name="section4">
            <ShowMore
              text="Управление языками"
              FullText="Перейдите в раздел, где можно создать новый язык. Введите название языка — например, Мой язык. Потом настройте его: укажите, сколько слов в словаре, как будут строиться предложения, какие части речи есть (существительные, глаголы и так далее). Выберите стиль — например, официальный или дружелюбный. Определите правила письма и произношения. Можно указать, какие буквы используются. После того как всё заполните и проверите, нажмите кнопку Создать. Новый язык появится в вашем списке"
              src={Girl4}
            />
          </Element>
          <Element name="section5">
            <ShowMore
              text="Управление аккаунтом"
              FullText="Чтобы начать работу на сайте — войдите в свой аккаунт, указав логин и пароль. Когда закончите работу — выйдите через кнопку Выйти. Если хотите удалить свой аккаунт — перейдите в настройки профиля и выберите опцию удаления аккаунта; подтвердите удаление по электронной почте или коду подтверждения. После этого все ваши данные исчезнут навсегда."
              src={Girl5}
            />
          </Element>
          <Element name="section6">
            <ShowMore
              text="Настройки сайта"
              FullText="Перейдите в раздел настроек сайта. Там можно выбрать язык интерфейса: русский или английский — чтобы сайт был понятнее вам. Также можно выбрать тему оформления: светлую или тёмную — чтобы было комфортно смотреть на экран. Есть дополнительные настройки: например, включить уведомления или изменить формат даты и времени. После выбора не забудьте сохранить изменения. Если нужно что-то уточнить или сделать ещё проще — скажите!"
              src={Girl5}
            />
          </Element>
        </div>
      </Container>
    </>
  );
};
