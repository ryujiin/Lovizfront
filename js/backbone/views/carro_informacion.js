Loviz.Views.CarroInfo = Backbone.View.extend({
  template: swig.compile($("#informacion_de_carro_template").html()),

  initialize: function () {
    this.$el = $('#carro_info');
    this.listenTo(this.model, "change", this.render, this);
  },

  render: function () {
    var album = this.model.toJSON()
    var html = this.template(album);
    this.$el.html(html);
    debugger;
  },
});