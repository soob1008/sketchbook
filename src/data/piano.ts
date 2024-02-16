/*
 * 악보 샘플 작성
 * 도: c 레: d 미: e 파: f 솔: g 라: a 시: b
 * */

export const SONGS = [
  {
    id: "happyBirthday",
    title: "생일 축하합니다",
    keySignature: "C Major",
    timeSignature: "4/3",
    score: [
      {
        measure: 1,
        notes: [
          {
            pitch: "g",
            octave: 4,
            duration: "eight",
          },
          {
            pitch: "g",
            octave: 4,
            duration: "eight",
          },
        ],
      },
      {
        measure: 2,
        notes: [
          {
            pitch: "a",
            octave: 4,
            duration: "quarter",
          },
          {
            pitch: "g",
            octave: 4,
            duration: "quarter",
          },
          {
            pitch: "c",
            octave: 5,
            duration: "quarter",
          },
        ],
      },
      {
        measure: 3,
        notes: [
          {
            pitch: "b",
            octave: 4,
            duration: "half",
          },
          {
            pitch: "g",
            octave: 4,
            duration: "eight",
          },
          {
            pitch: "g",
            octave: 4,
            duration: "eight",
          },
        ],
      },
      {
        measure: 4,
        notes: [
          {
            pitch: "a",
            octave: 4,
            duration: "quarter",
          },
          {
            pitch: "g",
            octave: 4,
            duration: "quarter",
          },
          {
            pitch: "d",
            octave: 5,
            duration: "quarter",
          },
        ],
      },
      {
        measure: 5,
        notes: [
          {
            pitch: "c",
            octave: 5,
            duration: "half",
          },
          {
            pitch: "g",
            octave: 4,
            duration: "eight",
          },
          {
            pitch: "g",
            octave: 4,
            duration: "eight",
          },
        ],
      },
      {
        measure: 6,
        notes: [
          {
            pitch: "g",
            octave: 5,
            duration: "quarter",
          },
          {
            pitch: "e",
            octave: 5,
            duration: "quarter",
          },
          {
            pitch: "c",
            octave: 5,
            duration: "quarter",
          },
        ],
      },
      {
        measure: 7,
        notes: [
          {
            pitch: "b",
            octave: 4,
            duration: "quarter",
          },
          {
            pitch: "a",
            octave: 4,
            duration: "quarter",
          },
          {
            pitch: "f",
            octave: 5,
            duration: "eight",
          },
          {
            pitch: "f",
            octave: 5,
            duration: "eight",
          },
        ],
      },
      {
        measure: 8,
        notes: [
          {
            pitch: "e",
            octave: 5,
            duration: "quarter",
          },
          {
            pitch: "c",
            octave: 5,
            duration: "quarter",
          },
          {
            pitch: "d",
            octave: 5,
            duration: "quarter",
          },
        ],
      },
      {
        measure: 9,
        notes: [
          {
            pitch: "c",
            octave: 5,
            duration: "half",
          },
        ],
      },
    ],
  },
  {
    id: "watch",
    title: "할아버지의 낡은 시계",
    keySignature: "C Major",
    timeSignature: "4/4",
    score: [
      {
        measure: 1,
        notes: [
          { pitch: "g", octave: 4, duration: "half" },
          { pitch: "g", octave: 4, duration: "half" },
        ],
      },
      {
        measure: 2,
        notes: [
          { pitch: "c", octave: 5, duration: "half" },
          { pitch: "b", octave: 4, duration: "quarter" },
          { pitch: "c", octave: 5, duration: "quarter" },
        ],
      },
      {
        measure: 3,
        notes: [
          { pitch: "d", octave: 5, duration: "half" },
          { pitch: "c", octave: 5, duration: "quarter" },
          { pitch: "d", octave: 5, duration: "quarter" },
        ],
      },
      {
        measure: 4,
        notes: [
          { pitch: "e", octave: 5, duration: "quarter" },
          { pitch: "e", octave: 5, duration: "quarter" },
          { pitch: "f", octave: 5, duration: "quarter" },
          { pitch: "e", octave: 5, duration: "quarter" },
        ],
      },
      {
        measure: 5,
        notes: [
          { pitch: "a", octave: 4, duration: "half" },
          { pitch: "d", octave: 5, duration: "quarter" },
          { pitch: "d", octave: 5, duration: "quarter" },
        ],
      },
      {
        measure: 6,
        notes: [
          { pitch: "c", octave: 5, duration: "half" },
          { pitch: "c", octave: 5, duration: "quarter" },
          { pitch: "c", octave: 5, duration: "quarter" },
        ],
      },
      {
        measure: 7,
        notes: [
          { pitch: "b", octave: 4, duration: "half" },
          { pitch: "a", octave: 4, duration: "quarter" },
          { pitch: "b", octave: 4, duration: "quarter" },
        ],
      },
      {
        measure: 8,
        notes: [
          {
            pitch: "c",
            octave: 5,
            duration: "whole",
          },
        ],
      },
    ],
  },
];