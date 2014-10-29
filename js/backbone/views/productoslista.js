Loviz.Views.ProductosLista = Backbone.View.extend({
  el: $('#productos'),

  //template: Handlebars.compile($("#album-template").html()),

  initialize: function () {
    this.listenTo(this.collection, "add", this.addOne, this);
  },

  render: function () {
    this.collection.forEach(this.addOne, this);
  },

  addOne: function (produ) {
  	var producto_list = new Loviz.Views.ProductoLista({ model: produ });
    this.$el.append(producto_list.render().el);
  },
  cargaCompleta:function(){
    this.$el.find('img').on('load',function(){
      $('body').addClass('loaded');
    });
  }
});