Loviz.Views.Landing_nuevos_productos = Backbone.View.extend({
	el:$("#nuevos_productos"),
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
		if (e === 'root') {
			this.$el.show();
		}else{
			this.$el.hide();
		}
	}
});
