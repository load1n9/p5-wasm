# P5 wasm

p5 like library for wasm & compiles using deno

## Usage

test.whi

```rs
import "https://deno.land/x/p5wasm@0.1.0-alpha/p5_whi/p5.whi"

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
whiskey compile test.whi
```

### run

```sh
deno run -A --unstable https://deno.land/x/p5wasm@0.1.0-alpha/main.ts run test.wasm
```

### build

```sh
deno run -A --unstable https://deno.land/x/p5wasm@0.1.0-alpha/main.ts compile test.wasm -o myApp.exe
```
