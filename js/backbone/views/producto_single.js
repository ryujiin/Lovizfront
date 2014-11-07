Loviz.Views.ProductoSingle = Backbone.View.extend({
  tagName: 'article',

  events: {
    'click .cerrar_producto' : 'cerrar_info',
    'click .back-tienda' : 'cerrar_info',
    'click .add-to-cart' : 'addtocart',
    'click .filter-field.talla' : 'selecciontalla',
    'click .filter-field.talla .option-value' : 'tallaelegida',
    'click .filter-field.cantidad' : 'seleccionCantidad',
    'click .filter-field.cantidad .option-value' : 'cantidadelegida',
  },

  template: swig.compile($("#produto_single_theme").html()),

  initialize: function () {
    var self = this;
    this.listenTo(this.model, "change", this.render, this);
    this.render();
    window.routers.base.on('route',function(e,i){
      self.aparecer(e);
    });
  },

  render: function () {
    var producto = this.model.toJSON()
    var html = this.template(producto);
    this.$el.html(html);    
    $("#producto_single").append(this.$el);
  },
  aparecer:function (e) {
    if (e==='singleProducto') {
      var id = this.model.toJSON();
      id = id.id
      if (id==window.app.produto_id) {
        this.$el.show();
        console.log('show ' +id )
      }else{
        this.$el.hide();
        console.log('hide ' +id )
      }  
    }else{
      this.$el.hide();
    }
  },
  navigateCatalogo: function(){
    Backbone.history.navigate('/tienda/', {trigger:true});    
  },
  /*
  cargaCompleta:function(){
    this.$el.find('img').load(function(){
      $('body').addClass('loaded');
    })
    this.$el.show();
  },*/
  cerrar_info:function(){
    this.$el.fadeOut();
    this.navigateCatalogo();
  },
  addtocart:function(){
    //revisar valores de formulario
    var variacion = $('.formulario_producto input[name=variacion]').val();
    var cantidad = $('.formulario_producto input[name=cantidad]').val();
    var producto = $('.formulario_producto input[name=producto]').val();
    if (variacion!=='') {
      if (window.views.carro) {
        var carrito = window.views.carro.model.get('id');
        window.routers.base.crear_vistaLineas();
        if (window.views.lineas) {
          var modelo = new Loviz.Models.Linea()
          modelo.set({carro:carrito,producto:producto,variacion:variacion,cantidad:cantidad});
          window.views.mini_linea = new Loviz.Views.Mini_Linea({
            model:modelo
          });
          modelo.save().done(function () {
            window.views.mini_linea.render();
            window.views.mini_linea.aparecer();
            window.views.mini_carrito.model.fetch();
            window.views.lineas.collection.add(window.views.mini_linea.model);
          });
        };
      };
    }else{
      this.selecciontalla('olvido');
    }
  },
  crear_linea_chiquita:function () {
  },
  selecciontalla:function(o){
    this.num++
    if (o==='olvido') {
      $('.filter-field.talla .olvido').slideDown().delay(4000).slideUp();
    };
    var div = $('.filter-field.talla');
    var conte = $('.filter-field.talla .footer-contenido');
    $(div).toggleClass('selecionado');
    $(conte).slideToggle('slow');
  },
  tallaelegida:function(e){
    var div = e.currentTarget;
    var variacion = $(div).data('variacion');
    var talla = $(div).data('talla');
    $('.talla .selected').html(talla);
    //Colocar variacion a formulario
    $('.formulario_producto input[name=variacion]').val(variacion)
    //Mostrar precio
    $('.titulo_precio .precio').removeClass('visible');
    $('.titulo_precio .precio.'+variacion).addClass('visible');
  },
  seleccionCantidad:function () {
    var div = $('.filter-field.cantidad');
    var conte = $('.filter-field.cantidad .footer-contenido');
    $(div).toggleClass('selecionado');
    $(conte).slideToggle('slow');
  },
  cantidadelegida: function (e) {
    var div = e.currentTarget;
    var cantidad = $(div).data('cantidad');
    $('.cantidad .selected').html(cantidad);
    $('.formulario_producto input[name=cantidad]').val(cantidad)
  }
});

