Loviz.Views.ProductoSingle = Backbone.View.extend({
  el : $("#producto_single"),
  tagName: 'article',

  events: {
    'click .sidebar.side-left': 'navigateCatalogo',
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
  }
});

