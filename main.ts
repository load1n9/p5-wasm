import { Command } from "https://deno.land/x/cliffy@v0.25.7/command/mod.ts";
import { main } from "./runtime.ts";
import Instance from "https://raw.githubusercontent.com/deno-windowing/pack/main/src/compile.ts";
import { encode } from "https://deno.land/std@0.149.0/encoding/base64.ts";

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
  .command("compile <source:string>", "runs the specified wasm file")
  .option(
    "-o, --output [PATH_OF_FILE:string]",
    "output location of the exacutable",
  )
  .action(async ({ output }, source: string) => {
    const file = encode(Deno.readFileSync(source));
    const tempFilePath = await Deno.makeTempFile({ suffix: ".ts"});
    console.log("Temp file path:", tempFilePath);
    await Deno.writeTextFile(
      tempFilePath,
      `import { decode } from "https://deno.land/std@0.149.0/encoding/base64.ts";\nimport { main } from "${
        Deno.mainModule.replace("main.ts", "runtime.ts")
      }";\n await main(await WebAssembly.compile(decode("${file}")))`,
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
