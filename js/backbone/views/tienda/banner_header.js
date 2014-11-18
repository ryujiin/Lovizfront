Loviz.Views.Banner_header = Backbone.View.extend({
	el:$('#banner_header'),
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
			this.$el.removeClass('no_home');
		}else{
			this.$el.addClass('no_home');
		}
		if (e === 'root' || e === 'catalogo') {
			this.$el.show();	
		}else{
			this.$el.hide();
		}
	}
});
