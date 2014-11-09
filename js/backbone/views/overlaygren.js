Loviz.Views.Overlayverde = Backbone.View.extend({
	el:$('.overlayverde'),
	events:{
		'click':'cerrar_back',
	},
	initialize: function () {
		var self = this;
		this.verse = true;
		window.routers.base.on('route',function(e){
			self.aparece();
	    });
	},
	aparece:function () {
		if (window.app.page===true) {
			this.$el.show();
		}else{
			this.$el.hide();
		}
	},
	cerrar_back:function () {
		window.app.page===false;
		window.routers.base.back();
	},
	no_hacernada:function () {
		this.verse = false;
	},
});