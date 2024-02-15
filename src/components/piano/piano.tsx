import { Col, Row, Slider, Flex, Typography, Select, Button } from "antd";
import { useRef, useState } from "react";
import { Duration, getDuration, PIANO_KEYS } from "@components/piano/util";
import styled from "@emotion/styled";
import { SONGS } from "../../data/piano";

const { Text } = Typography;

const Piano = () => {
  const [volume, setVolume] = useState(0.5);
  const [currentFreq, setCurrentFreq] = useState(0);
  const [selectedSong, setSelectedSong] = useState("");
  const audioContext = useRef(
    new (window.AudioContext || window.webkitAudioContext)(),
  ).current;

  const onChange = (newValue: number) => {
    setVolume(newValue);
  };

  const playPiano = (freq: number) => {
    const osc: OscillatorNode = audioContext.createOscillator();
    const mainGainNode = audioContext.createGain();

    mainGainNode.gain.value = 0; // 초기 음량은 0으로 설정
    mainGainNode.connect(audioContext.destination);

    osc.type = "sine"; // 오실레이터 파형 설정
    osc.frequency.setValueAtTime(freq, audioContext.currentTime);

    osc.connect(mainGainNode);

    // Attack-Decay-Sustain-Release (ADSR) envelope 적용
    const attackTime = 0.01; // Attack 시간 (초)
    const decayTime = 0.1; // Decay 시간 (초)
    const sustainLevel = 0.5; // Sustain 레벨 (0에서 1 사이)
    const releaseTime = 0.5; // Release 시간 (초)

    const now = audioContext.currentTime;

    // Attack
    mainGainNode.gain.setValueAtTime(0, now);
    mainGainNode.gain.linearRampToValueAtTime(1, now + attackTime);

    // Decay
    mainGainNode.gain.linearRampToValueAtTime(
      sustainLevel,
      now + attackTime + decayTime,
    );

    // Sustain (유지)
    mainGainNode.gain.setValueAtTime(
      sustainLevel,
      now + attackTime + decayTime,
    );

    // Release
    mainGainNode.gain.linearRampToValueAtTime(
      0,
      now + attackTime + decayTime + releaseTime,
    );

    osc.start();
    osc.stop(now + attackTime + decayTime + releaseTime); // 소리가 끝나는 시점을 설정

    return osc;
  };

  const onPressNote = async (freq: number, duration?: number) => {
    const osc = playPiano(freq);
    const time = duration ? duration : 0.3;

    await audioContext.resume();
    await new Promise((resolve) => setTimeout(resolve, time * 1000));
    osc.stop(audioContext.currentTime + time);
  };

  const onPlaySong = async () => {
    const currentSong = SONGS.filter((song) => song.id === selectedSong)[0];

    const songs = currentSong.score.map((notes) => notes.notes);

    for (let song of songs) {
      for (let note of song) {
        const { freq } = PIANO_KEYS.find(
          (key) => key.pitch === note.pitch && key.octave === note.octave,
        ) || { freq: 0 };

        const duration = getDuration(note.duration as Duration);

        setCurrentFreq(freq);
        await onPressNote(freq, duration);
      }
    }

    setCurrentFreq(0);
  };

  const getSongOptions = () => {
    return SONGS.map((song) => {
      return { label: song.title, value: song.id };
    });
  };

  const onSelectSong = (option: HTMLSelectElement) => {
    setSelectedSong(String(option));
  };

  console.log(currentFreq);

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
              options={getSongOptions()}
              style={{ width: "200px", marginRight: "10px" }}
              onChange={onSelectSong}
            />
            <Button onClick={onPlaySong}>연주 시작</Button>
          </Flex>
        </Col>
      </Row>
      <Row>
        <PianoKeyboard>
          {PIANO_KEYS.map((note) => (
            <PianoKey
              className={note.pitch.includes("#") ? "black" : "white"}
              onClick={() => onPressNote(note.freq)}
              isActive={note.freq === currentFreq}
            >
              {!note.pitch.includes("#") && (
                <span className="note">
                  {note.pitch}
                  {note.octave}
                </span>
              )}
            </PianoKey>
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
`;

const PianoKey = styled("button")<{ isActive: boolean }>(({ isActive }) => ({
  position: "relative",
  fontSize: "10px",
  ".note": {
    position: "absolute",
    left: "50%",
    bottom: "3px",
    transform: "translateX(-50%)",
    fontSize: "10px",
  },

  "&.white": {
    width: "32px",
    height: "100px",
    backgroundColor: isActive ? "dodgerblue" : "#ffffff",
    borderLeft: "1px solid #e2e2e2",
    "&:active": {
      backgroundColor: "dodgerblue",
    },
  },
  "&.black": {
    position: "relative",
    zIndex: 10,
    display: "block",
    margin: "0 -7px",
    width: "20px",
    height: "60px",
    backgroundColor: isActive ? "red" : "#000000",

    borderRadius: "0 0 2px 2px",
    "&:active": {
      backgroundColor: "red",
    },
  },
}));