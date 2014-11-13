Loviz.Views.Mini_Linea = Backbone.View.extend({
  el: $('#minilinea'),
  events: {
  },

  template: swig.compile($("#mini_linea_template").html()),

  initialize: function () {
    this.listenTo(this.model, "change", this.render, this);
  },

  render: function () {
    var album = this.model.toJSON()
    var html = this.template(album);
    this.$el.html(html);
  },
  aparecer : function () {
    this.$el.slideDown('slow').delay(3000).slideUp('fast');
  }
});