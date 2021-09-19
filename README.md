<h1>W-Register</h1>
## Tecnologias utilizadas:
O projeto foi desenvolvido usando as seguintes tecnologias
- Javascript/React
- PHP/Laravel

## Programas necessários para que o software funcione corretamente

- PHP >= 7.2
- APACHE
- MySQL
- COMPOSER
- Node.js >= 14

## Como executar a aplicação

- Clone o projeto
- Entre na pasta do projeto
- Execute os comandos
    <ul>
        <li>composer install</li>
        <li>npm install</li>
    </ul>
- Crie uma cópia do arquivo .env.example e salve como .env
- Crie um banco de dados como nome que desejar
- À partir da linha 10 do arquivo .env coloque as credenciais de acesso ao banco de dados
- Execute os comandos
    <ul>
        <li>php artisan key:generate</li>
        <li>php artisan migrate --seed</li>
        <li>php artisan serve</li>
        <li>npm run watch</li>
    </ul>
- 
Agora sua aplicação estará acessível no endereço 'http://localhost:8080'

<h3>Link da aplicação: http://wapp-register.herokuapp.com/</h3>
<ul>
    <li>Email: admin@teste.com</li>
    <li>Senha: 123456</li>
</ul>

