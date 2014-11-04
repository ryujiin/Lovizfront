Loviz.Views.Linea = Backbone.View.extend({

  tagName: 'li',
  className: 'producto',

  events: {
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
});