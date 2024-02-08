import MineSweeperBoard from "@components/minesweeper/minesweeperBoard";
import { Typography } from "antd";
import styled from "@emotion/styled";
const { Title } = Typography;
const MineSweeper1Page = () => {
  return (
    <MineSweeperWrapper>
      <Title level={3}>Minesweeper</Title>
      <MineSweeperBoard />
    </MineSweeperWrapper>
  );
};

export default MineSweeper1Page;

const MineSweeperWrapper = styled("div")`
  display: inline-block;
  padding: 20px;
  border-radius: 10px;
  background-color: #c2c6ff;
`;