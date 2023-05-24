frappe.ui.keys.add_shortcut({
  shortcut: "shift+ctrl+d",
  action: function () {
    // navigate to ask doppio bot page
    frappe.set_route("doppio-bot");
  },
  description: __("Ask DoppioBot"),
});
