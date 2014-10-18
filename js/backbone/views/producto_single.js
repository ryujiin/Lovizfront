Loviz.Views.ProductoSingle = Backbone.View.extend({
  el : $("#producto_single"),
  tagName: 'article',

  events: {
    'click .sidebar.side-left': 'navigateCatalogo',
    'click .informacion-completa' : 'mostrar_info',
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
  },
  navigateCatalogo: function(){
    Backbone.history.navigate('/tienda/', {trigger:true});    
  },
  mostrar_info : function (){
    $('.pr_info').hide();
    $('.info-wrapper').show(1000);
  },
  cerrar_info : function (){
    $('.info-wrapper').hide();
    $('.pr_info').show(1000);
  }
});

