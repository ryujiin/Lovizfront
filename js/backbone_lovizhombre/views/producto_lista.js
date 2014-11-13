Loviz.Views.ProductoLista = Backbone.View.extend({

  tagName: 'li',
  className: 'producto',

  events: {
    'click .enlace_producto': 'navigateSingleProducto',
  },

  template: swig.compile($("#producto_lista_theme").html()),

  initialize: function () {
    this.listenTo(this.model, "change", this.render, this);
  },

  render: function () {
    var album = this.model.toJSON()
    var html = this.template(album);
    this.$el.html(html);
    return this;
  },
  navigateSingleProducto: function(e){
    e.preventDefault(); 
    var enlace = e.currentTarget.pathname;

    Backbone.history.navigate(enlace, {trigger:true});
  },
});

