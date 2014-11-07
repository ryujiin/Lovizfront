Loviz.Views.Catalogo = Backbone.View.extend({
  el: $('#productos'),

  initialize: function () {
    var self = this;
    this.listenTo(this.collection, "add", this.addOne, this);
    window.routers.base.on('route',function(e){
      if (e==='tiendaCatalogo') {
        self.$el.show()
      }else{
        self.$el.hide();
      }
    });
  },
  render: function () {
    this.collection.forEach(this.addOne, this);
  },
  addOne: function (produ) {
  	var producto = new Loviz.Views.Producto({ model: produ });
    window.models.productos[produ.id]= produ;
    this.$el.append(producto.render().el);
  }
});