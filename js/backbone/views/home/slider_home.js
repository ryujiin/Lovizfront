Loviz.Views.Slider_home = Backbone.View.extend({
	events: {
	},
	initialize : function ($el) {
		var self = this;
		this.$el = $el;
		window.routers.base.on('route',function(e){
			self.aparecer(e);
		});
		window.routers.catalogo.on('route',function(e){
			self.aparecer(e);
		});
	},
	aparecer: function (e) {
		if (e==='root') {
			this.$el.show();
		}else{
			this.$el.hide();
		}
	}
});
