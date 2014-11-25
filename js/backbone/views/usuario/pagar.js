Loviz.Views.Pagar = Backbone.View.extend({
	el:$("#pagar"),

	template: swig.compile($("#pagar_template").html()),

	events: {
	},
	initialize : function () {
		var self = this;
	    
	    this.render();

	    //this.listenTo(this.model, "change", this.render, this);

		window.routers.base.on('route',function(e){
			self.aparecer(e);		
		});
		window.routers.catalogo.on('route',function(e){
			self.aparecer(e);		
		});
	},
	render:function () {
		//var user = this.model.toJSON()
        var html = this.template();
        this.$el.html(html);
	},
	aparecer:function (e) {
		if (e === 'pagar') {
			this.$el.show();
		}else{
			this.$el.hide();
		}
	},
});
