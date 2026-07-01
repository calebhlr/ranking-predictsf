# 🏆 PredictSF Ranking MVP

Página estática, moderna e responsiva para publicar o ranking geral do PredictSF. O projeto lê os dados do arquivo `ranking.json`, ordena os participantes por pontuação em ordem decrescente e recalcula as posições automaticamente no navegador.

## Objetivo do projeto

O objetivo é manter um ranking simples de publicar e atualizar, sem painel administrativo, API, banco de dados ou etapa de compilação. Para atualizar a classificação, basta editar o arquivo `ranking.json`, salvar, versionar a alteração no Git e publicar novamente no Cloudflare Pages.

## Sem dependências de aplicação ou backend

Este projeto é composto apenas por arquivos estáticos:

- `index.html` para a estrutura da página.
- CSS embutido no próprio HTML para layout e responsividade.
- `app.js` para carregar, ordenar e renderizar os dados.
- `ranking.json` como fonte de dados estática.

Ele **não depende** de React, Next.js, Vue, Angular, Bootstrap, jQuery, Node.js, banco de dados ou backend. O único carregamento externo da página é visual: Google Fonts e Tailwind CSS via CDN. Não existe `package.json`, processo de build, servidor de aplicação, API própria ou dependência de runtime para publicar o site.

## Estrutura `/ranking`

A estrutura esperada do diretório do ranking é:

```text
/ranking
├── index.html      # Página principal publicada no navegador
├── app.js          # Lógica de carregamento, ordenação e renderização
├── ranking.json    # Dados editáveis do ranking
└── README.md       # Documentação do projeto
```

> Neste repositório, esses arquivos ficam na raiz. Ao publicar no Cloudflare Pages com output `/`, a raiz do repositório funciona como o diretório `/ranking` documentado acima.

## Como editar `ranking.json`

1. Abra o arquivo `ranking.json`.
2. Edite a lista de jogadores: adicione, remova ou atualize objetos.
3. Garanta que o JSON continue válido, sem comentários e sem vírgula sobrando no último item.
4. Salve o arquivo.
5. Rode localmente para validar.
6. Faça commit e push para o repositório conectado ao Cloudflare Pages.

A ordem dos objetos dentro do arquivo não precisa ser manualmente ajustada. O JavaScript lê todos os itens e ordena automaticamente por `points` em ordem decrescente, recalculando as posições exibidas na tela a cada carregamento da página.

## Formato esperado do JSON

O arquivo deve conter um array JSON. Cada item representa um jogador:

```json
[
  {
    "id": 1,
    "name": "Nome do Jogador",
    "avatar": "N",
    "points": 187
  },
  {
    "id": 2,
    "name": "Lucas",
    "avatar": "L",
    "points": 181
  },
  {
    "id": 3,
    "name": "Pedro",
    "avatar": "P",
    "points": 178
  }
]
```

Campos obrigatórios:

| Campo | Tipo | Descrição |
| --- | --- | --- |
| `id` | número | Identificador único do jogador. Não define a posição no ranking. |
| `name` | texto | Nome exibido no card do jogador. |
| `avatar` | texto | Inicial ou abreviação curta exibida no círculo do avatar. Recomenda-se 1 caractere. |
| `points` | número | Pontuação usada para ordenar o ranking. Quanto maior, melhor a posição. |

Exemplo com múltiplos jogadores fora de ordem:

```json
[
  { "id": 2, "name": "Lucas", "avatar": "L", "points": 181 },
  { "id": 1, "name": "Caleb", "avatar": "C", "points": 187 },
  { "id": 6, "name": "Ana", "avatar": "A", "points": 190 }
]
```

Mesmo nesse exemplo, a página exibirá Ana em 1º, Caleb em 2º e Lucas em 3º porque a ordenação é feita automaticamente por pontuação.

## Como rodar localmente com servidor estático

Não abra `index.html` diretamente com `file://`, porque o navegador pode bloquear o `fetch('./ranking.json')`. Use um servidor HTTP estático.

Com Python 3, rode na raiz do projeto:

```bash
python3 -m http.server 8000
```

Depois acesse:

1. **Faça push do código para um repositório Git:**
   ```bash
   git add .
   git commit -m "Initial commit: PredictSF Ranking MVP"
   git push origin main
   ```

2. **Acesse o Cloudflare Dashboard:**
   - Vá para https://dash.cloudflare.com
   - Navegue até "Pages"
   - Clique em "Create a project"

3. **Conecte seu repositório:**
   - Selecione seu provedor de Git
   - Autorize o Cloudflare a acessar seus repositórios
   - Selecione o repositório `ranking-PredictSF`

