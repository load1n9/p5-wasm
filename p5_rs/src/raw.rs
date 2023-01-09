#![allow(missing_docs)]

#[link(wasm_import_module = "p5")]
extern "C" {
    pub fn createCanvas(width: i32, height: i32);
    pub fn rect(x: i32, y: i32, width: i32, height: i32);
    pub fn square(x: i32, y: i32, width: i32);
    pub fn circle(x: i32, y: i32, diameter: i32);
    pub fn ellipse(x: i32, y: i32, width: i32, height: i32, rotation: i32);
    pub fn arc(x: i32, y: i32, radius: i32, start: i32, stop: i32);
    pub fn clear();
    pub fn background(color: i32);
    pub fn fill(color: i32);
    pub fn randomGaussian(mean: i32, sd: i32) -> f32;
    pub fn random(min: i32, max: i32) -> f32;
    pub fn randomSeed(seed: i32);
}