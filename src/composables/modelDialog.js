import Swal from "sweetalert2";

const Dialog = {};

const Toast = Swal.mixin({
	toast: true,
	position: "top-end",
	showConfirmButton: false,
	timer: 3000,
	timerProgressBar: true,
	didOpen: (toast) => {
		toast.addEventListener("mouseenter", Swal.stopTimer);
		toast.addEventListener("mouseleave", Swal.resumeTimer);
	},
});

// 纯文字模态框
Dialog.fire = function (msg) {
	Swal.fire(msg);
};

//错误模态框
Dialog.errorFire = function (title = "", text = "") {
	Swal.fire({
		icon: "error",
		title: title,
		text: text,
	});
};

// 警告模态框
Dialog.warnFire = function (title = "", text = "") {
	Swal.fire({
		icon: "warning",
		title: title,
		text: text,
	});
};

//信息模态框
Dialog.infoFire = function (title = "", text = "") {
	Swal.fire({
		icon: "info",
		title: title,
		text: text,
	});
};

// 成功模态框
Dialog.successFire = function (title = "", text = "") {
	Swal.fire({
		icon: "success",
		title: title,
		text: text,
	});
};

// 纯文字右上角提示框
Dialog.toast = function (title) {
	Toast.fire({
		title: title,
	});
};

// 客制化右上角提示框
Dialog.custom = function () {
	return Toast;
};

// 错误右上角提示框
Dialog.errorToast = function (msg, bar) {
	Toast.fire({
		icon: "error",
		titleText: msg,
		timerProgressBar: bar || false,
	});
};

// 警告右上角提示框
Dialog.warnToast = function (msg, bar) {
	Toast.fire({
		icon: "warning",
		titleText: msg,
		timerProgressBar: bar || false,
	});
};

// 信息右上角提示框
Dialog.infoToast = function (msg, bar) {
	Toast.fire({
		icon: "info",
		titleText: msg,
		timerProgressBar: bar || false,
	});
};

// 成功右上角提示框
Dialog.successToast = function (msg, bar) {
	Toast.fire({
		icon: "success",
		titleText: msg,
		timerProgressBar: bar || false,
	});
};

export { Dialog };
