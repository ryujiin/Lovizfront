Loviz.Views.Overlayverde = Backbone.View.extend({
	el:$('.overlayverde'),
	events:{
		'click .back': 'cerrar_back',
		'click #capaPage':'no_hacernada',
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
		if (this.verse===true) {
			window.routers.base.back();
		}
		this.verse = true
	},
	no_hacernada:function () {
		this.verse = false;
	}
});