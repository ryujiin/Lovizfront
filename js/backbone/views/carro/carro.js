Loviz.Views.Carro = Backbone.View.extend({
	el:$('#carro'),
	template : swig.compile($("#carro_lleno_template").html()),
	template_vacio : swig.compile($("#carro_vacio_template").html()),

	events :{
		'click .pagar-boton':'ir_pagar',
	},
	initialize: function () {
		var self = this;
		
		this.listenTo(window.models.carro, "change", this.querender, this);
		
		window.routers.catalogo.on('route',function(e){
			self.aparecer(e);
		});
		window.routers.base.on('route',function(e){
			self.aparecer(e);
		});
	},
	querender:function () {
		if (window.models.carro.toJSON().lineas===0) {
			this.render_vacio();
		}else{
			this.render();
		}
	},
	render:function () {
		var html = this.template();
	    this.$el.html(html);
	    this.llenar_carro();
	},
	render_vacio:function  () {
		var html = this.template_vacio();
	    this.$el.html(html);
	},
	aparecer:function (e) {
		if (e==='carro') {
			this.$el.show();
		}else{
			this.$el.hide();
		}
	},
	llenar_carro:function () {
		var num = new Loviz.Views.Carro_num_producto({model:window.models.carro});
		var total = new Loviz.Views.Carro_total({model:window.models.carro});
		this.agre_linea();
	},
	addlinea:function (linea) {
		var linea_view = new Loviz.Views.Linea({ model: linea });
		this.$('.lineas').append(linea_view.render().el);
	},
	agre_linea:function () {
		var self = this;
		this.collection.fetch({
			data:$.param({carro:window.models.carro.toJSON().id})
		}).done(function () {
    		self.collection.forEach(self.addlinea, self);
		})
	},
	ir_pagar:function () {
		window.routers.base.navigate('/pagar/', {trigger:true});
	}
});