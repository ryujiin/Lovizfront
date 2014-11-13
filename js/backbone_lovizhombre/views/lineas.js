Loviz.Views.Lineas = Backbone.View.extend({

	initialize: function () {
		this.$el = $('#lineas_carro_cuerpo');
    	this.listenTo(this.collection, "add", this.addOne, this);
	},
	render: function () {
		this.collection.forEach(this.addOne, this);
	},
	addOne: function (linea) {
		var linea_lista = new Loviz.Views.Linea({ model: linea });
		this.$el.append(linea_lista.render().el);
	},
});