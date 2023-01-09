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

pub fn ellipse(x: i32, y: i32, width: i32, height: i32, rotation: i32) {
    unsafe { raw::ellipse(x, y, width, height, rotation) }
}

pub fn arc(x: i32, y: i32, radius: i32, start: i32, stop: i32) {
    unsafe { raw::arc(x, y, radius, start, stop) }
}

pub fn clear() {
    unsafe { raw::clear() }
}

pub fn background(color: i32) {
    unsafe { raw::background(color) }
}

pub fn fill(color: i32) {
    unsafe { raw::fill(color) }
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
