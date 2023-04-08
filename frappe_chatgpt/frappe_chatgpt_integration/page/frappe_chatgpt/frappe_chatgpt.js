frappe.pages['frappe-chatgpt'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'FrappeGPT',
		single_column: true
	});
}