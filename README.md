# Api com Autenticacao JsonWebToken

<div style="display: inline">
  <a href="https://www.jacksondev.com.br/" target="_blank">
    <img src="https://img.shields.io/static/v1?label=Website&message=JacksonDev&color=red&style=for-the-badge&logo=webflow"/>
  </a>
  <a href="https://nodejs.org/en/" target="_blank">
    <img src="https://img.shields.io/static/v1?label=&message=Node.js&color=7159c1&style=social&logo=nodedotjs"/>
  </a>
</div>

<h4>Clone este repositório</h4>

```javascript
git clone https://github.com/jacksonrp1/Api-com-Autenticacao-JsonWebToken.git
```

Acesse a pasta do projeto no terminal/cmd

<h4>Instale as dependências</h4>

```javascript
npm install
```

<h4>Execute a aplicação</h4>

```javascript
npm start
```

<h4>Se tudo estiver ok, você receberá a mensagem abaixo</h4>

```javascript
[nodemon] 2.0.20
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node api.js`
Servidor Online na porta 8090
```

---

<div style="display: inline">
  No exemplo abaixo foi utilizado o 
  <a href="https://insomnia.rest/download" target="_blank">
    <img src="https://img.shields.io/static/v1?label=&message=Insomnia&color=7159c1&style=social&logo=insomnia"/>
  </a>
</div>

<p>Selecione a requisição do tipo POST, cole seu URL + "/login"</p>
<p>Em body, selecione JSON</p>

```javascript
{
  "username": "jackson",
  "password": "123"
}
```

<p>Você recebera Status 200</p>

![Acessoliberado](https://user-images.githubusercontent.com/83042566/199594501-ed0fb8b0-3399-440d-aee6-1f83ae49c24e.jpg)

<p>Você recebera Status 401 se o login ou senha estiver diferente</p>

![Acessonegado](https://user-images.githubusercontent.com/83042566/199594575-fff9a6fb-ca39-45e1-b852-0245791e7739.jpg)

<p>Após gerar o token, selecione a requisição do tipo GET, cole seu URL + "/"</p>
<p>Adicione no header "x-access-token"</p>

<p>Você recebera Status 200 se o token estiver válido</p>

![Tokenvalido](https://user-images.githubusercontent.com/83042566/199601181-01a3487b-1fac-45c4-827f-01a4aaef95ca.jpg)

<p>Você recebera Status 401 se o token estiver vencido ou se estiver com algum caractere diferente</p>

![Tokeninvalido](https://user-images.githubusercontent.com/83042566/199594705-9b06fb82-6242-4470-8967-540cf09375ce.jpg)

---

<p>Caso queira fazer a solicitação direto no navegador, acesse seu URL</p>
<p>Exemplo: http://localhost:8090 </p>

```javascript
const url = 'http://localhost:8090'
let token = ''

const req = await fetch(`${url}/login`,{
    cache: 'default',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          method: 'POST',
          mode: 'cors',
    body: JSON.stringify({
        "username": "jackson",
        "password": "123"
    })
})
const res = await req.json().then(response=>{
    token = response.token
    console.log(response)})
console.log(token)
```

<p>A resposta será</p>

```javascript
{
  auth: true
  response: "Logado com sucesso."
  token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibG9naW4iOiJqYWNrc29uIiwiaWF0IjoxNjY3NDEzNDgzLCJleHAiOjE2Njc0MTM3ODN9.
  tb1stFXWPJUuEsY39HDFL60WWZ3dbOkg9gG6H6cJsXo"
}
```

<p>Após gerar o token, cole-o no local indicado abaixo como token</p>

```javascript
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVcJ9.eyJpZCI6MSwibG9naW4iOiJqYWNrc29uIiwiaWF0IjoxNjY3NDE2MTM2LCJleHAiOjE2Njc0MTY0MzZ9.FbgZIVBeDUkvVOaxHgBZ2lGP5_fy7JrXh3e_8IqyxDE'
const url = 'http://localhost:8090'

const req = await fetch(`${url}/`, {
  cache: 'default',
  headers: {
    'Content-Type': 'application/json',
    'x-access-token': token,
    Accept: 'application/json'
  },
  method: 'GET'
})
const res = await req.json().then(response => console.log(response))
```

<p>Você recebera Status 200 se o token estiver válido</p>

```javascript
{auth: true, response: 'Acesso liberado.'}
```

<p>Você recebera Status 401 se o token estiver vencido, ou estiver com algum caractere diferente</p>

```javascript
{auth: false, response: 'Código de acesso expirado.'}
```