4. **Configure o build:**
   - Build command: deixe vazio (não há build necessário)
   - Build output directory: `/` (raiz do projeto)

5. **Deploy:**
   - Clique em "Save and Deploy"
   - O site será publicado automaticamente em `https://<seu-projeto>.pages.dev`

### Atualizações Automáticas

Cada vez que você fizer push para o branch `main`, o Cloudflare Pages automaticamente:
- Detecta as mudanças
- Faz redeploy do site
- Seu ranking será atualizado em minutos

## 🔧 Desenvolvimento

### Modularidade do JavaScript

O código em `app.js` é organizado em funções limpas e bem documentadas:

- `loadRanking()` - Carrega dados do ranking.json
- `sortPlayers()` - Ordena jogadores por pontuação
- `createPlayerCard()` - Cria elemento HTML do card
- `renderRanking()` - Renderiza a lista completa
- `init()` - Inicializa a página

### Boas Práticas

- ✅ HTML semântico
- ✅ Sem duplicação de código
- ✅ Comentários descritivos
- ✅ Variáveis e funções com nomes claros
- ✅ Tratamento de erros
- ✅ Responsivo com CSS moderno
- ✅ Performance otimizada
- ✅ Compatibilidade com navegadores modernos

Valide no navegador que:

- A página abre sem erro.
- O título “PredictSF” aparece.
- A lista de jogadores é carregada a partir de `ranking.json`.
- As posições são exibidas em ordem decrescente de `points`.
- Ao alterar `ranking.json` e recarregar a página, a lista recalcula as posições automaticamente.

## Como publicar no Cloudflare Pages sem build command

- ✨ Animações suaves e elegantes
- 🏅 Medalhas para top 3 posições
- 📊 Avatares circulares com gradiente
- 💫 Hover effects premium
- 📱 Design responsivo perfeito
- ♿ Semântica acessível

- Repositório Git com os arquivos do projeto.
- Conta Cloudflare com acesso ao Cloudflare Pages.

### Configuração recomendada

1. Faça push dos arquivos para o repositório Git.
2. No painel da Cloudflare, acesse **Workers & Pages** ou **Pages**.
3. Clique em **Create a project**.
4. Escolha **Connect to Git**.
5. Selecione o repositório do ranking.
6. Configure o projeto assim:
   - **Build command:** deixe vazio.
   - **Build output directory:** `/`.
   - **Root directory:** mantenha a raiz do repositório, se essa opção aparecer.
7. Clique em **Save and Deploy**.

Como o projeto é 100% estático, o Cloudflare Pages só precisa publicar os arquivos da raiz. Não há build command, install command, framework preset, função serverless, banco ou backend para configurar.

## Validação após deploy

### Atualizar pontos

Simplesmente modifique o valor de `points` no JSON:

```json
{
  "id": 1,
  "name": "Caleb",
  "avatar": "C",
  "points": 195  // Pontuação atualizada
}
```

- Desktop: abrir a URL em um navegador de desktop e confirmar título, layout e ranking carregado.
- Mobile: abrir no celular ou em modo responsivo do navegador e confirmar que os cards se ajustam sem rolagem horizontal.
- Dados: conferir que a ordem exibida corresponde aos maiores valores de `points` em `ranking.json`.
- Atualização: editar `ranking.json`, fazer commit e push, aguardar novo deploy e recarregar a URL pública para confirmar que as posições foram recalculadas.

## Atualização real do ranking

Fluxo recomendado para uma atualização real:

1. Edite `ranking.json` aumentando ou reduzindo a pontuação de pelo menos um jogador.
2. Rode `python3 -m http.server 8000`.
3. Abra `http://localhost:8000` e confira a nova ordem.
4. Faça commit da alteração.
5. Faça push para o branch conectado ao Cloudflare Pages.
6. Aguarde o redeploy automático.
7. Abra a URL pública em desktop e mobile.
8. Confirme que a lista foi reordenada automaticamente conforme os novos valores de `points`.

## Como o JavaScript funciona

O arquivo `app.js` executa cinco etapas principais:

1. `loadRanking()` busca `ranking.json` via `fetch`.
2. `sortPlayers()` cria uma cópia do array e ordena por `points` em ordem decrescente.
3. `createPlayerCard()` monta o card HTML de cada jogador.
4. `renderRanking()` insere todos os cards no contêiner `#rankingContainer`.
5. `init()` coordena o carregamento, tratamento de lista vazia e renderização.

## Notas importantes

- `id` é apenas identificador, não posição.
- A posição exibida é calculada pelo índice após a ordenação por pontos.
- Mantenha `points` como número, não string.
- O arquivo `ranking.json` precisa ser JSON válido.
- Para deploy no Cloudflare Pages, use build command vazio e output directory `/`.
