frappe.pages["doppio-bot"].on_page_load = function (wrapper) {
  frappe.ui.make_app_page({
    parent: wrapper,
    single_column: true,
  });
};

frappe.pages["doppio-bot"].on_page_show = function (wrapper) {
  load_doppiobot_ui(wrapper);
};

function load_doppiobot_ui(wrapper) {
  let $parent = $(wrapper).find(".layout-main-section");
  $parent.empty();

  frappe.require("doppiobot_ui.bundle.jsx").then(() => {
    new doppiobot.ui.DoppioBotUI({
      wrapper: $parent,
      page: wrapper.page,
    });
  });
}
