import styled from "styled-components";
import Box from "../Box";

export const RecadosBoxWrapper = styled(Box)`
  li {
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-template-rows: 20px 1fr;
    grid-gap: 10px;

    text-decoration: none;
    list-style: none;
    background: #f3f4de;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 10px;
  }

  img {
    grid-column: 1/2;
    grid-row: 1/3;
    border-radius: 8px;
  }

  a {
    text-decoration: none;
  }

  h3 {
    line-height: 30px;
    font-size: 15px;
    grid-column: 2/3;
    color: #eba124;
  }

  p {
    font-size: 13px;
    color: #000;
  }
`;
