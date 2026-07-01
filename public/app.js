var app = angular.module('ironforgeApp', []);

app.controller('MaquinaController', ['$scope', '$http', function($scope, $http) {
    
    $scope.listaMaquinas = [];
    
    // IMPORTANTE: Asegúrate de que esta estructura esté declarada tal cual
    $scope.pedido = {
        nombreCliente: '',
        telefonoCliente: '',
        productos: []
    };

    // 1. Cargar el catálogo desde tu backend
    $scope.obtenerMaquinas = function() {
        $http.get('/api/maquinas')
            .then(function(response) {
                $scope.listaMaquinas = response.data;
            })
            .catch(function(error) {
                console.error('Error al obtener máquinas:', error);
            });
    };

    // 2. Función interactiva: Añadir al carrito
    $scope.agregarAlPedido = function(maquina) {
        // Añadimos el objeto seleccionado al arreglo de productos
        $scope.pedido.productos.push(maquina);
        
        // Alerta flotante de Materialize para avisar al usuario
        M.toast({html: 'Añadido al pedido: ' + maquina.nombre, classes: 'blue darken-2'});
    };

    // 3. Función interactiva: Quitar del carrito
    $scope.quitarDelPedido = function(index) {
        $scope.pedido.productos.splice(index, 1);
        M.toast({html: 'Eliminado del pedido', classes: 'orange darken-3'});
    };

    // 4. Enviar el POST definitivo al servidor
    $scope.enviarPedido = function() {
        $http.post('/api/pedidos', $scope.pedido)
            .then(function(response) {
                M.toast({html: '¡Pedido enviado con éxito!', classes: 'green darken-2'});
                // Limpiamos el carrito tras el éxito
                $scope.pedido = {
                    nombreCliente: '',
                    telefonoCliente: '',
                    productos: []
                };
            })
            .catch(function(error) {
                console.error('Error al procesar el pedido:', error);
                M.toast({html: 'Error al enviar pedido', classes: 'red darken-2'});
            });
    };

    // Inicializamos la lista de máquinas nada más cargar la página
    $scope.obtenerMaquinas();
}]);