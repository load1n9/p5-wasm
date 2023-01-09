use p5_rs::create_canvas;

#[no_mangle]
pub extern "C" fn setup() {
    create_canvas(500, 500);
}

#[no_mangle]
pub extern "C" fn draw() {
    
}