import { WhistleProgram } from "https://raw.githubusercontent.com/whistle-lang/runtime/main/deno/mod.ts";
import plugin, { canvas, defaultCanvas } from "./lib.ts";
import {
  mainloop,
} from "https://raw.githubusercontent.com/deno-windowing/dwm/main/ext/canvas.ts";
export async function main(module: WebAssembly.Module) {
  const program = new WhistleProgram(module, {
    wasi: {
      disable: true,
    },
  });
  program.add("p5", plugin);
  // deno-lint-ignore no-explicit-any
  const { exports }: any = await program.run();
  exports.setup();
  if (canvas === undefined) {
    defaultCanvas();
  }
  canvas!.onDraw = (_ctx) => {
    exports.draw();
  };
  await mainloop(() => {
    canvas!.draw();
  });
}
