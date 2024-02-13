/*
 * 악보 샘플 작성
 * 도: C 레: D 미: E 파: F 솔: G 라: A 시: B
 * */

export const pianoItems = [
  {
    title: "할아버지의 시계",
    tempo: 120,
    keySignature: "C Major",
    timeSignature: "4/4",
    score: [
      {
        measure: 1,
        notes: {
          right: [
            { pitch: "G4", duration: "half" },
            { pitch: "G4", duration: "half" },
          ],
          left: [{ pitch: "G3", duration: "whole" }],
        },
      },
      {
        measure: 2,
        notes: {
          right: [
            { pitch: "C5", duration: "half" },
            { pitch: "B4", duration: "quarter" },
            { pitch: "C5", duration: "quarter" },
          ],
          left: [{ pitch: "C3", duration: "whole" }],
        },
      },
      {
        measure: 3,
        notes: {
          right: [
            { pitch: "D5", duration: "half" },
            { pitch: "C5", duration: "quarter" },
            { pitch: "D5", duration: "quarter" },
          ],
          left: [{ pitch: "G3", duration: "whole" }],
        },
      },
      {
        measure: 4,
        notes: {
          right: [
            { pitch: "E5", duration: "quarter" },
            { pitch: "E5", duration: "quarter" },
            { pitch: "F5", duration: "quarter" },
            { pitch: "E5", duration: "quarter" },
          ],
          left: [{ pitch: "E3", duration: "whole" }],
        },
      },
      {
        measure: 5,
        notes: {
          right: [
            { pitch: "A4", duration: "half" },
            { pitch: "D5", duration: "quarter" },
            { pitch: "D5", duration: "quarter" },
          ],
          left: [{ pitch: "E3", duration: "whole" }],
        },
      },
      {
        measure: 6,
        notes: {
          right: [
            { pitch: "C5", duration: "half" },
            { pitch: "C5", duration: "quarter" },
            { pitch: "C5", duration: "quarter" },
          ],
          left: [{ pitch: "G3", duration: "whole" }],
        },
      },
      {
        measure: 7,
        notes: {
          right: [
            { pitch: "B4", duration: "half" },
            { pitch: "A4", duration: "quarter" },
            { pitch: "B4", duration: "quarter" },
          ],
          left: [{ pitch: "G3", duration: "whole" }],
        },
      },
      {
        measure: 8,
        notes: {
          right: [
            {
              pitch: "C5",
              duration: "whole",
            },
          ],
          left: [{ pitch: "C3", duration: "whole" }],
        },
      },
    ],
  },
];