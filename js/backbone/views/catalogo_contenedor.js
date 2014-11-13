Loviz.Views.Catalogo_contenedor = Backbone.View.extend({
	el:$('#catalogos'),
	events: {
	},
	initialize : function () {
		var self = this;		
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
});