Loviz.Views.Slider = Backbone.View.extend({
  className: 'productos',
  	
  	//template: swig.compile($("#Slider_ofertas").html()),

	initialize : function () {
    	this.listenTo(this.collection, "add", this.addOne, this);
	},
	render : function () {
    	this.collection.forEach(this.addOne, this);
	},
	addOne: function (producto) {
    	var productoView = new Loviz.Views.ProductoLista({ model: producto });
    	this.$el.append(productoView.render().el);
  	}
});