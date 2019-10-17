// eslint no-param-reassign: "error"
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    OrdenCompraProveedor: {
      tipo: 'cotizacion',
      cotizacion: 0,
      productos: [],
      proveedor: {},
      productosSeleccionados: [],
    },
    // UTILIZADO PARA AGREGAR O EDITAR CATEGORIAS
    Categoria: {
      idCategoria: 0,
      idEstatus: 1,
      nombre: '',
      idServicio: 0,
    },
    // UTILIZADO PARA AGREGAR O EDITAR PRODUCTOS
    Servicio: {
      idServicio: 0,
      nombre: '',
      idEstatus: 1,
    },
    Producto: {
      idProducto: 0,
      clave: '',
      nombre: '',
      idCategoria: 0,
      stock: 0,
      manoObra: 0,
      precioProducto: 0,
      precio: 0,
      unidadMedida: '',
      idEstatus: 1,
    },
    Cliente: { evento: null, datos: {} },
    proyecto: {
      isometrico: { value: true, file: [] },
      cliente: 0,
      moneda: { id: 1, moneda: 'MXN', valor: 1 },
      servicios: [],
      descuento: 0,
    },
  },
  getters: {
    listarProductosProyecto: state => state.proyecto.productos,
    file_isometrico: state => state.proyecto.isometrico,
    clienteProyecto: state => state.proyecto.cliente,
    monedaProyecto: state => state.proyecto.moneda,
    // RETORNAR PRODUCTO PARA ALMACEN (REGISTRO Y ACTUALIZACION)
    productoAlmacen: state => state.Producto,
    serviciosCotizacion: state => state.proyecto.servicios,
  },
  mutations: {
    agregarProductos: (state, productos) => {
      productos.forEach((producto) => {
        state.proyecto.productos.push(producto);
      });
    },
    eliminarProductoProyecto: (state, producto) => {
      const index = state.proyecto.productos.indexOf(producto);
      state.proyecto.productos.splice(index, 1);
    },
    set_cliente: (state, evento) => { state.cliente.evento = evento; },
    set_file_project: (state, isometrico) => { state.proyecto.isometrico = isometrico; },
    set_cliente_project: (state, cliente) => { state.proyecto.cliente = cliente; },
    set_valor_moneda: (state, valor) => { state.proyecto.moneda.valor = valor; },
    set_moneda: (state, moneda) => { state.proyecto.moneda = moneda; },
    set_servicio: (state, servicio) => { state.proyecto.servicios.push(servicio); },
    set_descuento_cotizacion: (state, descuento) => { state.proyecto.descuento = descuento; },
    // MUTACION PARA ACTUALIZAR CANTIDAD DE UN PRODUCTO (TAMBIÉN ACTUALIZA TOTALES)
    act_cantidad_producto_cotizacion: (state, {
      valor, producto, categoria, servicio,
    }) => {
      const service = state.proyecto.servicios.find(serv => serv === servicio);
      const categorie = service.categorias.find(cat => cat === categoria);
      const product = categorie.productos.find(p => p === producto);
      product.cantidad = valor;
      // actualizamos el precio total en cotizacion del producto
      product.precioCotizacion = (parseFloat(valor) * parseFloat(product.precio)).toFixed(2);
      // actualizamos el precio total de la categoria en cotizacion
      categorie.totalCategoria = categorie.productos.reduce((suma, val) => (parseFloat(suma) + parseFloat(val.precioCotizacion)).toFixed(2), 0);
      // actualizamos el precio total del servicio en la cotizacion
      service.totalServicio = service.categorias.reduce((suma, value) => (parseFloat(suma) + parseFloat(value.totalCategoria)).toFixed(2), 0);
    },
    // MUTACIÓN PARA REMOVER UN PRODUCTO DE UNA LA COTIZACION
    remover_producto_cotizacion: (state, { producto, categoria, servicio }) => {
      const service = state.proyecto.servicios.find((serv => serv === servicio));
      const cat = service.categorias.find(c => c === categoria);
      const product = cat.productos.find(p => p === producto);
      debugger;
      cat.productos.splice(product, 1);
      if (cat.productos.length <= 0) {
        console.log('Length productos en categoria');
        console.log(cat.productos.length);
        service.categorias.splice(cat, 1);
      }
      if (service.categorias.length <= 0) {
        console.log('Length categorias en servicio');
        console.log(service.categorias.length);
        state.proyecto.servicios.splice(service, 1);
      }
    },
    // MUTACION PARA REMOVER CATEGORIA DE COTIZACION
    remover_categoria_cotizacion: (state, { categoria, servicio }) => {
      const service = state.proyecto.servicios.find(serv => serv === servicio);
      service.categorias.splice(categoria, 1);
      if (service.categorias.length <= 0) {
        state.proyecto.servicios.splice(service, 1);
      }
    },
    remover_servicio_cotizacion: ({ proyecto }, servicio) => proyecto.servicios.splice(servicio, 1),
    // MUTACIONES PARA GUARDAR O ACTUALIZAR PRODUCTO(ALMACEN)
    set_producto: (state, producto) => { state.Producto = Object.assign({}, state.Producto, producto); },
    set_servicio_cotizacion: (state, servicio) => {
      state.proyecto.servicios.push(servicio);
      const { servicios } = state.proyecto;
      const total = servicios.reduce((suma, valor) => (parseFloat(suma) + parseFloat(valor.totalServicio)), 0);
      state.proyecto.totalProyecto = total.toFixed(2);
    },
    // MUTACION PARA GUARDAR SERVICIO
    set_servicio_new: (state, servicio) => {
      state.Servicio = Object.assign({}, state.Servicio, servicio);
    },
    // MUTACION PARA GUARDAR CATEGORIA
    set_categoria_new: (state, categoria) => {
      state.Categoria = Object.assign({}, state.Categoria, categoria);
    },
    // MUTACIONES PARA GENERAR ORDEN COMPRA
    set_orden_compra_proveedor: (state, ordenCompra) => {
      // valida si cambia el campo de cotizacion en Orden Compra
      if (state.OrdenCompraProveedor.cotizacion !== ordenCompra.cotizacion) {
        state.OrdenCompraProveedor.productosSeleccionados = [];
      }

      if (ordenCompra.tipo
          && state.OrdenCompraProveedor.tipo !== ordenCompra.tipo) {
        state.OrdenCompraProveedor.cotizacion = 0;
      }

      state.OrdenCompraProveedor = Object.assign({}, state.OrdenCompraProveedor, ordenCompra);
    },
    set_productos_ordenCompra_proveedor: (state, productos) => {
      state.OrdenCompraProveedor.productos = productos;
    },
    set_productosSeleccionados_ordenCompra_proveedor: (state, productos) => {
      const { productosSeleccionados } = state.OrdenCompraProveedor;
      productos.map(producto => productosSeleccionados.push(producto));
    },
    unset_productosSeleccionados_ordenCompra_proveedor: (state, productos) => {
      const { productosSeleccionados } = state.OrdenCompraProveedor;
      productos.map(producto => productosSeleccionados.splice(producto, 1));
    },
    // LIMPIAR DATOS DE PROYECTO
    limpiar_proyecto: (state) => {
      state.proyecto = {
        isometrico: { value: true, file: [] },
        cliente: 0,
        moneda: { id: 1, moneda: 'MXN', valor: 1 },
        servicios: [],
        descuento: 0,
      };
    },
  },
});
