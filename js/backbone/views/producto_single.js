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
    'click .down':'down',
    'click .up':'up',
  },

  template: swig.compile($("#produto_single_theme").html()),

  initialize: function () {
    var self = this;
    this.listenTo(this.model, "change", this.render, this);
    window.routers.base.on('route',function(e){
      self.aparecer(e);
    });
  },

  render: function () {
    var producto = this.model.toJSON()
    var html = this.template(producto);
    this.$el.html(html);    
    $("#producto_single").append(this.$el);
    this.crear_galeria();
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
  cerrar_info:function(){
    this.$el.fadeOut();
    this.navigateCatalogo();
  },
    addtocart:function(){
        //revisar valores de formulario
        var variacion = this.$('.formulario_producto input[name=variacion]').val();
        var cantidad = this.$('.formulario_producto input[name=cantidad]').val();
        var producto = this.$('.formulario_producto input[name=producto]').val();
        //Si la talla del producto si esta marcado
        if (variacion!=='') {
          //Verifico si la vista del carro exite
            if (window.views.carro) {
              //obetengo la id del carro
                var carrito = window.views.carro.model.get('id');
                //Verifico si exite la vista de las lineas en el carro
                if (window.views.lineas===undefined) {
                  //Si no existe la vista de las lineas las crea
                    window.views.lineas=window.routers.base.crear_vistaLineas();
                };                
                if (window.views.lineas) {
                    var modelo = new Loviz.Models.Linea()
                    modelo.set({carro:carrito,producto:producto,variacion:variacion,cantidad:cantidad});
                    window.views.mini_linea = new Loviz.Views.Mini_Linea({
                        model:modelo
                    });
                    modelo.save().done(function () {
                        window.views.mini_linea.render();
                        window.views.mini_linea.aparecer();
                        window.views.mini_carrito.model.fetch().done(function () {
                            var total=window.models.carro.toJSON().total
                            $.sessionStorage.set('total_carro',total)
                        });
                        window.views.lineas.collection.add(window.views.mini_linea.model);
                    });
                };
            };
        }else{
          //Si no Extiste talla de producto en el formulario
            this.selecciontalla('olvido');
        }
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
  },
  crear_galeria:function () {
    var div = this.$('#galeria_producto');
    div.owlCarousel({
      navigation:true,
      slideSpeed:300,
      paginationSpeed:400,
      singleItem:true,
    });
  },
  down:function () {
    this.$('.marco_producto').slideUp('slow');
    this.$('.down_num').hide();
    this.$('.up_num').show();
  },
  up:function () {
    this.$('.marco_producto').slideDown('slow');
    this.$('.down_num').show();
    this.$('.up_num').hide();
  }
});

