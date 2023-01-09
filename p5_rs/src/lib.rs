#![allow(missing_docs)]
mod raw;

pub fn create_canvas(width: i32, height: i32) {
    unsafe { raw::createCanvas(width, height) }
}

pub fn rect(x: i32, y: i32, width: i32, height: i32) {
    unsafe { raw::rect(x, y, width, height) }
}

pub fn square(x: i32, y: i32, width: i32) {
    unsafe { raw::square(x, y, width) }
}

pub fn circle(x: i32, y: i32, diameter: i32) {
    unsafe { raw::circle(x, y, diameter) }
}

pub fn clear() {
    unsafe { raw::clear() }
}

pub fn background(color: &str) {
    unsafe { raw::background(color.as_ptr()) }
}

pub fn fill(color: &str) {
    unsafe { raw::fill(color.as_ptr()) }
}

pub fn random_gaussian(mean: i32, sd: i32) -> f32 {
    unsafe { raw::randomGaussian(mean, sd) }
}

pub fn random(min: i32, max: i32) -> f32 {
    unsafe { raw::random(min, max) }
}

pub fn random_seed(seed: i32) {
    unsafe { raw::randomSeed(seed) }
}