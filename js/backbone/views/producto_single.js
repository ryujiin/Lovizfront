Loviz.Views.ProductoSingle = Backbone.View.extend({
  el : $("#producto_single"),
  tagName: 'article',

  events: {
    'click .icon-cross' : 'cerrar_info',
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
  },
});

