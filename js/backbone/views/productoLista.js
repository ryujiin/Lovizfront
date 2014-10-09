Loviz.Views.ProductoLista = Backbone.View.extend({
  	className: 'producto',
  	
  	template: swig.compile($("#Lita_producto").html()),

	events: {
		'click .producto-titulo h3 a' : 'navegarProducto',
		'click .imagen-producto' : 'navegarProducto',
	},
	initialize : function () {
    	this.listenTo(this.model, "change", this.render, this);
	},
	render : function () {
		var producto = this.model.toJSON();
		producto.precio = parseFloat(producto.precio).toFixed(2);		
		producto.precio_minorista = parseFloat(producto.precio_minorista).toFixed(2);		
	    var html = this.template(producto);
	    this.$el.html(html);
	    return this;
	},
	navegarProducto : function (e){
		e.preventDefault();
		Backbone.history.navigate('catalogo/producto/'+this.model.get("slug")+'-'+this.model.get("id")+'/', {trigger:true});
	}
});