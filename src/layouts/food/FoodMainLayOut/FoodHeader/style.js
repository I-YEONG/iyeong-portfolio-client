import { css } from "@emotion/react";
// import { theme } from "../../../style/theme";

export const MainLayOutHeaderStyled = (isPc) => css`
  height: 70px;
  border-bottom: 1px solid var(--food-gray-3);
  background-color: var(--food-gray-0);

  /* & .logo {
    width: 50px;
    height: 50px;
    background-image: url("/project/foodmap/image/logo/logo-1.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: inline-block;
  } */

  & > div {
    width: 75%;
    height: 100%;
    max-width: 1440px;
    margin: 0 auto;
    align-items: center;
    flex-wrap: wrap;
  }

  & .title-box {
    font-size: 1.6rem;
    font-weight: 700;
  }

  & nav {
    width: 100%;
    max-width: 420px;
    display: flex;
    align-items: center;
  }

  & nav ul {
    font-size: 0.95rem;
    width: 100%;
    max-width: 420px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow-x: auto;
  }

  & nav ul li {
    cursor: pointer;
    padding: 1rem 0.6rem;
  }

  /* 핸드폰 */
  ${!isPc &&
  css`
    & nav ul li {
      padding: 0;
    }

    height: unset;
    border-bottom: 1px solid var(--food-gray-2);

    & > div {
      width: 100%;
    }

    & nav {
      width: 100%;
      max-width: 100%;
      justify-content: space-around;
      border-top: 1px solid var(--food-gray-3);
    }

    & .title-box {
      margin: 0 auto;
      height: 60px;
      display: flex;
      align-items: center;
      font-size: 1.4rem;
      font-weight: 700;
    }

    & nav ul {
      padding: 0.7rem 2rem;
      font-size: 0.9rem;
    }
  `}
`;
