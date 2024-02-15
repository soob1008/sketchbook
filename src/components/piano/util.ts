import { SONGS } from "../../data/piano";

export type Note =
  | "c"
  | "c#"
  | "d"
  | "d#"
  | "e"
  | "f"
  | "f#"
  | "g"
  | "g#"
  | "a"
  | "a#"
  | "b";

export type Duration = "eight" | "quarter" | "half" | "whole";

export interface PianoKey {
  name: Note;
  octave: number;
  freq: number;
}

// 주파수(Hz) = 2^(octave - 1) * 55 * 2^((noteIndex-10) / 12)
const NOTES = ["c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"];

export const createNote = () => {
  let pianoKeys: PianoKey[] = [];

  for (let octave = 0; octave < 9; octave++) {
    for (let i in NOTES) {
      const noteIndex = Number(i);

      if ((octave === 0 && noteIndex < 9) || (octave === 8 && noteIndex > 0))
        continue;

      pianoKeys.push({
        name: NOTES[i] as Note,
        octave,
        freq: Math.pow(2, octave - 1) * 55 * Math.pow(2, (noteIndex - 10) / 12),
      });
    }
  }

  return pianoKeys;
};

export const PIANO_KEYS = createNote();

export const getDuration = (type: Duration) => {
  switch (type) {
    case "eight":
      return 0.3;
    case "quarter":
      return 0.5;
    case "half":
      return 0.8;
    case "whole":
      return 1;
  }
};