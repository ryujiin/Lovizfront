Loviz.Views.Carro_num_producto = Backbone.View.extend({
	template : swig.compile($("#carro_num_items_template").html()),
	events: {
	},
	initialize : function () {
		this.$el = $("#carro .numero_items");
	    this.listenTo(this.model, "change", this.render, this);
		this.render();
	},
	render:function () {
		var carro = this.model.toJSON()
	    var html = this.template(carro);
	    this.$el.html(html);
	}
});
