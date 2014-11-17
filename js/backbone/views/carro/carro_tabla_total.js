Loviz.Views.Carro_total = Backbone.View.extend({
	template : swig.compile($("#carro_tabla_total_template").html()),
	events: {
	},
	initialize : function () {
		this.$el = $("#tabla_carro");
	    this.listenTo(this.model, "change", this.render, this);
		this.render();
	},
	render:function () {
		var carro = this.model.toJSON()
	    var html = this.template(carro);
	    this.$el.html(html);
	}
});
