import Board from "../../components/tetris/board";
import Title from "../../components/ui/title";
import styled from "@emotion/styled";
import { Col, Row } from "antd";

const TetrisPage = () => {
  return (
    <>
      {/*<Title title={"테트리스"} />*/}
      <Row>
        <Col span={12}>
          <Board />
        </Col>
        <Col span={12}>
          {/*<p>*/}
          {/*  바깥에 이것은 조치의 이 알려지도록 인상을 통행의 뜻으로 맑아지다.*/}
          {/*  절규로 중계방송을 손님부터 있으면 말인 완전에 다른 더 그런 많다.*/}
          {/*  정작을 만나아서 앞다리를, 자기에 보인다. 이국인에서 하반기부터*/}
          {/*  유민에 마당을 한 요청하다 시대다 아니다. 벼도 소녀에서 노려보지*/}
          {/*  없어서 만약에 지내보아 추스르는 출발할 몸으로 비판하다.*/}
          {/*</p>*/}
          {/*<a href="">링크 이동</a>*/}
        </Col>
      </Row>
    </>
  );
};

export default TetrisPage;