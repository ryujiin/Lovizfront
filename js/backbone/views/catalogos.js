Loviz.Views.Catalogos = Backbone.View.extend({
	el:$('#titulo_catalogo'),
	template : swig.compile($("#catalogos_template").html()),
	events: {
	},
	initialize : function () {
		var self = this;
		this.render();
		
		window.routers.catalogo.on('route',function(e){
			self.aparecer(e);
		});
		window.routers.base.on('route',function(e){
			self.aparecer(e);
		});
	},
	render:function () {
	    //var album = this.model.toJSON()
	    var html = this.template();
	    this.$el.html(html);
  	},
	aparecer:function (e) {
		if (e === 'catalogo') {
			this.$el.show();
		}else{
			this.$el.hide();
		}
	},
});
