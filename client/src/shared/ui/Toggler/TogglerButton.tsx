 
import * as S from './styles.ts';
import { HiMoon } from 'react-icons/hi';
import { FaSun } from 'react-icons/fa';
interface ThemeTogglerProps {
  themeToggler: () => void;
}

export function TogglerButton({ themeToggler }: ThemeTogglerProps) {
  return (
    <S.Container>
      <label htmlFor="checkbox" className="switch">
        <input
          id="checkbox"
          type="checkbox"
          onClick={themeToggler}
          onChange={() => false}
          checked={window.localStorage.getItem('theme') === 'light'}
        />
        <S.Icons className="slider round">
          {window.localStorage.getItem('theme') !== 'light' ? (
            <>
             <HiMoon style={{ marginLeft: '6.3px', height: '10px' }} />
            </>
          ) : (
            <>
              <FaSun size={0} style={{ marginLeft: '41px', height: '10px' }} />
            </>
          )}
        </S.Icons>
      </label>
    </S.Container>
  );
}

export default TogglerButton;