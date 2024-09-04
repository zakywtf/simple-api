const htmlSendPassword = async (body) => {
    return `<pre>Dear, <b>${body.name}</b>

Untuk login ke snow drop invitation dashboard, silahkan menggunakan data berikut :

Email      : ${body.email}
Password   : ${body.password}

Terimakasih,

Admin Snow Drop Invitation
</pre>`;
}

module.exports = htmlSendPassword