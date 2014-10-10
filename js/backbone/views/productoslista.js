Loviz.Views.ProductoLista = Backbone.View.extend({
  el: $('#productos'),

  //template: Handlebars.compile($("#album-template").html()),

  initialize: function () {
    this.listenTo(this.collection, "add", this.addOne, this);
  },

  render: function () {
    this.collection.forEach(this.addOne, this);
  },

  addOne: function (album) {
    console.log(album)
  }
});
