Loviz.Views.Filtro = Backbone.View.extend({

  template: swig.compile($("#carro_num_template").html()),

  initialize: function () {
    this.$el = $('#cant_productos');
    this.listenTo(this.model, "change", this.render, this);
  },

  render: function () {
    var album = this.model.toJSON()
    var html = this.template(album);
    this.$el.html(html);
  },
});