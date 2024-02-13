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

export interface PianoKey {
  name: Note;
  octave: number;
  freq: number;
}

// 주파수(Hz) = 2^(octave - 1) * 55 * 2^((noteIndex-10) / 12)
const NOTES = ["c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"];

export const createNote = () => {
  let pianoKeys: PianoKey[] = [];

  for (let ova = 0; ova < 9; ova++) {
    for (let i in NOTES) {
      const noteIndex = Number(i);

      if ((ova === 0 && noteIndex < 9) || (ova === 8 && noteIndex > 0))
        continue;

      pianoKeys.push({
        name: NOTES[i] as Note,
        octave: ova,
        freq: Math.pow(2, ova - 1) * 55 * Math.pow(2, (noteIndex - 10) / 12),
      });
    }
  }

  return pianoKeys;
};

export const PIANO_KEYS = createNote();