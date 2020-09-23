const leerData = fetch(
    'https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json'
).then((resp) => resp.json()).then(mostrarData);

var carrito = new Array();

function mostrarData(array)
{
    console.log(array);

    
    for(let i =0; i < array.length; i++)
    {
        var category = array[i];
        var categoryProducts = category.products;

        const divPrincipal = document.createElement("div");
        divPrincipal.className = "container p-4 p-md-4 mb-4 border-bottom container-md container-lg secciones";
        if(i == array.length-1) divPrincipal.id = "Drinks";
        else divPrincipal.id = category.name;

        const divHijo1 = document.createElement("div");
        divHijo1.className = "row justify-content-md-center container-sm container-md container-lg border-bottom mb-4";

        const contenidoHijo1 = document.createElement("h2");
        contenidoHijo1.textContent = category.name;

        divHijo1.appendChild(contenidoHijo1);

        divPrincipal.appendChild(divHijo1);

        const divHijo2 = document.createElement("div");
        divHijo2.className = "row mb-3 container-md container-lg";


        for(let j = 0; j < categoryProducts.length; j++)
        {
            var actual = categoryProducts[j];
            var quantity = 1;

            const juntado = document.createElement("div");
            juntado.className = "col-lg-3 border rounded overflow-hidden";
        

            const imagen = document.createElement("img");
            imagen.src = actual.image;
            imagen.height = 200;
            imagen.width = 260;
        
            const name = document.createElement("h4");
            name.textContent = actual.name;

            const description = document.createElement("p");
            description.textContent = actual.description;

            const price = document.createElement("h4");
            price.textContent = "$"+actual.price;

            const boton = document.createElement("button");
            boton.type = "button";
            boton.id = "add";
            boton.className = "btn btn-dark botonProducto";
            boton.textContent = "Add to cart";

            boton.onclick = function(){

                const fila = document.createElement("tr");
                const idFila = document.createElement("th");
                idFila.scope = "row";
                idFila.textContent = (carrito.length+1);

                const cantidad = document.createElement("td");
                const descripcionTabla = document.createElement("td");
                const valorUnitario = document.createElement("td");
                const amount = document.createElement("td");

                const yaExiste = carrito.find(element => element == actual);
                if(yaExiste != null) 
                {
                    quantity++;
                    yaExiste.setQty();
                    cantidad.textContent = yaExiste.getQty;
                    descripcionTabla.textContent = yaExiste.getDesc;
                    valorUnitario.textContent = yaExiste.getUnitP;
                    amount.textContent = yaExiste.getAmount;
                }
                else
                {
                    var nuevo = new Detail(quantity, actual.name, actual.price);
                    cantidad.textContent = nuevo.getQty;
                    descripcionTabla.textContent = nuevo.getDesc;
                    valorUnitario.textContent = nuevo.getUnitP;
                    amount.textContent = nuevo.getAmount;
                    carrito.push(nuevo);
                }

                fila.appendChild(idFila);
                fila.appendChild(cantidad);
                fila.appendChild(descripcionTabla);
                fila.appendChild(valorUnitario);
                fila.appendChild(amount);
                
                const items = document.createElement("h6");
                items.textContent = carrito.length+" items";
                items.setAttribute("id", "nuevo");

                const cambio = document.querySelector(".numeroItems");
                const anterior = document.getElementById("nuevo");
                cambio.replaceChild(items, anterior);

                const meterFila = document.querySelector(".tablita");
                meterFila.appendChild(fila);
                calcularTotal();
            };

            juntado.appendChild(imagen);
            juntado.appendChild(name);
            juntado.appendChild(description);
            juntado.appendChild(price);
            juntado.appendChild(boton);

            divHijo2.appendChild(juntado);
        }

        divPrincipal.appendChild(divHijo2);

        const contenedor = document.querySelector(".cajita");
        contenedor.appendChild(divPrincipal);

        console.log(contenedor);
    }

    function calcularTotal()
    {
        var suma = 0;
        for(let i =0; i <carrito.length;i++)
        {
            suma += carrito[i].getAmount;
        }
        
        const total = document.getElementById("suma");
        total.textContent = + suma;
    }

    function deleteOrder() 
    {
        let tabla = document.getElementsByClassName("tablita");
        while (tabla.firstChild) 
        {
          tabla.removeChild(tabla.firstChild);
        }
        botonBorrar.setAttribute("data-dismiss", "modal");
        carrito = [];
    }
    
    function hide()
    {
        let l = document.getElementsByClassName("secciones");
        for(let i = 0; i < l.length; i++)
        {
            l[i].hidden = true;
        }
    }

    function showBurguers()
    {
        hide();
        document.getElementById("Burguers").hidden = false;
    }

    function showTacos()
    {
        hide();
        document.getElementById("Tacos").hidden = false;
    }

    function showSalads()
    {
        hide();
        document.getElementById("Salads").hidden = false;
    }

    function showDesserts()
    {
        hide();
        document.getElementById("Desserts").hidden = false;
    }

    function showDrinks()
    {
        hide();
        document.getElementById("Drinks").hidden = false;
    }

    function showDetail()
    {
        hide();
        document.getElementById("orderTabla").hidden = false;
    }

    function confirmOrder()
    {
        console.log(carrito); 
    }

    let botonBurguers = document.getElementById("bur");
    botonBurguers.onclick = function(){
        showBurguers();
    };

    let botonTacos = document.getElementById("tac");
    botonTacos.onclick = function(){
        showTacos();
    }

    let botonSalads = document.getElementById("sal");
    botonSalads.onclick = function(){
        showSalads();
    }

    let botonDesserts = document.getElementById("des");
    botonDesserts.onclick = function(){
        showDesserts();
    }

    let botonDrinks = document.getElementById("dri");
    botonDrinks.onclick = function(){
        showDrinks();
    }

    let botonDetail = document.getElementById("botonDetail");
    botonDetail.onclick = function(){
        showDetail();
    }

    let botonBorrar = document.getElementById("deleteOrder");
    botonBorrar.onclick = function(){
        deleteOrder();
    }

    let botonConfirm = document.getElementById("confirmOrder");
    botonConfirm.onclick = function(){
        confirmOrder();
    }

    let botonCancel = document.getElementById("botonCancel");
    botonCancel.onclick = function(){
        const modal = document.getElementById("cancelModal");
        modal.style.display = 'none';
    }

    class Detail
    {
        constructor(qty, desc, unitp)
        {
            this.qty = qty;
            this.desc = desc;
            this.unitp = unitp;
            this.amount = 0;
        }

        get getQty() 
        {
            return this.qty;
        }

        get getDesc() 
        {
            return this.desc;
        }

        get getUnitP()
        {
            return this.unitp;
        }

        get getAmount()
        {
            return this.qty * this.unitp;
        }

        setQty()
        {
            this.qty = this.qty+1;
        }

    }
}
