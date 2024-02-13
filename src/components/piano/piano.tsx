import { Col, Row, Slider, Flex, Typography, Select, Button } from "antd";
import { useState } from "react";
import { Note, NOTES } from "@components/piano/util";
import styled from "@emotion/styled";

const { Text } = Typography;

const Piano = () => {
  const [volume, setVolume] = useState(0.5);
  const audioContext = new AudioContext();

  console.log("audio", audioContext);

  console.log("creat notes", NOTES);
  const onChange = (newValue: number) => {
    setVolume(newValue);
  };

  return (
    <div>
      <Row>
        <Col span={4}>
          <Flex align="center">
            <Text>볼륨</Text>
            <Slider
              min={0}
              max={1}
              onChange={onChange}
              value={volume}
              style={{ width: "100px", marginLeft: "20px" }}
            />
          </Flex>
        </Col>
        <Col span={12} style={{ marginLeft: "30px" }}>
          <Flex>
            <Select
              placeholder="연주곡 선택"
              options={[
                { value: "watch", label: <span>할아버지의 시계</span> },
                { value: "1", label: <span>sample</span> },
              ]}
              style={{ width: "200px", marginRight: "10px" }}
            />
            <Button>연주 시작</Button>
          </Flex>
        </Col>
      </Row>
      <Row>
        {/*   건반 그리기 - 흰 건반, 검은 건반 구분해서 그려야 한다.*/}
        <PianoKeyboard>
          {NOTES.map((notes: Note[], index) => (
            <>
              {notes.map((note: Note) => (
                <PianoKeyWhite>
                  {note.sharp && <PianoKeyBlack />}
                  <span className="major">
                    {note.major}
                    {index}
                  </span>
                </PianoKeyWhite>
              ))}
            </>
          ))}
        </PianoKeyboard>
      </Row>
    </div>
  );
};

export default Piano;

const PianoKeyboard = styled("div")`
  display: flex;
  margin-top: 50px;
  border: 1px solid red;
`;

const PianoKeyWhite = styled("div")(() => ({
  position: "relative",
  width: "20px",
  height: "100px",
  backgroundColor: "white",
  borderRight: "1px solid #e2e2e2",
  ".major": {
    position: "absolute",
    bottom: "5px",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: "10px",
    fontWeight: 700,
  },
}));

const PianoKeyBlack = styled("div")(() => ({
  position: "absolute",
  zIndex: 10,
  top: 0,
  right: "-6px",
  width: "12px",
  height: "60px",
  backgroundColor: "black",
}));