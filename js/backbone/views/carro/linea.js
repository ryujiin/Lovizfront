Loviz.Views.Linea = Backbone.View.extend({

  tagName: 'tr',
  className: 'linea_carro',

  events: {
    'click .accion span': 'removelinea',
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
  removelinea:function () {
    this.$el.fadeOut('slow');
    this.model.destroy().done(function () {
      window.models.carro.fetch();
    })
  }
});