Loviz.Views.Lineas = Backbone.View.extend({
	//el : $('#cuerpo_lineas'),
  	template_vacio: swig.compile($("#carro_vacio_template").html()),
  	template: swig.compile($("#carro_lleno_template").html()),

	initialize: function () {
		this.$el = $('#cuerpo_lineas');
		this.render_lleno();
		this.contenedor = $('#cuerpo_lineas .cuerpo_lineas_lista');
    	this.listenTo(this.collection, "add", this.addOne, this);
	},
	render: function () {
		this.collection.forEach(this.addOne, this);
	},
	addOne: function (linea) {
		var linea_lista = new Loviz.Views.Linea({ model: linea });
		this.contenedor.append(linea_lista.render().el);
	},
	render_vacio:function () {
		var html = this.template_vacio();
		this.$el.html(html)
	},
	render_lleno:function () {
		var html = this.template();
		this.$el.html(html)	
	}
});