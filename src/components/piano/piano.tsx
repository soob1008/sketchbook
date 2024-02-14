import { Col, Row, Slider, Flex, Typography, Select, Button } from "antd";
import { useState } from "react";
import { createNote, Note, PIANO_KEYS } from "@components/piano/util";
import styled from "@emotion/styled";

// 파일 분리
declare global {
  interface Window {
    AudioContext: typeof AudioContext;
    webkitAudioContext: typeof AudioContext;
  }
}

const { Text } = Typography;

const Piano = () => {
  const [volume, setVolume] = useState(0.5);

  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  let mainGainNode = audioContext.createGain();

  console.log(audioContext);

  const onChange = (newValue: number) => {
    setVolume(newValue);
  };

  const playPino = (freq: number) => {
    const osc: OscillatorNode = audioContext.createOscillator();

    mainGainNode.gain.value = volume;
    mainGainNode.connect(audioContext.destination);

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, audioContext.currentTime); // 예시로 440Hz (라 음)
    mainGainNode.gain.setValueAtTime(0.5, audioContext.currentTime);

    osc.connect(mainGainNode).connect(audioContext.destination);

    osc.start();

    return osc;
  };

  const onPressNote = (freq: number) => {
    const osc = playPino(freq);

    audioContext.resume().then(() => {
      osc.stop(audioContext.currentTime + 0.3);
    });
  };

  const onLeaveNote = (freq: number) => {
    // audioContext.suspend().then(() => {});
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
            <button
              className={note.name.includes("#") ? "black" : "white"}
              onMouseDown={() => onPressNote(note.freq)}
              onMouseUp={() => onLeaveNote(note.freq)}
            >
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
    &:active {
      background-color: dodgerblue;
    }
  }
  .black {
    position: relative;
    z-index: 10;
    display: block;
    margin: 0 -5px;
    width: 14px;
    height: 60px;
    background-color: #000000;
    border-radius: 0 0 2px 2px;
    &:active {
      background-color: red;
    }
  }
`;