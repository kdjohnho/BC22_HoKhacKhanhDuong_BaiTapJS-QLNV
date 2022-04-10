function EmployeeList() {
	this.arr = [];

	this.getEmployeeIndex = function (username) {
		var index = -1;

		for (var i = 0; i < this.arr.length; i++) {
			if (this.arr[i].username == username) {
				index = i;
				break;
			}
		}
		return index;
	};

	this.add = function (employee) {
		this.arr.push(employee);
	};

	// Delete
	this._deleteEmployee = function (username) {
		var index = this.getEmployeeIndex(username);

		if (index != -1) {
			this.arr.splice(index, 1);
		}
	};

	// Modify
	this._modifyEmployee = function (username) {
		var index = this.getEmployeeIndex(username);

		if (index != -1) {
			var employee = this.arr[index];
			return employee;
		}
		return null;
	};

	// Update
	this.updateEmployee = function (employee) {
		var index = this.getEmployeeIndex(employee.username);

		if (index != -1) {
			this.arr[index] = employee;
		}
	};

	// Search
	this.searchEmployee = function (key) {
		var searchArray = [];

		for (var i = 0; i < this.arr.length; i++) {
			var employee = this.arr[i];

			if (employee.rating.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
				searchArray.push(employee);
			}
		}
		return searchArray;
	};
}
