import { Col, Row, Slider, Flex, Typography, Select, Button } from "antd";
import { MouseEvent, useState } from "react";
import { createNote, Note, PIANO_KEYS } from "@components/piano/util";
import styled from "@emotion/styled";

const { Text } = Typography;

const Piano = () => {
  const [volume, setVolume] = useState(0.5);
  // 현재 재생 중인 음을 담는 배열
  const [oscList, setOscList] = useState<number[]>([]);

  const audioContext: AudioContext = new AudioContext();
  let mainGainNode: GainNode;
  const onChange = (newValue: number) => {
    setVolume(newValue);
  };

  const initPiano = () => {
    mainGainNode = audioContext.createGain();
    mainGainNode.gain.value = volume;

    // mainGainNode.connect(audioContext.destination);
  };

  const getOscNode = (freq: number) => {
    let oscillator: OscillatorNode = audioContext.createOscillator();

    // oscillator.type = "sine"; default : sine
    // OscillatorNode.setPeriodicWave(PeriodicWave) 메서드 -> 원하는 파형을 가진 소리를 만들 수 있다.

    oscillator.frequency.value = freq;

    oscillator.connect(mainGainNode).connect(audioContext.destination);

    // oscillator.start(); // 디폴트로 주파수 440 Hz인 sine 파의 음을 출력
    console.log("osc", oscillator);

    return oscillator;
  };

  initPiano();

  const onClickPlayPiano = async (
    event: MouseEvent,
    major: string,
    freq: number,
  ) => {
    const osc = getOscNode(freq);
    // console.log(audioContext.state);
    await audioContext.resume();
    osc.start();
  };

  const onPressNote = (event: MouseEvent, major: string, freq: number) => {
    const osc = getOscNode(freq);

    osc.start();
  };

  const onLeaveNote = (event: MouseEvent, major: string, freq: number) => {
    const osc = getOscNode(freq);
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
        <PianoKeyboard>
          {PIANO_KEYS.map((note) => (
            <button className={note.name.includes("#") ? "black" : "white"}>
              {!note.name.includes("#") && (
                <span className="note">
                  {note.name}
                  {note.octave}
                </span>
              )}
            </button>
          ))}
        </PianoKeyboard>
      </Row>
    </div>
  );
};

export default Piano;

const PianoKeyboard = styled("div")`
  overflow: hidden;
  display: flex;
  margin-top: 50px;
  padding: 10px;
  background-color: #000000;
  border-radius: 10px;

  button {
    position: relative;
    font-size: 10px;
    .note {
      position: absolute;
      left: 50%;
      bottom: 3px;
      transform: translateX(-50%);
      font-size: 10px;
    }
  }

  .white {
    width: 30px;
    height: 100px;
    background-color: #ffffff;
    border-left: 1px solid #e2e2e2;
  }
  .black {
    position: relative;
    z-index: 10;
    display: block;
    margin: 0 -7px;
    width: 14px;
    height: 60px;
    background-color: #000000;
    border-radius: 0 0 2px 2px;
  }
`;

const PianoKeyItem = styled("button")(() => ({
  position: "relative",
  width: "30px",
  height: "100px",
  backgroundColor: "white",
  borderRight: "1px solid #e2e2e2",
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