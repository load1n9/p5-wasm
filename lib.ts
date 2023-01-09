import {
  CanvasRenderingContext2D,
  getPrimaryMonitor,
  WindowCanvas,
} from "https://raw.githubusercontent.com/deno-windowing/dwm/main/ext/canvas.ts";
import { WhistleStorage } from "https://raw.githubusercontent.com/whistle-lang/runtime/main/deno/mod.ts";

const monitor = getPrimaryMonitor();

class Storage {
  static background = "#ffffff";
  static fill = "#000000";
  static stroke = "#000000";
}

export let canvas: WindowCanvas | undefined;
export let ctx: CanvasRenderingContext2D | undefined;

function createCanvas(width: number, height: number) {
  canvas = new WindowCanvas({
    title: "p5",
    width,
    height,
    resizable: false,
  });
  canvas.window.position = {
    x: monitor.workArea.width - 500,
    y: monitor.workArea.height - 500,
  };
  ctx = canvas.ctx;
}

function clear() {
  ctx!.fillStyle = Storage.background;
  ctx!.fillRect(0, 0, canvas!.canvas.width, canvas!.canvas.height);
}
function styles() {
  ctx!.fillStyle = Storage.fill;
  ctx!.strokeStyle = Storage.stroke;
}
function rect(x: number, y: number, width: number, height: number) {
  styles();
  ctx!.fillRect(x, y, width, height);
}

function square(x: number, y: number, width: number) {
  rect(x, y, width, width);
}

function circle(x: number, y: number, diameter: number) {
  ctx!.beginPath();
  ctx!.arc(x, y, diameter / 2, 0, 2 * Math.PI, false);
  ctx!.fill();
  ctx!.stroke();
}

const randomStateProp = "_lcg_random_state";
const m = 4294967296;
const a = 1664525;
const c = 1013904223;
let y2 = 0;
let _gaussian_previous = false;
// deno-lint-ignore no-explicit-any
const props: any = {};

function _lcg(stateProperty: string) {
  props[stateProperty] = (a * props[stateProperty] + c) % m;
  return props[stateProperty] / m;
}

function _lcgSetSeed(stateProperty: string, val: number | null) {
  props[stateProperty] = (val == null ? Math.random() * m : val) >>> 0;
}

function randomSeed(seed: number) {
  _lcgSetSeed(randomStateProp, seed);
  _gaussian_previous = false;
}

function random(min: number, max: number) {
  let rand;

  if (props[randomStateProp] != null) {
    rand = _lcg(randomStateProp);
  } else {
    rand = Math.random();
  }
  if (min > max) {
    const tmp = min;
    min = max;
    max = tmp;
  }

  return rand * (max - min) + min;
}

function randomOne(num: number) {
  let rand;

  if (props[randomStateProp] != null) {
    rand = _lcg(randomStateProp);
  } else {
    rand = Math.random();
  }

  return rand * num;
}

function randomGaussian(mean: number, sd = 1) {
  let y1, x1, x2, w;
  if (_gaussian_previous) {
    y1 = y2;
    _gaussian_previous = false;
  } else {
    do {
      x1 = randomOne(2) - 1;
      x2 = randomOne(2) - 1;
      w = x1 * x1 + x2 * x2;
    } while (w >= 1);
    w = Math.sqrt(-2 * Math.log(w) / w);
    y1 = x1 * w;
    y2 = x2 * w;
    _gaussian_previous = true;
  }

  const m = mean || 0;
  return y1 * sd + m;
}

function fill(color: string) {
  Storage.fill = color;
}

function stroke(color: string) {
  Storage.stroke = color;
}
export default function plugin(
  address: string,
): Record<string, WebAssembly.ImportValue> {
  return {
    createCanvas,
    rect,
    square,
    circle,
    clear,
    fill(color: number) {
      fill(WhistleStorage.string(address, color));
    },
    stroke(color: number) {
      stroke(WhistleStorage.string(address, color));
    },
    background(color: number) {
      Storage.background = WhistleStorage.string(address, color);
    },
    randomSeed,
    random,
    randomGaussian,
  };
}
export function defaultCanvas() {
  createCanvas(800, 600);
}
