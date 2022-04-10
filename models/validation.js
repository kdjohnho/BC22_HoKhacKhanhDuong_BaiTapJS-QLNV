function Validation() {
	this.emptyCheck = function (value, errorId, message) {
		if (!value) {
			getEle(errorId).innerHTML = message;
			getEle(errorId).style.display = "block";
			return false;
		}

		getEle(errorId).innerHTML = "";
		getEle(errorId).innerHTML.display = "none";
		return true;
	};

	this.checkLength = function (value, errorId, min, max, message) {
		if (value.trim().length >= min && value.trim().length <= max) {
			getEle(errorId).innerHTML = "";
			getEle(errorId).style.display = "none";
			return true;
		}

		getEle(errorId).innerHTML = message;
		getEle(errorId).style.display = "block";
		return false;
	};

	this.checkValueRange = function (value, errorId, min, max, message) {
		if (value >= min && value <= max) {
			getEle(errorId).innerHTML = "";
			getEle(errorId).style.display = "none";
			return true;
		}

		getEle(errorId).innerHTML = message;
		getEle(errorId).style.display = "block";
		return false;
	};

	this.mailFormatCheck = function (value, errorId, message) {
		var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

		if (value.match(mailFormat)) {
			getEle(errorId).innerHTML = "";
			getEle(errorId).style.display = "none";
			return true;
		}
		getEle(errorId).innerHTML = message;
		getEle(errorId).style.display = "block";
		return false;
	};

	this.letterCheck = function (value, errorId, message) {
		var letter =
			"^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
			"ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
			"ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";

		if (value.match(letter)) {
			getEle(errorId).innerHTML = "";
			getEle(errorId).style.display = "none";
			return true;
		}

		getEle(errorId).innerHTML = message;
		getEle(errorId).style.display = "block";
		return false;
	};

	this.dateCheck = function (value, errorId, message) {
		var date =
			/^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/;

		if (value.match(date)) {
			getEle(errorId).innerHTML = "";
			getEle(errorId).style.display = "none";
			return true;
		}

		getEle(errorId).innerHTML = message;
		getEle(errorId).style.display = "block";
		return false;
	};

	this.positionCheck = function (value, errorId) {
		if (value.match("Chọn chức vụ")) {
			getEle(errorId).innerHTML = "Vui lòng chọn chức vụ";
			getEle(errorId).style.display = "block";
			return false;
		}

		getEle(errorId).innerHTML = "";
		getEle(errorId).style.display = "none";
		return true;
	};

	this.passwordCheck = function (value, errorId, message) {
		var pass =
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;

		if (value.match(pass)) {
			getEle(errorId).innerHTML = "";
			getEle(errorId).style.display = "none";
			return true;
		}

		getEle(errorId).innerHTML = message;
		getEle(errorId).style.display = "block";
		return false;
	};
}
