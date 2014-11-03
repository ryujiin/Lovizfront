Loviz.Views.Perfil = Backbone.View.extend({
	el:$('#area_user'),
 	template: swig.compile($("#perfil_template").html()),
	events: {
		'click .salir_cuenta' : 'salir',		
	},
	initialize : function () {
		this.render();
    	this.listenTo(this.model, "change", this.render, this);
	},
	render: function () {
    var perfil = this.model.toJSON()
    var html = this.template(perfil);
    this.$el.html(html);
    this.$el.show();
  },
  salir:function(){
  	window.views.tienda.cerrarOverlay();
  	$.localStorage.removeAll();
  	$.removeCookie('carrito',{path:'/'});
  	this.remove();
	Backbone.history.navigate('/', {trigger:true});
  }
});
