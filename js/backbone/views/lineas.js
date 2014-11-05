Loviz.Views.Lineas = Backbone.View.extend({
	el:$('#cuerpo_lineas'),
  	template: swig.compile($("#carro_vacio_template").html()),

	initialize: function () {
    	this.listenTo(this.collection, "add", this.addOne, this);
	},
	render: function () {
		this.collection.forEach(this.addOne, this);
	},
	addOne: function (linea) {
		var linea_lista = new Loviz.Views.Linea({ model: linea });
		this.$el.append(linea_lista.render().el);
	},
	render_vacio:function () {
		var html = this.template();
		$('#cuerpo_lineas').append(html)
	},
});