Loviz.Views.ProductoSingle = Backbone.View.extend({
	el:$("#producto_single"),
	events: {
		'click .thum_gale a' : 'nuevo_galeria',
		'click .addcart' : 'add_to_cart',
		'change .talla' : 'talla_seleccionada',
	},
	template: swig.compile($("#producto_single_template").html()),

	initialize: function () {
	    var self = this;
	    this.listenTo(this.model, "change", this.render, this);

	    window.routers.catalogo.on('route',function(e){
			self.aparecer(e);
		});
		window.routers.base.on('route',function(e){
			self.aparecer(e);
		});
	},
	render: function () {
	    var producto = this.model.toJSON()
	    var html = this.template(producto);
	    this.$el.html(html);
	    this.crear_galeria();
	    this.crear_relacionados();
	},
	crear_galeria:function () {
		this.$('.imagenes_grandes').zoom();
	},
	nuevo_galeria:function (e) {
		this.$('.imagenes_grandes').trigger('zoom.destroy');
		this.$('.imagenes_grandes').empty();
		var url = $(e.currentTarget).data('bigimga');
		var img = '<img src="'+url+'" alt="">';
		this.$('.imagenes_grandes').html(img);
		this.crear_galeria();
	},
	aparecer:function (e) {
		if (e==='producto_single') {
			this.$el.show();
		}else{
			this.$el.hide();
		}
	},
	add_to_cart:function () {
		var linea = new Loviz.Models.Linea();
		var produ = this.model.toJSON().id;
		var varia = this.$('.formulario_producto .talla').val();
		if (varia !=='') {
			var carro = window.models.carro.toJSON().id;
			linea.set({carro:carro,producto:produ,variacion:varia,cantidad:1});
			linea.save().done(function () {
				var miniline = new Loviz.Views.Linea_addcart({model:linea})
				window.models.carro.fetch();
			})
		}else{
			this.elige_talla();
		}
	},
	elige_talla:function () {
		this.$('.formulario_producto .talla').addClass('no_seleccionado');
	},
	talla_seleccionada:function () {
		this.$('.formulario_producto .talla').removeClass('no_seleccionado');
		this.$('.precios .visible').removeClass('visible');
		var varia = this.$('.formulario_producto .talla').val();
		this.$('.precios .'+varia).addClass('visible');
	},
	crear_relacionados:function () {
		var self = this;
		if (window.collections.catalogo.length===0) {
			window.collections.catalogo.fetch().done(function() {
				self.agregar_relacionados();
			})
		}else{
			self.agregar_relacionados();
		}
	},
	agregar_relacionados:function () {
		var self = this;
		window.collections.catalogo.forEach(function(modelo){
			if (modelo.toJSON().id!==self.model.toJSON().id) {
				var pro_rela = new Loviz.Views.ProductoLista({model:modelo});
				self.$('.productos').append(pro_rela.render().el);	
			};			
		});
	}
});

