var employeeList = new EmployeeList();
var validation = new Validation();

getLocalStorage();

function getEle(id) {
	return document.getElementById(id);
}

function getEmployeeInfo() {
	var username = getEle("tknv").value;
	var fullName = getEle("name").value;
	var email = getEle("email").value;
	var password = getEle("password").value;
	var workDay = getEle("datepicker").value;
	var basicPay = getEle("luongCB").value;
	var position = getEle("chucvu").value;
	var workHours = getEle("gioLam").value;

	var isValid = true;

	// Validation username
	isValid &=
		validation.emptyCheck(username, "tbTKNV", "(*) Vui lòng nhập tài khoản") &&
		validation.checkLength(
			username,
			"tbTKNV",
			4,
			6,
			"(*) Tài khoản chỉ chứa 4-6 kí tự"
		);

	// Validation name
	isValid &=
		validation.emptyCheck(fullName, "tbTen", "(*) Vui lòng nhập họ tên") &&
		validation.letterCheck(
			fullName,
			"tbTen",
			"(*) Vui lòng nhập tên dưới dạng tiếng Việt có dấu"
		);

	// Validation email
	isValid &=
		validation.emptyCheck(email, "tbEmail", "(*) Vui lòng nhập email") &&
		validation.mailFormatCheck(
			email,
			"tbEmail",
			"(*) Vui lòng nhập email hợp lệ"
		);

	// Validation password
	isValid &=
		validation.emptyCheck(
			password,
			"tbMatKhau",
			"(*) Vui lòng nhập mật khẩu"
		) &&
		validation.passwordCheck(
			password,
			"tbMatKhau",
			"(*) Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt"
		) &&
		validation.checkLength(
			password,
			"tbMatKhau",
			6,
			10,
			"(*) Mật khẩu phải chứa từ 6-10 ký tự"
		);

	// Validation date
	isValid &=
		validation.emptyCheck(workDay, "tbNgay", "(*) Vui lòng chọn ngày làm") &&
		validation.dateCheck(
			workDay,
			"tbNgay",
			"(*) Ngày làm định dạng mm/dd/yyyy"
		);

	// Validation basic pay
	isValid &=
		validation.emptyCheck(
			basicPay,
			"tbLuongCB",
			"(*) Vui lòng nhập mức lương"
		) &&
		validation.checkValueRange(
			basicPay,
			"tbLuongCB",
			1000000,
			20000000,
			"(*) Mức lương cơ bản trong khoảng 1 000 000 - 20 000 000"
		);

	// Validation position
	isValid &= validation.positionCheck(position, "tbChucVu");

	// Validation work hours
	isValid &=
		validation.emptyCheck(
			workHours,
			"tbGiolam",
			"(*) Giờ làm không được để trống"
		) &&
		validation.checkValueRange(
			workHours,
			"tbGiolam",
			80,
			200,
			"(*) Giờ làm từ 80-200 giờ"
		);

	if (!isValid) return null;

	var employee = new Employee(
		username,
		fullName,
		email,
		workDay,
		password,
		basicPay,
		position,
		workHours
	);
	employee.salaryCalc();
	employee.employeeRate();

	return employee;
}

getEle("btnThemNV").addEventListener("click", function () {
	var employee = getEmployeeInfo();

	employeeList.add(employee);
	printResult(employeeList.arr);
	setLocalStorage();
});

function printResult(arr) {
	var content = "";

	for (var i = 0; i < arr.length; i++) {
		var employee = arr[i];

		content += `
         <tr>
            <td>${employee.username}</td>
            <td>${employee.fullName}</td>
            <td>${employee.email}</td>
            <td>${employee.workDay}</td>
            <td>${employee.position}</td>
            <td>${employee.salary}</td>
            <td>${employee.rating}</td>
            <td>
               <button data-toggle="modal"
               data-target="#myModal" class="btn btn-warning" onclick="modifyEmployee('${employee.username}')">Sửa</button>
               <button class="btn btn-danger" onclick="deleteEmployee('${employee.username}')">Xoá</button>
            </td>
         </tr>
      `;
	}

	getEle("tableDanhSach").innerHTML = content;
}

// DELETE EMPLOYEE
function deleteEmployee(username) {
	employeeList._deleteEmployee(username);
	printResult(employeeList.arr);
	setLocalStorage();
}

// MODIFY EMPLOYEE INFO
function modifyEmployee(username) {
	var employee = employeeList._modifyEmployee(username);

	// show info
	if (employee) {
		getEle("tknv").value = employee.username;
		getEle("tknv").disabled = true;

		getEle("name").value = employee.fullName;
		getEle("email").value = employee.email;
		getEle("password").value = employee.password;
		getEle("datepicker").value = employee.workDay;
		getEle("luongCB").value = employee.basicPay;
		getEle("chucvu").value = employee.position;
		getEle("gioLam").value = employee.workHours;
	}
}

// UPDATE EMPLOYEE INFO
getEle("btnCapNhat").addEventListener("click", function () {
	var employee = getEmployeeInfo();

	employeeList.updateEmployee(employee);

	printResult(employeeList.arr);
	setLocalStorage();
});

// SEARCH EMPLOYEE BY RATING
getEle("searchName").addEventListener("keyup", function () {
	var keyword = getEle("searchName").value;
	var searchArray = employeeList.searchEmployee(keyword);
	printResult(searchArray);
});

getEle("btnTimNV").addEventListener("click", function () {
	var keyword = getEle("searchName").value;
	var searchArray = employeeList.searchEmployee(keyword);
	printResult(searchArray);
});

function setLocalStorage() {
	// transfer data from json to string
	var dataString = JSON.stringify(employeeList.arr);

	// set localStorage
	localStorage.setItem("employeeList", dataString);
}

function getLocalStorage() {
	var data = localStorage.getItem("employeeList");

	if (data) {
		var dataJson = JSON.parse(data);

		employeeList.arr = dataJson;
		printResult(employeeList.arr);
	}
}
