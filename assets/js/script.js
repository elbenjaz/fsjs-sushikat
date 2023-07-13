const Orders = {
    create : () => {
        let textInput = document.querySelector("#orders-create-text"),
            text      = textInput.value.trim(),
            colors    = ["yellow", "green", "purple", "blue"];
    
        if (!text) {
            return false;
        }
    
        ordersJSON.push({ 
            id        : ordersJSON.length ? ordersJSON[ordersJSON.length-1].id + 1 : 1,
            text      : text,
            color     : colors[Math.floor(Math.random() * colors.length)],
            completed : false
        });
    
        textInput.value = "";
    
        Orders.render(ordersJSON);
    },

    edit : (id, completed) => {
        ordersJSON[ordersJSON.findIndex(order => order.id === id)].completed = completed;
        Orders.render(ordersJSON);
    },

    delete : (id) => {
        ordersJSON.splice(ordersJSON.findIndex(order => order.id === id), 1);
        Orders.render(ordersJSON);
    },

    render : (ordersJSON) => {
        let html      = "",
            completed = 0;

        ordersJSON.slice().reverse().forEach(order => {
            if (order.completed) {
                completed++;
            }

            html+= `<div class="order ${order.color} ${order.completed ? "orders-completed" : ""}">
                        <div class="d-flex justify-content-between">
                            <b>Order #${order.id}</b>
    
                            <button type="button" class="btn btn-sm orders-delete" onclick="Orders.delete(${order.id})">
                                <i class="fa-solid fa-xmark fa-lg"></i>
                            </button>
                        </div>
                        
                        <hr>
    
                        <p class="handwritten">${order.text.replace(/\n/g, "<br>")}</p>
    
                        <hr>
    
                        <div class="form-check">
                            <label>
                                <input class="form-check-input" type="checkbox" onclick="Orders.edit(${order.id}, this.checked)" ${order.completed ? "checked" : ""}>
                                <i class="fa-solid fa-bell-concierge fa-lg"></i> <b>Ready</b>
                            </label>
                        </div>
                    </div>`;
        });

        document.querySelector("#orders").innerHTML          = html;
        document.querySelector("#orders-feedback").innerHTML = ordersJSON.length ? `Orders <b>${ordersJSON.length}</b>, Ready <b>${completed}</b>!` : `...`;
    }
}

document.querySelector("#orders-create-form").addEventListener("submit", e => {
    e.preventDefault();
    Orders.create();
});

Orders.render(ordersJSON);
