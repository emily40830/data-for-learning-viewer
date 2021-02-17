import SearchRounded from '@material-ui/icons/SearchRounded';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  align-items: center;

  background-color: var(--background-color-dark);
  border-radius: 8px;
  padding-left: 16px;

  color: var(--text-color-secondary);
`;

const StyledInput = styled.input`
  border: none;
  background-color: transparent;
  padding: 16px;
  width: 100%;
  height: 100%;
  outline: none;
  color: var(--text-color-secondary);
  ::placeholder {
    color: var(--text-color-secondary);
  }
`;

const SearchInput = ({ ...props }) => {
  return (
    <StyledDiv>
      <SearchRounded color="inherit" />
      <StyledInput {...props} />
    </StyledDiv>
  );
};

export default SearchInput;
