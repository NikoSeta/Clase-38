const socket = io.connect();

function render(data) {
    const html = data.map((elem, index) => {
        return(`
        <div>
            <div>${elem.avatar}</div>
            <strong>${elem.alias}, ${elem.age}</strong>:
            <em>${elem.text}</em>
        </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
    console.log(html);
}

function addMessage(e) {
    const mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };
    socket.emit('new-message', mensaje);
    return false;
}
socket.on('messages', data => {
    render(data);
});