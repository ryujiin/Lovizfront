Loviz.Views.Catalogo = Backbone.View.extend({
  el:$('#productos'),
  initialize: function () {
    this.listenTo(this.collection, "add", this.addOne, this);
  },
  render: function () {
    this.collection.forEach(this.addOne, this);
  },
  addOne: function (produ) {
  	var producto = new Loviz.Views.ProductoLista({ model: produ });
    this.$el.append(producto.render().el);
  }
});