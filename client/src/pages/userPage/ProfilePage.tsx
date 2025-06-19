import { observer } from "mobx-react-lite";
import styled from "styled-components";
import ProfileWidget  from "widgets/profileWidget/ui/ProfileWidget.tsx";
const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.bg};
  width: 100%;
  height: 100%;
`;
const Container = styled.div`
  margin: 10px;
  position: relative;
  padding: 10px;
  left: 50%;
  top: 50%;
  transform: translateY(-50%);
  transform: translateX(-50%);
  width: 80vw;
  margin-top: 100px;
 `;

 const ProfilePage = () => {
  return (
    <Wrapper>
    <Container>
      <ProfileWidget></ProfileWidget>
    </Container>
    </Wrapper>

  );
};
export default ProfilePage