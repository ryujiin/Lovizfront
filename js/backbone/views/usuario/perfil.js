Loviz.Views.Perfil = Backbone.View.extend({
	el:$("#perfil"),

	template: swig.compile($("#perfil_template").html()),

	events: {
		'click' : 'salir',
	},
	initialize : function () {
		var self = this;
	    
	    this.render();

	    this.listenTo(this.model, "change", this.render, this);

		window.routers.base.on('route',function(e){
			self.aparecer(e);		
		});
		window.routers.catalogo.on('route',function(e){
			self.aparecer(e);		
		});
	},
	render:function () {
		var user = this.model.toJSON()
        var html = this.template(user);
        this.$el.html(html);
	},
	aparecer:function (e) {
		if (e === 'perfil') {
			this.$el.show();
		}else{
			this.$el.hide();
		}
	},
	salir:function () {
		$.sessionStorage.removeAll();
		var modelo = new Loviz.Models.Carro();
		window.models.carro.set(modelo.toJSON());
		window.views.tienda.navega_home();
	}
});
