Loviz.Views.Linea = Backbone.View.extend({

  tagName: 'tr',
  className: 'linea_carro',

  events: {
    'click .linea-accion':'eliminar_linea',
  },

  template: swig.compile($("#linea_template").html()),

  initialize: function () {
    this.listenTo(this.model, "change", this.render, this);
  },

  render: function () {
    var album = this.model.toJSON()
    var html = this.template(album);
    this.$el.html(html);
    return this;
  },
  eliminar_linea:function () {
    this.model.destroy();
    window.views.mini_carrito.model.fetch().done(function (data) {
      this.$el.slideUp('slow');
    })
  }
});