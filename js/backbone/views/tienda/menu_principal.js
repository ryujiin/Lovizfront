Loviz.Views.Menu_principal = Backbone.View.extend({
	el:$("#menu_principal"),
	events: {
	},
	initialize : function () {
		var self = this;
		var menu_offset = this.$el.offset();

		$(window).on('scroll', function() {
			if($(window).scrollTop() > menu_offset.top) {
				self.$el.addClass('fijo');
			} else {
				self.$el.removeClass('fijo');
			}
		});
	},
});
