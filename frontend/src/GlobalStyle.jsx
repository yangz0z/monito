import { createGlobalStyle } from "styled-components";
import styledReset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${styledReset};
  * {
    box-sizing: border-box;
  }
  body {
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: rgb(243 244 246 / var(--tw-bg-opacity, 1));
    background-image: url("data:image/svg+xml,%3Csvg width='42' height='44' viewBox='0 0 42 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='Page-1' fill='none' fill-rule='evenodd'%3E%3Cg id='brick-wall' fill='%234b5563' fill-opacity='0.06'%3E%3Cpath d='M0 0h42v44H0V0zm1 1h40v20H1V1zM0 23h20v20H0V23zm22 0h20v20H22V23z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    color: rgb(75 85 99 / var(--tw-text-opacity, 1));
  }
`;

export default GlobalStyles;
