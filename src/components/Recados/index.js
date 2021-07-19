import styled from "styled-components";
import Box from "../Box";

export const RecadosBoxWrapper = styled(Box)`
  ul {
    max-height: 220px;
    list-style: none;
  }

  img {
    float: left;
    margin: 5px;
    border-radius: 10px;
    height: 100px;
  }

  a {
    color: #000;
    text-decoration: none;
  }

  h3 {
    font-size: 15px;
    color: #db9807;
    padding: 10px;
    margin-right: auto;
  }

  p {
    font-size: 13px;
  }

  .clear {
    clear: both;
  }
`;
