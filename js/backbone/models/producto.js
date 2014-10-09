Loviz.Models.Producto = Backbone.Model.extend({
	urlRoot : '/api/productos/',
	
	initialize : function () {
    	this.listenTo(this, "change", this.ver_datos, this);
	},
	ver_datos :function(){
		this.producto = this.toJSON();
		this.producto.id=parseInt(this.producto.id);
		variaciones = this.producto.variaciones.length;
		for (var i = 0; i < variaciones; i++) {
			this.producto.variaciones[i].precio= parseFloat(this.producto.variaciones[i].precio).toFixed(2);
			this.producto.variaciones[i].precio_minorista= parseFloat(this.producto.variaciones[i].precio_minorista).toFixed(2);
		};
	},
});
/*codigo:'17851'*/