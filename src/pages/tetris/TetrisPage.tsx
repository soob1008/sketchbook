import Board from "../../components/tetris/board";

import { Col, Row } from "antd";

const TetrisPage = () => {
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

export default TetrisPage;