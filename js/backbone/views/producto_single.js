Loviz.Views.ProductoSingle = Backbone.View.extend({
  el : $("#producto_single"),
  tagName: 'article',

  events: {
    'click .cerrar_producto' : 'cerrar_info',
    'click .back-tienda' : 'cerrar_info',
    'click .add-to-cart' : 'addtocart',
    'click .filter-field.talla' : 'selecciontalla',
    'click .filter-field.talla .option-value' : 'tallaelegida',
  },

  template: swig.compile($("#produto_single_theme").html()),

  initialize: function () {
    this.listenTo(this.model, "change", this.render, this);
  },

  render: function () {
    var producto = this.model.toJSON()
    var html = this.template(producto);
    this.$el.html( html );
    this.cargaCompleta();
  },
  navigateCatalogo: function(){
    Backbone.history.navigate('/tienda/', {trigger:true});    
  },
  cargaCompleta:function(){
      this.$el.find('img').on('load',function(){
        $('body').addClass('loaded');
      });
      this.$el.show()
  },
  cerrar_info:function(){
    this.$el.fadeOut();
    this.navigateCatalogo();
  },
  addtocart:function(){
    //revisar valores de formulario
    var variacion = $('.formulario_producto input[name=variacion]').val();
    if (variacion!=='') {
      console.log('paso variacion');
    }else{
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
    console.log(this)
  },
  tallaelegida:function(e){
    var div = e.currentTarget;
    var variacion = $(div).data('variacion');
    var talla = $(div).data('talla');
    $('.talla .selected').html(talla);
    $('.formulario_producto input[name=variacion]').val(variacion)
  }
});

