Loviz.Views.CarroCompras = Backbone.View.extend({
	el:$('#carro_compra'),
  	template: swig.compile($("#carro_template").html()),

	initialize: function () {
		this.render();
    	//this.listenTo(this.collection, "add", this.addOne, this);
	},
	render: function () {
	    var html = this.template();
	    this.$el.html(html);
		//this.collection.forEach(this.addOne, this);
	},
	addOne: function (linea) {
		//var linea_lista = new Loviz.Views.Linea({ model: linea });
		//this.$el.append(linea_lista.render().el);
	},
});