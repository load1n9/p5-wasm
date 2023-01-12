import { Command } from "https://deno.land/x/cliffy@v0.25.7/command/mod.ts";
import { main } from "./core/runtime.ts";
import Instance from "https://raw.githubusercontent.com/deno-windowing/wpack/main/src/platform.ts";
import { encode } from "https://deno.land/std@0.149.0/encoding/base64.ts";

const RUNTIME_URL =
  "https://raw.githubusercontent.com/load1n9/p5-wasm/main/core/runtime.ts"; // Deno.mainModule.replace("main.ts", "./core/runtime.ts");
await new Command()
  .name("p5 whistle")
  .version("0.1.0")
  .description("p5js runtime for whistle & deno")
  .command("run <source:string>", "runs the specified wasm file")
  .action(async (_, source: string) => {
    const file = Deno.readFileSync(source);
    const mod = await WebAssembly.compile(file);
    await main(mod);
  })
  .command("build <source:string>", "builds the specified wasm file")
  .option(
    "-o, --output [PATH_OF_FILE:string]",
    "output location of the exacutable",
  )
  .action(async ({ output }, source: string) => {
    const file = encode(Deno.readFileSync(source));
    const tempFilePath = await Deno.makeTempFile({ suffix: ".ts" });
    await Deno.writeTextFile(
      tempFilePath,
      `import { decode } from "https://deno.land/std@0.149.0/encoding/base64.ts";\nimport { main } from "${RUNTIME_URL}";\n await main(await WebAssembly.compile(decode("${file}")))`,
    );
    const instance = new Instance(tempFilePath);
    await instance.compile([
      "--unstable",
      "--allow-env",
      "--allow-ffi",
      "--allow-write",
      "--allow-read",
    ]);
    await instance.windowify();
    if (typeof output === "string") {
      instance.rename(output);
    }
  })
  .parse(Deno.args);
