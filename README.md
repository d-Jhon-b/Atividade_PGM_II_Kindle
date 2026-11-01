# Atividade Prática 10 - Clone do App Kindle (Manga Edition)

**Curso:** Desenvolvimento de Software Multiplataforma (5º Semestre)  
**Disciplina:** Programação para Dispositivos Móveis II  
**Professor:** Jeferson de Souza Dias  

## Tecnologias Utilizadas
- **React Native** + **TypeScript**
- **Expo SDK 55** (compatível com **Expo Snack Web** — basta importar o repositório GitHub diretamente em [snack.expo.dev](https://snack.expo.dev))
- **React Navigation** (`@react-navigation/native` e `@react-navigation/bottom-tabs`)
- **Ícones:** `@expo/vector-icons` (`Ionicons` e `MaterialCommunityIcons`)

## Estrutura de Arquivos e Telas
- [`App.tsx`](./App.tsx): Configuração do `NavigationContainer`, `BottomTabNavigator` e provedor de contexto.
- [`screens/Tela1.tsx`](./screens/Tela1.tsx): **Página Inicial** fiel ao layout do Kindle (barra de pesquisa em tempo real, botão de notificações, alternador Dark/Light Mode, filtros por categorias de Mangá/Manhwa, card "Continuar Lendo", carrossel "Da sua biblioteca" e carrossel "Para você").
- [`screens/Tela2.tsx`](./screens/Tela2.tsx): **Minha Biblioteca** com abas de filtro (`Todos`, `Lendo`, `Lidos`, `Favoritos`), alternância entre visualização em Lista e Grade, barra de progresso por volume e opção de adicionar/remover da biblioteca.
- [`screens/Tela3.tsx`](./screens/Tela3.tsx): **Detalhes & Leitor Kindle Interativo**, permitindo visualizar sinopse, atualizar páginas lidas e abrir o modo leitor completo com controle de tamanho da fonte (`A-` / `A+`), temas de leitura (`Escuro`, `Sépia` e `Claro`) e troca de capítulos.
- [`screens/Tela4.tsx`](./screens/Tela4.tsx): **Mais & Hábitos de Leitura**, exibindo ofensiva de leitura (dias seguidos), estatísticas de páginas e volumes lidos e configurações do Kindle (Modo Escuro, Whispersync, Wi-Fi).
- [`src/context/KindleContext.tsx`](./src/context/KindleContext.tsx): Estado global de livros, favoritos, progresso de leitura e tema Dark/Light.
