function Employee(
	_username,
	_fullName,
	_email,
	_workDay,
	_password,
	_basicPay,
	_position,
	_workHours
) {
	this.username = _username;
	this.fullName = _fullName;
	this.email = _email;
	this.workDay = _workDay;
	this.password = _password;
	this.basicPay = _basicPay;
	this.position = _position;
	this.workHours = _workHours;
	this.salary = 0;
	this.rating = "";

	this.salaryCalc = function () {
		if (this.position === "Sếp") {
			this.salary = this.basicPay * 3;
		} else if (this.position === "Trưởng phòng") {
			this.salary = this.basicPay * 2;
		} else {
			this.salary = this.basicPay;
		}
	};
	this.employeeRate = function () {
		if (this.workHours >= 192) {
			this.rating = "Xuất sắc";
		} else if (this.workHours >= 176) {
			this.rating = "Giỏi";
		} else if (this.workHours >= 160) {
			this.rating = "Khá";
		} else {
			this.rating = "Trung bình";
		}
	};
}
