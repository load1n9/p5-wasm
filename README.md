# P5 wasm

p5 like library for wasm & compiles using deno

## Usage

test.whi

```rs
import "https://deno.land/x/p5wasm/p5_whi/p5.whi"

export fn setup() {
    createCanvas(500, 500)
}

export fn draw() {
    clear()
    fill("#0000ff")
    rect(30, 40, 40, 40)
    circle(160, 60, 30)
}
```

### compile

```sh
whistle compile test.whi -o test.wasm
```

### run

```sh
deno run -Ar --unstable https://deno.land/x/p5wasm/main.ts run test.wasm
```

### build

```sh
deno run -Ar --unstable https://deno.land/x/p5wasm/main.ts build test.wasm -o myApp.exe
```
