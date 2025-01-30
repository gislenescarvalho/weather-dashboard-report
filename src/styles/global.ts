import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --color-neutral-white: #ffff;
    --color-base-white:  #fafafa;
    --color-gray-100:#E7ECEE;
    --color-gray-300: #bac8ce;
    --color-gray-500: #9db0b9;
    --color-gray-600: #8da3ae;
    --color-gray-700: #8ea4af;
    --color-gray-800: #637883;
    --color-gray-900: #303036;
    --color-base-black: #303036;
    --color-blue-100: #d9f2ff;
    --color-green-300: #7eff94;
    --color-green-800: #008a17;
    --color-primary-blue: #0088cc;
    --color-blue-800: #0070AB;
    --color-blue-100: #d9f2ff;
    --color-medium-champagne: #ffeaa4;
    --color-secondary-green: #00a61c;
    --color-neutral-silver: #cccccc;
    --color-red-800: #c53030;
    --color-red-300: #ff7b7b;
    --color-neutral-light-red:#FFCD93;
  }

  html,body{
    font-size: 10px;
  }

  .apexcharts-xaxis-label,.apexcharts-yaxis-label{
    color: #303036 !important;
  }
`;

export default GlobalStyles;
