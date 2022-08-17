// Tạo function constructor Student để giúp khởi tạo nhanh các object staff
function Staff(account, name, email, password, date, salary, position, hour) {
  this.account = account;
  this.name = name;
  this.email = email;
  this.password = password;
  this.date = date;
  this.salary = salary;
  this.position = position;
  this.hour = hour;
}
// hàm tính tổng lương nhân viên
Staff.prototype.calcSalary = function () {
    switch (this.position) {
      case "Sếp": {
        return this.salary * 3;
      }
      case "Trưởng phòng": {
        return this.salary * 2;
      }
      case "Nhân viên": {
        return this.salary;
      }
    }
  };

  // Hàm xếp loại cho đối tượng nhân viên:
Staff.prototype.sortStaff = function () {
    // let result = "";
    if (this.hour < 160) {
      return "Nhân viên trung bình";
    } else if (this.hour < 176) {
      return "Nhân viên khá";
    } else if (this.hour < 192) {
      return "Nhân viên giỏi";
    } else {
      return "Nhân viên xuất sắc";
    }
};

// DOM
function dom(selector) {
  return document.querySelector(selector);
}
// Tạo array staffs để lưu trữ danh sách nhân viên
let staffs = [];
// Hàm init sẽ được thực thi khi chương trình được khởi chạy
init();

// ===================================================================================
function init() {
  // Lấy dữ liệu staffs từ localStorage
  staffs = JSON.parse(localStorage.getItem("staffs")) || [];
  staffs = staffs.map((staff) => {
    return new Staff(
        staff.account,
        staff.name,
        staff.email,
        staff.password,
        staff.date,
        staff.salary,
        staff.position,
        staff.hour

    );
  })
  window.test = staffs
  display(staffs);
}

// Thêm nhân viên
function addStaff() {
  // B1: DOM
  let account = dom("#tknv").value;
  let name = dom("#name").value;
  let email = dom("#email").value;
  let password = dom("#password").value;
  let date = dom("#datepicker").value;
  let salary = +dom("#luongCB").value;
  let position = dom("#chucvu").value;
  let hour = +dom("#gioLam").value;
  let isValid = validateForm();
  // Kiểm tra nếu form không hợp lệ => kết thúc hàm
  if (!isValid) {
    return;
  }
  //B2: Tạo object chứa thông tin trên
  let staff = new Staff(
    account,
    name,
    email,
    password,
    date,
    salary,
    position,
    hour
  );
  console.log(staff);
  //B3: Thêm object vào mảng staffs
  staffs.push(staff);
  localStorage.setItem("staffs", JSON.stringify(staffs));

  //B4: hiển thị ra giao diện
  display(staffs);

  //Reset form
  resetForm();
}
// hàm hiên thị thông tin nhân viên
function display(staffs) {
  let html = staffs.reduce((result, staff) => {
    return (
      result +
      `
            <tr>
                <td>${staff.account}</td>
                <td>${staff.name}</td>
                <td>${staff.email}</td>
                <td>${staff.date}</td>
                <td>${staff.position}</td>
                <td>${staff.calcSalary()}</td>
                <td>${staff.sortStaff()}</td>
                <td>
                    <button class="btn btn-danger mt-2 " 
                    onclick="detele('${staff.account}')"
                    >
                    Delete</button>
                </td>
            </tr>
        `
    );
  }, "");

  dom("#tableDanhSach").innerHTML = html;
}
// hàm reset form
function resetForm() {
  dom("#tknv").value = "";
  dom("#name").value = "";
  dom("#email").value = "";
  dom("#password").value = "";
  dom("#datepicker").value = "";
  dom("#luongCB").value = "";
  dom("#chucvu").value = "";
  dom("#gioLam").value = "";

  dom("#tbTKNV").classList.remove("d-block");
  dom("#tbTen").classList.remove("d-block");
  dom("#tbEmail").classList.remove("d-block");
  dom("#tbMatKhau").classList.remove("d-block");
  dom("#tbNgay").classList.remove("d-block");
  dom("#tbLuongCB").classList.remove("d-block");
  dom("#tbChucVu").classList.remove("d-block");
  dom("#tbGiolam").classList.remove("d-block");

  dom("#tbTKNV").innerHTML = "";
  dom("#tbTen").innerHTML = "";
  dom("#tbEmail").innerHTML = "";
  dom("#tbMatKhau").innerHTML = "";
  dom("#tbNgay").innerHTML = "";
  dom("#tbLuongCB").innerHTML = "";
  dom("#tbChucVu").innerHTML = "";
  dom("#tbGiolam").innerHTML = "";

  dom("#tknv").disabled = false;
  dom("#btnThemNV").disabled = false;
}
//



