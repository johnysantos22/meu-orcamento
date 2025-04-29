# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# Orçamento de Instalação de Câmeras

Este projeto foi criado para gerar orçamentos de instalação de câmeras de segurança com base nas escolhas do cliente. Ele permite calcular o valor do orçamento, gerar um PDF com os detalhes e enviar o orçamento por WhatsApp, tudo a partir de um formulário interativo. O objetivo principal deste projeto é facilitar o processo de vendas e orçamentos para empresas que trabalham com instalação de sistemas de câmeras de segurança.

## Funcionalidades

- **Formulário de Orçamento**: O cliente preenche informações, como tipo de câmera, quantidade, resolução, e outras características específicas, como a necessidade de nobreak ou acesso remoto.
- **Cálculo Automático**: O valor total do orçamento é calculado automaticamente com base nas opções selecionadas pelo cliente no formulário.
- **Geração de PDF**: O orçamento, com todos os detalhes, é gerado em um arquivo PDF, pronto para ser enviado ao cliente.
- **Envio via WhatsApp**: O orçamento gerado em PDF pode ser enviado diretamente ao número de WhatsApp do cliente, facilitando o processo de entrega.

## Como Rodar o Projeto

### Pré-requisitos

Antes de rodar o projeto, é necessário ter o seguinte instalado:

- **Node.js**: A plataforma para execução de JavaScript no lado do servidor.
- **npm (ou yarn)**: O gerenciador de pacotes do Node.js, usado para instalar as dependências do projeto.

### Passos para rodar:

1. Clone o repositório para o seu computador:
   ```bash
   git clone https://github.com/seu-usuario/orcamento-cameras.git
   cd orcamento-cameras

   ```bash
   npm install
