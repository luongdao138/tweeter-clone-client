import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

    :root{
       --bg-main: ${({ theme }) => theme.background.main};
       --bg-sec: ${({ theme }) => theme.background.component};
       --primary: ${({ theme }) => theme.colors.component.primary};
       --text-pri: ${({ theme }) => theme.colors.text.primary};
       --text-up-pri: ${({ theme }) => theme.colors.text.u_primary};
       --text-med-pri: ${({ theme }) => theme.colors.text.med_primary};
       --text-light-pri: ${({ theme }) => theme.colors.text.light_primary};
       --text-slight-pri: ${({ theme }) => theme.colors.text.s_light_primary};
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Poppins', sans-serif;
    }

    body {
      background-color: var(--bg-main);
    }

    button {
      outline: none;
      cursor: pointer;
      border: none;
    }
   
    input {
      outline: none;
    }

    a {
      text-decoration: none;
    }

    li {
     list-style: none;
    }

    ::-webkit-scrollbar{
       width: 5px;
    }

    ::-webkit-scrollbar-thumb{
      background-color: var(--text-light-pri);
      border-radius: 30px;
    }

    ::-webkit-scrollbar-track{

    }
`;

export const Wrapper = styled.div`
  width: 95%;
  max-width: 1100px;
  margin: auto;
  display: flex;
`;

export default GlobalStyle;
