Loviz.Views.Linea_addcart = Backbone.View.extend({
	el:$('#linea_addcart'),
	template : swig.compile($("#linea_addcart_template").html()),
	events: {
	},
	initialize : function () {
		this.render();
	},
	render:function () {
		var carro = this.model.toJSON()
	    var html = this.template(carro);
	    this.$el.html(html);
	    this.aparece();
	},
	aparece:function () {
		this.$el.slideDown(300).delay(3000).slideUp(300);
	}
});
