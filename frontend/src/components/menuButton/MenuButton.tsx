import styled from 'styled-components/native';
import { widthPercent } from '../../config/dimension/Dimension';
import { TouchableOpacity } from 'react-native';
import * as Typo from '../typography/Typography';
import * as Color from '../../config/color/Color';

interface MenuButtonProps {
  size: string;
  children: React.ReactNode;
  title: string;
  backgroundColor?: string;
  borderColor?: string;
  onPressButton: () => void;
}

const StyledContainer = styled.View<Pick<MenuButtonProps, 'size'>>`
  width: ${(props) => (props.size === 'small' ? widthPercent * 60 : widthPercent * 80)}px;
`;

const StyledButton = styled.View<Pick<MenuButtonProps, 'size'>>`
  border-radius: 10px;
  width: 100%;
  height: ${(props) => (props.size === 'small' ? widthPercent * 60 : widthPercent * 80)}px;
  background-color: ${(props) => (props.size === 'small' ? Color.GRAY100 : Color.GREEN50)};
  border: ${(props) => (props.size === 'small' ? `1px solid ${Color.GRAY200}` : `1px solid ${Color.GREEN50}`)};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const MenuButton = (props: MenuButtonProps) => {
  return (
    <StyledContainer size={props.size}>
      <TouchableOpacity onPress={props.onPressButton} style={{ flexDirection: 'column', alignItems: 'center', rowGap: widthPercent * 4 }}>
        <StyledButton size={props.size}>{props.children}</StyledButton>
        {props.size === 'small' ? <Typo.Detail1_M>{props.title}</Typo.Detail1_M> : <Typo.BODY4_M>{props.title}</Typo.BODY4_M>}
      </TouchableOpacity>
    </StyledContainer>
  );
};

export default MenuButton;
