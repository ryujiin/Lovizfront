Loviz.Views.ProductosLista = Backbone.View.extend({
  el: $('#productos'),

  initialize: function () {
    var self = this;
    this.listenTo(this.collection, "add", this.addOne, this);
    window.routers.base.on('route',function(e){
      if (e==='tiendaCatalogo') {
        self.$el.show();
      }else{
        self.$el.hide();
      }
    });
  },
  render: function () {
    this.collection.forEach(this.addOne, this);
  },
  addOne: function (produ) {
  	var producto_list = new Loviz.Views.ProductoLista({ model: produ });
    this.$el.append(producto_list.render().el);
  },
  primeraCarga:function(){
    var self = this;
    this.$el.find('img').on('load',function(){
      $('body').addClass('loaded');
    });
  },
  aparecer : function(){
    $('#tienda').show();
  }
});