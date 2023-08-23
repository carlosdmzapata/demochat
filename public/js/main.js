const socket = io()
let user;
const InputMSJ = document.getElementById('msj');

Swal.fire({
    title: "Bienvenido",
    input: 'text',
    text: 'Identificate para acceder al chat',
    icon: 'success',
    inputValidator: (value)=> {
        return !value && 'debes identificarte'
    },
    allowOutsideClick: false,
}).then((result) => {
    user = result.value;
    socket.emit('sayhello', user)
});


function render(data) {
	const html = data
		.map((elem, index) => {
			return `<div>
                <strong>${elem.user}:</strong>
                <p>${elem.msj}</p>
            </div>`;
		})
		.join(' '); 

	document.getElementById('messages').innerHTML = html;
}

InputMSJ.addEventListener('keyup', event => {
    if (event.key === "Enter"){
        let msj = InputMSJ.value;
        if (msj.trim().length > 0 ){
            socket.emit("message", {user, msj});
            InputMSJ.value = '';
        }
    }
});

socket.on('messages', data => {
    render(data)
})

socket.on('connected', (data)=> {
    Swal.fire({
        text: `Se conectó ${data}`,
        toast: true,
        position: 'top-right'
    });
});
