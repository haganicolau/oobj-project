1. Introdução
Este documento visa apresentar as tecnologias definidas para o desenvolvimento da
solução, bem como preparar o ambiente para que possa ser testada e executada.

2. Lista de Tecnologias
As tecnologias definidas para o desenvolvimento da solução estão descritas abaixo:
NodeJs: O framework é uma plataforma para desenvolvimento de aplicações do
lado do servidor, utiliza JavaScript e o V8 JavaScript Engine.
MongoDB: Banco de dados NoSQL baseado em documentos
SailsJS: framework desenvolvido em nodejs imitando a estrutura MVC pode ser
usado para qualquer aplicação web.
AngularJS: framework JavaScript código aberto, mantido pelo Google, que
auxilia na execução de single-page applications.

3. Configuração do ambiente
MongoDB: É utilizado banco remoto, não sendo necessário instalação. Será
disponibilizado juntamente com a documentação o acesso ao banco utilizado no
desenvolvimento da solução.
AngularJS: Faz parte da estrutura do projeto, todas as dependências já estão
declaradas e baixadas no projeto.
NodeJs e SailsJS, será deixado no próximo tópico como instalar o ambiente
NodeJs, e executar Sails.

3.1 Instalando NodeJs Ubuntu e iniciando o Sails

1- Instale o NodeJs
Node.js: backend do projeto
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
apt-get install -y nodejs
apt-get install -y build-essential
2- Baixe o projeto da solução desenvolvida, será disponibilizado tanto .zip no
email, quanto no github. Na solução .zip o banco MongoDB já estará
configurado, no github é necessário inserir o arquivo connections.js no diretório:
/config
3- Entre no diretório e execute o comando: “npm install”. Aguarde todas as
dependências serem instaladas.

Tecnologia e preparar o ambiente 3
4- Execute o comando sudo sails lift e sua aplicação back end irá rodar no
endereço: http://localhost:1337, endereço que será usado pelo cliente para
consumir os serviços da API.
5- Aponte seu servidor web, podendo ser, apache, nginx, para o diretório: /public
6- Execute a aplicação com as credenciais de acesso disponibilizadas.

3. Estrutura do projeto
No tópico 4 é apresentado uma imagem contendo a estrutura de diretórios e pastas. No
diretório “api” será encontrado a estrutura da solução do lado do servidor apresentada
neste projeto.
Models: Os modelos responsáveis por efetuar o mapeamento com o banco
MongoDB. O Sails faz uso do ORM Waterline, que permite integrar os modelos
com a estrutura do banco.
Controllers: Contém as funções que fazem uso dos services para validar tanto
autenticação quanto a integridade dos dados. Responsável por gerar as respostas
das requisições, se válidas ou não.
Services: Desenvolvimento das regras de negócio, desde do controle de
autenticação, a validação dos modelos antes das operações com o banco de
dados.
Config/routes: configuração das rotas, a partir do verbo e da rota, definir qual
função no controller é executada.
Config/conncetions: informações do banco (a solução faz uso de um banco
remoto, os dados de conexão, serão enviados juntamente com toda
documentação.
No diretório public, se encontra toda estrutura do módulo da aplicação que irá executar
no cliente. Esta estrutura é composta:
Js: Estrutura do AngularJS, cada diretório contém o código responsável por um
módulo diferente da aplicação: empresas, filiais, usuários. Cada documento é
responsável por uma responsabilidade única.
Views: Contém as páginas HTML que vão interagir com AngularJS.