use std::ffi::CStr;
use std::ffi::CString;
use std::os::raw::c_char;

mod beer {
    pub fn hello(name: &str) -> String {
        format!("Hello {}!", name)
    }

    #[test]
    fn test_hello() {
        assert_eq!(hello("world"), String::from("Hello world!"));
    }
}

fn c_safe_string_const(i: *const c_char) -> String {
    unsafe { CStr::from_ptr(i).to_string_lossy().into_owned() }
}

#[no_mangle]
pub fn beer_hello(name: *const c_char) -> *mut c_char {
    let name = c_safe_string_const(name);
    let result = beer::hello(&name);
    CString::new(result.as_bytes()).unwrap().into_raw()
}

#[no_mangle]
pub fn beer_add(a: f64, b: f64) -> f64 {
    a + b
}

fn main() {}

#[test]
fn test_beer_add() {
    assert_eq!(beer_add(21., 50.), 71.);
}