// hàm xóa nhân viên
function detele(account) {
  staffs = staffs.filter((staff) => {
    return staff.account !== account;
  });
  localStorage.setItem("staffs", JSON.stringify(staffs));
  display(staffs);
}
// Tìm kiếm nhân viên
function searchStaff() {
  let searchStaff = dom("#searchName").value;
  searchStaff = searchStaff.toLowerCase();
  let newStaffs = staffs.filter((staff) => {
    let name = staff.sortStaff().toLowerCase();
    return name.includes(searchStaff);
  });
  display(newStaffs);
}
// Cập nhật Nhân viên
function updateStaff() {
  let account = dom("#tknv").value;
  let name = dom("#name").value;
  let email = dom("#email").value;
  let password = dom("#password").value;
  let date = dom("#datepicker").value;
  let salary = +dom("#luongCB").value;
  let position = dom("#chucvu").value;
  let hour = +dom("#gioLam").value;
  staff = new Staff(
    account,
    name,
    email,
    password,
    date,
    salary,
    position,
    hour
  );
  let index = staffs.findIndex((value) => {
    return staff.account === value.account;
  });
  staffs[index] = staff;
  localStorage.setItem("staffs", JSON.stringify(staffs));
  display(staffs);
  resetForm();
}
// =========================Validation=========================
// hàm kiểm tra account
function validateAccount(){
    let account = dom("#tknv").value;
    let spanEl = dom("#tbTKNV");

    if(!account){
        spanEl.classList.add("d-block");
        spanEl.innerHTML = "Tài khoản không được để trống";
        return false;
    }

    if(account.length < 5 || account.length > 8){
        spanEl.classList.add("d-block");
        spanEl.innerHTML = "Tài khoản tối đa 4 đến 6 kí tự";
        return false;
    }

    spanEl.classList.remove("d-block");
    spanEl.innerHTML = "";
    return true;
}
//hàm kiểm tra tên nhân viên
function validateName(){
    let name = dom("#name").value;
    let spanEl = dom("#tbTen")

    if(!name){
        spanEl.classList.add("d-block")
        spanEl.innerHTML = "Họ và tên không được để trống";
        return false;
    }
    let regex = /^[a-zA-Z'-'\sáàảãạăâắằấầặẵẫậéèẻ ẽẹêếềểễệóòỏõọôốồổỗộ ơớờởỡợíìỉĩịđùúủũụưứ ửữựÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠ ƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼ ÊỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞ ỠỢỤỨỪỬỮỰỲỴÝỶỸửữựỵ ỷỹ]*$/
    if(!regex.test(name)){
        spanEl.classList.add("d-block");
        spanEl.innerHTML = "Họ và tên phải là chữ";
        return false;
    }

    spanEl.classList.remove("d-block");
    spanEl.innerHTML = "";
    return true;
}

// hàm kiểm tra Email
function validateEmail(){
    let email = dom("#email").value;
    let spanEl = dom("#tbEmail");

    if(!email){
        spanEl.classList.add("d-block");
        spanEl.innerHTML = "Email không được để trống";
        return false;
    }
    let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!regex.test(email)){
        spanEl.classList.add("d-block");
        spanEl.innerHTML = "Email không đúng định dạng";
        return false;
    }

    spanEl.classList.remove("d-block");
    spanEl.innerHTML = "";
    return true;
}

//hàm kiểm tra mật khẩu
function validatePassword(){
    let password = dom("#password").value;
    let spanEl = dom("#tbMatKhau");
    
    if(!password){
        spanEl.classList.add("d-block");
        spanEl.innerHTML = "Mật khẩu không được để trống";
        return false;
    }
    if(password.length < 6 || password.length > 10){
        spanEl.classList.add("d-block");
        spanEl.innerHTML = "Mật khẩu từ 6 đến 10 kí tự";
        return false;
    }

    let regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}/;
    if(!regex.test(password)){
        spanEl.classList.add("d-block");
        spanEl.innerHTML = "Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt";
        return false;
    }

    spanEl.classList.remove("d-block");
    spanEl.innerHTML = "";
    return true;
}

// hàm kiểm tra date
function validateTime(){
    let time = dom("#datepicker").value;
    let spanEl = dom("#tbNgay")

    if(!time){
        spanEl.classList.add("d-block");
        spanEl.innerHTML = "Ngày làm không được để trống";
        return false;
    }

    spanEl.classList.remove("d-block");
    spanEl.innerHTML = "";
    return true;
}

// hàm kiểm tra  lương
function validateSalary(){
    let salary = dom("#luongCB").value;
    let spanEl = dom("#tbLuongCB");

    if(!salary){
        spanEl.classList.add("d-block");
        spanEl.innerHTML = "Lương cơ bản không được để trống";
        return false;
    }

    let regex = /^[\d]*$/;
    if(!regex.test(salary)){
        spanEl.classList.add("d-block");
        spanEl.innerHTML = "Chỉ được điền số";
        return false;
    }

    if(salary < 1e6 || salary > 2e7){
        spanEl.classList.add("d-block");
        spanEl.innerHTML = "Lương cơ bản từ 1,000,000 - 20,000,000";
        return false;
    }

    spanEl.classList.remove("d-block");
    spanEl.innerHTML = "";
    return true;
}

// hàm kiểm tra chức vụ
function validatePosition(){
    let position = dom("#chucvu").value;
    let spanEl = dom("#tbChucVu");

    if(!position){
        spanEl.classList.add("d-block");
        spanEl.innerHTML = "Chọn chức vụ hợp lệ";
        return false;
    }

    spanEl.classList.remove("d-block");
    spanEl.innerHTML = "";
    return true;
}

// hàm kiểm tra số giờ làm 
function validateHour(){
    let hour = dom("#gioLam").value;
    let spanEl = dom("#tbGiolam");

    if(!hour){
        spanEl.classList.add("d-block");
        spanEl.innerHTML = "Số giờ trong tháng không được để trống";
        return false;
    }

    let regex = /^[\d]*$/;
    if(!regex.test(hour)){
        spanEl.classList.add("d-block");
        spanEl.innerHTML = "Chỉ được điền số";
        return false;
    }

    if( hour < 80 || hour > 200){
        spanEl.classList.add("d-block");
        spanEl.innerHTML = "Số giờ làm trong tháng 80-200 giờ";
        return false;
    }

    spanEl.classList.remove("d-block");
    spanEl.innerHTML = "";
    return true;
}

// hàm kiểm tra form
function validateForm(){
    let isvalid = true;
    isvalid = validateAccount() & validateName() & validateEmail() & validatePassword() & validateTime() & validateSalary() & validatePosition() & validateHour();

    if(!isvalid){
        alert("Form không hợp lệ");
        return false;
    }

    return true;
}
