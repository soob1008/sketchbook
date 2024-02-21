import Board from "@components/tetris/1/board";

import { Col, Row } from "antd";

const Tetris1Page = () => {
  return (
    <>
      <Row>
        <Col span={12}>
          <Board />
        </Col>
        <Col span={12}></Col>
      </Row>
    </>
  );
};

export default Tetris1Page;