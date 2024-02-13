export type Major = "A" | "B" | "C" | "D" | "E" | "F" | "G";

export interface Note {
  major: string;
  octave: number;
  sharp?: number;
}

export const NOTES = [
  [
    { major: "A", octave: 27.5, sharp: 29.13523509488062 },
    { major: "B", octave: 30.867706328507756 },
  ],
  [
    { major: "C", octave: 32.703195662574829, sharp: 34.647828872109012 },
    { major: "D", octave: 36.708095989675945, sharp: 38.890872965260113 },
    { major: "E", octave: 41.203444614108741 },
    { major: "F", octave: 43.653528929125485, sharp: 46.249302838954299 },
    { major: "G", octave: 48.999429497718661, sharp: 51.913087197493142 },
    { major: "A", octave: 55.0, sharp: 58.270470189761239 },
    { major: "B", octave: 61.735412657015513 },
  ],
  [
    { major: "C", octave: 65.40639132514966, sharp: 69.29565774421802 },
    { major: "D", octave: 73.41619197935189, sharp: 77.78174593052023 },
    { major: "E", octave: 82.40688922821748 },
    { major: "F", octave: 87.30705785825097, sharp: 92.4986056779086 },
    { major: "G", octave: 97.99885899543732, sharp: 103.82617439498628 },
    { major: "A", octave: 110.0, sharp: 116.54094037952248 },
    { major: "B", octave: 123.47082531403103 },
  ],
  [
    { major: "C", octave: 130.8127826502993, sharp: 138.59131548843605 },
    { major: "D", octave: 146.83238395870378, sharp: 155.56349186104046 },
    { major: "E", octave: 164.81377845643496 },
    { major: "F", octave: 174.61411571650194, sharp: 184.9972113558172 },
    { major: "G", octave: 195.99771799087465, sharp: 207.65234878997257 },
    { major: "A", octave: 220.0, sharp: 233.08188075904496 },
    { major: "B", octave: 246.94165062806205 },
  ],
  [
    { major: "C", octave: 261.62556530059863, sharp: 277.1826309768721 },
    { major: "D", octave: 293.66476791740756, sharp: 311.1269837220809 },
    { major: "E", octave: 329.62755691286993 },
    { major: "F", octave: 349.2282314330039, sharp: 369.9944227116344 },
    { major: "G", octave: 391.9954359817493, sharp: 415.30469757994514 },
    { major: "A", octave: 440.0, sharp: 466.1637615180899 },
    { major: "B", octave: 493.8833012561241 },
  ],
  [
    { major: "C", octave: 523.2511306011973, sharp: 554.3652619537442 },
    { major: "D", octave: 587.3295358348151, sharp: 622.2539674441618 },
    { major: "E", octave: 659.2551138257399 },
    { major: "F", octave: 698.4564628660078, sharp: 739.9888454232688 },
    { major: "G", octave: 783.9908719634986, sharp: 830.6093951598903 },
    { major: "A", octave: 880.0, sharp: 932.3275230361799 },
    { major: "B", octave: 987.7666025122482 },
  ],
  [
    { major: "C", octave: 1046.5022612023946, sharp: 1108.7305239074884 },
    { major: "D", octave: 1174.6590716696302, sharp: 1244.5079348883236 },
    { major: "E", octave: 1318.5102276514797 },
    { major: "F", octave: 1396.9129257320156, sharp: 1479.9776908465377 },
    { major: "G", octave: 1567.9817439269972, sharp: 1661.2187903197806 },
    { major: "A", octave: 1760.0, sharp: 1864.6550460723597 },
    { major: "B", octave: 1975.5332050244965 },
  ],
  [
    { major: "C", octave: 2093.004522404789, sharp: 2217.4610478149768 },
    { major: "D", octave: 2349.3181433392606, sharp: 2489.0158697766473 },
    { major: "E", octave: 2637.0204553029594 },
    { major: "F", octave: 2793.825851464031, sharp: 2959.955381693075 },
    { major: "G", octave: 3135.9634878539944, sharp: 3322.437580639561 },
    { major: "A", octave: 3520.0, sharp: 3729.3100921447194 },
    { major: "B", octave: 3951.0664100489927 },
  ],

  [{ major: "C", octave: 4186.009044809578 }],
];