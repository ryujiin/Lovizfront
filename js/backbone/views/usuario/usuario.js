Loviz.Views.Usuario = Backbone.View.extend({
	el:$("#usuario"),
	events: {
	},
	initialize : function () {
		var self = this;
		window.routers.base.on('route',function(e){
			self.aparecer(e);		
		});
		window.routers.catalogo.on('route',function(e){
			self.aparecer(e);		
		});
	},
	aparecer:function (e) {
		if (e === 'ingresar') {
			this.$el.show();
		}else{
			this.$el.hide();
		}
	}
});
