Loviz.Views.Linea = Backbone.View.extend({
  	className: 'linea',
  	
  	template: swig.compile($("#Lista_linea_carro_template").html()),

	events: {
	},
	initialize : function () {
    	this.listenTo(this.model, "change", this.render, this);
	},
	render : function () {
		var producto = this.model.toJSON();
		producto.precio = parseFloat(producto.precio).toFixed(2);
	    var html = this.template(producto);
	    this.$el.html(html);
	    return this;
	},
});