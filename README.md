# 🎟️ TicketUp - Sistema de Ingressos para Museu

> Plataforma web moderna, responsiva e interativa para **venda e gestão de ingressos de museu**, com checkout simulado, emissão de ingressos com QR Code, envio de e-mails simulados e painel administrativo completo (CRUD).
> 
> **Zero dependências** e pronto para publicação no **GitHub Pages**!

---

## 🎨 Identidade Visual e Paleta de Cores
O projeto foi desenvolvido seguindo rigorosamente a identidade solicitada:
* **Branco (`#FFFFFF` / `#F8FAFC`)**: Fundos limpos, cartões e superfícies que garantem leitura fluida e sensação de galeria de arte contemporânea.
* **Azul (`#1D4ED8` / `#2563EB` / `#3B82F6` / `#DBEAFE`)**: Destaques, botões de ação (CTA), links e acentos vibrantes.
* **Preto (`#09090B` / `#18181B`)**: Elementos institucionais de alto contraste, tipografia marcante, barra de avisos e rodapé elegante.

### 🖼️ Identidade Visual e Mascote Oficial
O site agora conta com o mascote oficial do **TicketUp**: o pinguim simpático segurando o bilhete com estrelas.
* O arquivo está localizado em `assets/logo.jpg`.
* Ele é utilizado automaticamente no **cabeçalho**, no **rodapé**, no **voucher oficial de impressão**, na **aba do navegador (favicon)** e no **cabeçalho dos e-mails simulados**.
* Caso deseje alterar futuramente, basta substituir o arquivo `assets/logo.jpg` mantendo o mesmo nome.

---

## ✨ Funcionalidades Principais

### 1. 🏛️ Para o Visitante (Processo de Compra Simulado)
* **Catálogo Dinâmico de Exposições:** Filtre por temas (*Arte & Pintura, História & Arqueologia, Ciência & Tecnologia, Experiências Noturnas*) ou busque em tempo real por palavras-chave.
* **Seleção Inteligente de Ingressos:** Escolha a data de visitação com antecedência, horário de entrada (*Manhã, Tarde ou Noite*) e selecione quantidades de **Inteira** e **Meia-entrada** (50% de desconto legal).
* **Checkout Simulado:** Preenchimento de dados do comprador (Nome, E-mail, CPF, Telefone) e seleção de método simulado (*Pix Instantâneo ou Cartão de Crédito*). Nenhum dado bancário real ou cobrança monetária é efetuada.
* **Voucher Digital com QR Code:** Gera um ingresso oficial com código de rastreio, detalhes da ala, regras de visitação e um QR Code dinâmico renderizado em `<canvas>`.
* **Impressão / PDF:** Botão dedicado que formata automaticamente a página para impressão limpa do voucher (via `@media print`).
* **Caixa de Entrada de E-mails Simulada:** Sistema interno de webmail que simula o recebimento em tempo real do e-mail com a confirmação de compra e o ingresso em anexo.

### 2. ⚙️ Para a Administração do Museu (Painel Admin Interativo)
Acesse a qualquer momento clicando no botão **"Painel Admin"** no topo da página:
* **Criar Novo Ingresso:** Cadastre título da mostra, categoria, preços (Inteira e Meia), capacidade diária de visitantes, ala/local do museu, foto de capa e descrição completa.
* **Editar Ingressos Existentes:** Altere valores, texto descritivo e limites de capacidade com 1 clique.
* **Pausar ou Retomar Vendas:** Controle o status de venda de cada exposição (*À Venda*, *Venda Pausada* ou *Esgotado*).
* **Excluir Ingressos:** Remova mostras encerradas com confirmação de segurança.
* **Relatório de Vendas em Tempo Real:** Tabela com todos os pedidos simulados, nomes dos compradores, ingressos emitidos e faturamento total arrecadado.
* **Backup e Restauração:** Exporte dados em formato JSON ou restaure os dados de demonstração a qualquer momento.
* **Persistência Local (`localStorage`):** Todas as alterações administrativas e compras são salvas no próprio navegador sem necessidade de banco de dados externo ou servidor backend.

---

## 🚀 Como Hospedar no GitHub Pages (Passo a Passo)

Como o projeto é composto por arquivos estáticos puros (`index.html`, `style.css`, `app.js` e a pasta `assets/`), ele funciona imediatamente e sem custo algum no **GitHub Pages**.

### Opção A: Pelo Navegador (Sem precisar instalar o Git)
1. Acesse [github.com](https://github.com) e crie um novo repositório (exemplo: `ticketup-museu`).
2. Marque o repositório como **Public** (Público).
3. Na página inicial do repositório recém-criado, clique em **"uploading an existing file"** (ou arraste os arquivos para a página).
4. Arraste todos os arquivos e pastas deste projeto:
   - `index.html`
   - `style.css`
   - `app.js`
   - `README.md`
   - Pasta `assets` (contendo `logo.jpg`)
5. Clique no botão verde **"Commit changes"**.
6. Vá na aba **Settings** (Configurações) do repositório no GitHub.
7. No menu lateral esquerdo, clique em **Pages**.
8. Em **Branch**, selecione `main` (ou `master`) e a pasta `/(root)`. Clique em **Save**.
9. Aguarde cerca de 1 a 2 minutos. O GitHub fornecerá o link público do seu site:
   `https://seu-usuario.github.io/ticketup-museu/`

---

### Opção B: Pelo Terminal / Linha de Comando (com Git instalado)
Se tiver o Git configurado no seu computador:
```bash
# 1. Inicializar o repositório local
git init

# 2. Adicionar todos os arquivos
git add .

# 3. Criar o primeiro commit
git commit -m "feat: Site TicketUp Museu completo com painel admin e checkout simulado"

# 4. Vincular ao seu repositório remoto no GitHub (substitua pelo seu link)
git remote add origin https://github.com/SEU-USUARIO/ticketup-museu.git

# 5. Enviar para o GitHub
git branch -M main
git push -u origin main
```
Após o envio, basta ativar o **GitHub Pages** na aba *Settings > Pages* conforme explicado na Opção A!

---

## 🛠️ Tecnologias Utilizadas
* **HTML5 Semântico:** Estrutura acessível com metatags, diálogos, tabelas e botões nativos.
* **CSS3 Moderno:** Flexbox, CSS Grid, variáveis nativas (Custom Properties), tipografia Google Fonts (*Plus Jakarta Sans* e *Space Grotesk*), sombras suaves e layout 100% responsivo para celulares, tablets e computadores.
* **JavaScript Puro (ES6+):** Manipulação reativa de estado com `localStorage`, gerador procedural de QR Code em HTML5 Canvas, modais dinâmicos e sistema de notificações Toast.
* **Sem dependências externas pesadas:** Não precisa de Node.js, npm, Webpack ou Vite para rodar!

---

## 📄 Licença
Este projeto foi desenvolvido como modelo educacional e institucional para venda de ingressos do Museu TicketUp. Sinta-se livre para customizar, expandir e utilizar.
