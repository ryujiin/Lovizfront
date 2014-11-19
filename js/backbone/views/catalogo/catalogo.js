Loviz.Views.Catalogo_contenedor = Backbone.View.extend({
	el:$('#catalogo'),
	events: {
	},
	initialize : function () {
		var self = this;
    	
    	this.listenTo(this.collection, "add", this.addOne, this);

		window.routers.catalogo.on('route',function(e){
			self.aparecer(e);
		});
		window.routers.base.on('route',function(e){
			self.aparecer(e);
		});
	},
	aparecer:function (e) {
		if (e === 'catalogo') {
			this.$el.show();
		}else{
			this.$el.hide();
		}
	},
	addOne: function (produ) {
		var producto = new Loviz.Views.ProductoLista({ model: produ });
		this.$('.productos').append(producto.render().el);
	}
});