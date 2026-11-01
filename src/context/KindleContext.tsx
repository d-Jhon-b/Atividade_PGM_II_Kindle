import React, { createContext, useContext, useState } from 'react';

export interface Book {
  id: string;
  title: string;
  author: string;
  category: 'Shonen' | 'Seinen' | 'Manhwa' | 'Fantasia Sombria' | 'Ação & Aventura';
  coverUrl: string;
  rating: number;
  reviewsCount: number;
  pages: number;
  currentPage: number;
  inLibrary: boolean;
  isFavorite: boolean;
  isCompleted: boolean;
  releaseYear: number;
  volume: string;
  synopsis: string;
  chapters: {
    title: string;
    content: string[];
  }[];
}

export interface ThemeColors {
  isDark: boolean;
  background: string;
  surface: string;
  surfaceElevated: string;
  text: string;
  textSecondary: string;
  primary: string;
  accent: string;
  border: string;
  chipBg: string;
  chipActiveBg: string;
  chipText: string;
  chipActiveText: string;
  tabBarBg: string;
  searchBg: string;
}

const darkTheme: ThemeColors = {
  isDark: true,
  background: '#0F1115',
  surface: '#181B22',
  surfaceElevated: '#222630',
  text: '#F3F4F6',
  textSecondary: '#9CA3AF',
  primary: '#38BDF8',
  accent: '#F59E0B',
  border: '#2A2F3D',
  chipBg: '#1E222B',
  chipActiveBg: '#38BDF8',
  chipText: '#D1D5DB',
  chipActiveText: '#0F1115',
  tabBarBg: '#14171D',
  searchBg: '#1E222B',
};

const lightTheme: ThemeColors = {
  isDark: false,
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceElevated: '#F1F5F9',
  text: '#0F172A',
  textSecondary: '#64748B',
  primary: '#0284C7',
  accent: '#D97706',
  border: '#E2E8F0',
  chipBg: '#E2E8F0',
  chipActiveBg: '#0284C7',
  chipText: '#334155',
  chipActiveText: '#FFFFFF',
  tabBarBg: '#FFFFFF',
  searchBg: '#F1F5F9',
};

export const INITIAL_BOOKS: Book[] = [
  {
    id: '1',
    title: 'One Piece - Vol. 105: O Sonho de Luffy',
    author: 'Eiichiro Oda',
    category: 'Shonen',
    coverUrl: 'https://cdn.myanimelist.net/images/manga/2/253146l.jpg',
    rating: 4.9,
    reviewsCount: 14820,
    pages: 210,
    currentPage: 168,
    inLibrary: true,
    isFavorite: true,
    isCompleted: false,
    releaseYear: 2023,
    volume: 'Vol. 105',
    synopsis:
      'Após a histórica batalha no País de Wano, o mundo inteiro entra em choque com os novos Quatro Imperadores do Mar! Monkey D. Luffy e o Bando do Chapéu de Palha partem rumo a Egghead, a ilha do futuro do Dr. Vegapunk.',
    chapters: [
      {
        title: 'Capítulo 1056: Cross Guild',
        content: [
          'Os ventos de Wano sopram calmos após a tempestade que derrubou duas das maiores lendas dos mares. No porto de Tokage, Franky e Usopp preparam o Thousand Sunny para zarpar rumo ao desconhecido.',
          'Enquanto isso, os jornais da Morgans espalham cartazes de procurado que abalam a Marinha: Buggy, o Palhaço Estrela, agora lidera a misteriosa organização Cross Guild ao lado de Dracule Mihawk e Crocodile!',
          'Luffy, Kid e Law escolhem suas próximas rotas no Log Pose. O destino de Luffy aponta para uma ilha cercada por nuvens tecnológicas e monstros marinhos cibernéticos.',
        ],
      },
      {
        title: 'Capítulo 1057: Conclusão',
        content: [
          'Yamato decide permanecer em Wano para percorrer o país como Kozuki Oden fez no passado, prometendo se juntar ao bando no futuro quando estiver pronto.',
          'Sob o sol radiante, as velas do Thousand Sunny se abrem! "Rumo à próxima ilha! Levantem âncora!", grita o novo Yonkou Monkey D. Luffy com um sorriso inabalável.',
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Berserk - Edição de Luxo Vol. 1',
    author: 'Kentaro Miura',
    category: 'Fantasia Sombria',
    coverUrl: 'https://cdn.myanimelist.net/images/manga/1/157897l.jpg',
    rating: 5.0,
    reviewsCount: 22310,
    pages: 240,
    currentPage: 240,
    inLibrary: true,
    isFavorite: true,
    isCompleted: true,
    releaseYear: 1989,
    volume: 'Vol. 01',
    synopsis:
      'Guts, conhecido como o Espadachim Negro, busca refúgio das forças demoníacas que o perseguem implacavelmente. Carregando a colossal espada Dragonslayer, ele trilha um caminho de vingança em um mundo medieval sombrio.',
    chapters: [
      {
        title: 'Capítulo 1: O Espadachim Negro',
        content: [
          'A taverna estava silenciosa até a porta de carvalho se abrir sob o peso da tempestade. Um homem envolto em um manto negro entrou, carregando nas costas uma lâmina de ferro maciço grande demais para ser chamada de espada.',
          'Guts não buscava descanso; seus olhos atentos procuravam sinais dos Apóstolos. Na nuca, a Marca do Sacrifício começava a sangrar lentamente, avisando que a noite seria longa.',
        ],
      },
      {
        title: 'Capítulo 2: A Marca',
        content: [
          'Quando o sol se põe, os espíritos famintos emergem das sombras. Com um único giro da Dragonslayer, o Espadachim Negro corta a escuridão ao meio, desafiando o próprio destino.',
        ],
      },
    ],
  },
  {
    id: '3',
    title: 'Solo Leveling - Edição Completa Vol. 1',
    author: 'Chugong & DUBU',
    category: 'Manhwa',
    coverUrl: 'https://cdn.myanimelist.net/images/manga/3/222295l.jpg',
    rating: 4.8,
    reviewsCount: 19450,
    pages: 320,
    currentPage: 145,
    inLibrary: true,
    isFavorite: false,
    isCompleted: false,
    releaseYear: 2018,
    volume: 'Vol. 01',
    synopsis:
      'Em um mundo onde portais conectam a Terra a masmorras cheias de monstros, Sung Jin-Woo é conhecido como o caçador mais fraco da humanidade. Tudo muda quando ele sobrevive a uma masmorra dupla secreta e recebe um Sistema exclusivo.',
    chapters: [
      {
        title: 'Prólogo: O Caçador Rank-E',
        content: [
          'Há dez anos, o "Portal" apareceu e conectou o mundo real ao reino da magia e dos monstros. Para combater essas criaturas, pessoas comuns despertaram poderes sobre-humanos e passaram a ser chamadas de Caçadores.',
          'Meu nome é Sung Jin-Woo, um caçador de Rank-E. Mesmo nas masmorras mais simples, eu mal consigo sair vivo. Mas preciso pagar o hospital da minha mãe.',
        ],
      },
      {
        title: 'Capítulo 1: O Templo de Cartenon',
        content: [
          '[AVISO: Você cumpriu todos os requisitos da Missão Secreta "Coragem dos Fracos". Deseja aceitar tornar-se um Jogador? Se recusar, seu coração irá parar em 0.02 segundos.]',
          'Diante da lâmina invisível, Jin-Woo sussurrou: "Eu aceito." Naquele instante, uma luz azul inundou a câmara e sua vida mudou para sempre.',
        ],
      },
    ],
  },
  {
    id: '4',
    title: 'Jujutsu Kaisen: Batalha de Feiticeiros',
    author: 'Gege Akutami',
    category: 'Shonen',
    coverUrl: 'https://cdn.myanimelist.net/images/manga/3/210341l.jpg',
    rating: 4.8,
    reviewsCount: 11200,
    pages: 192,
    currentPage: 96,
    inLibrary: true,
    isFavorite: true,
    isCompleted: false,
    releaseYear: 2018,
    volume: 'Vol. 16',
    synopsis:
      'Yuji Itadori engole um objeto amaldiçoado de grau especial — o dedo de Ryomen Sukuna — para salvar seus amigos. Agora ele compartilha seu corpo com o Rei das Maldições sob a tutela de Satoru Gojo.',
    chapters: [
      {
        title: 'Capítulo 1: Ryomen Sukuna',
        content: [
          'Yuji Itadori sempre teve uma força física fora do comum, mas preferia passar o tempo no Clube de Pesquisa Oculta da escola.',
          'Quando o selo do talismã milenar é rompido na escola à noite, maldições grotescas cercam Megumi Fushiguro. Sem saída, Itadori toma a decisão mais insana de sua vida.',
        ],
      },
    ],
  },
  {
    id: '5',
    title: 'Vagabond - Edição Definitiva Vol. 1',
    author: 'Takehiko Inoue',
    category: 'Seinen',
    coverUrl: 'https://cdn.myanimelist.net/images/manga/1/259070l.jpg',
    rating: 4.9,
    reviewsCount: 9840,
    pages: 256,
    currentPage: 45,
    inLibrary: true,
    isFavorite: false,
    isCompleted: false,
    releaseYear: 1998,
    volume: 'Vol. 01',
    synopsis:
      'Após a Batalha de Sekigahara em 1600, o jovem Shinmen Takezo sobrevive em meio ao campo de batalha e decide percorrer o Japão como Miyamoto Musashi em busca da iluminação através do caminho da espada.',
    chapters: [
      {
        title: 'Capítulo 1: Shinmen Takezo',
        content: [
          'Chovia sobre os milhares de corpos estendidos na planície de Sekigahara. Entre as lanças quebradas, dois jovens de dezessete anos respiravam com dificuldade: Takezo e Matahachi.',
          '"Eu não vou morrer aqui", murmurou Takezo, olhando para o céu cinzento. A jornada para se tornar "Invencível sob o Sol" estava apenas começando.',
        ],
      },
    ],
  },
  {
    id: '6',
    title: 'Chainsaw Man - Parte 1: Segurança Pública',
    author: 'Tatsuki Fujimoto',
    category: 'Ação & Aventura',
    coverUrl: 'https://cdn.myanimelist.net/images/manga/3/216464l.jpg',
    rating: 4.7,
    reviewsCount: 15600,
    pages: 190,
    currentPage: 0,
    inLibrary: false,
    isFavorite: false,
    isCompleted: false,
    releaseYear: 2019,
    volume: 'Vol. 01',
    synopsis:
      'Denji é um jovem extremamente pobre que caça demônios ao lado de Pochita, seu cão-demônio motosserra, para pagar as dívidas deixadas pelo pai. Após uma traição brutal, Pochita se funde ao coração de Denji.',
    chapters: [
      {
        title: 'Capítulo 1: Cachorro e Motosserra',
        content: [
          'Tudo o que Denji queria era comer pão com geleia e ter uma vida normal. Mas o destino reservava um contrato de sangue.',
          '"Denji... mostre-me os seus sonhos." Ao puxar a corda no peito, o rugido do motor ecoou pelo galpão abandonado.',
        ],
      },
    ],
  },
  {
    id: '7',
    title: 'Vinland Saga - Livro 1',
    author: 'Makoto Yukimura',
    category: 'Seinen',
    coverUrl: 'https://cdn.myanimelist.net/images/manga/2/188925l.jpg',
    rating: 4.9,
    reviewsCount: 8730,
    pages: 460,
    currentPage: 0,
    inLibrary: false,
    isFavorite: false,
    isCompleted: false,
    releaseYear: 2005,
    volume: 'Vol. 01',
    synopsis:
      'Criado nas geladas terras da Islândia com histórias sobre a pacífica terra de Vinland, o jovem Thorfinn tem sua infância destruída pelo mercenário viking Askeladd e jura vingança em duelo.',
    chapters: [
      {
        title: 'Capítulo 1: Os Normandos',
        content: [
          'Um verdadeiro guerreiro não precisa de uma espada. As palavras de Thors ecoavam sob a neve da Islândia enquanto os navios drakkar cortavam o mar do Norte.',
        ],
      },
    ],
  },
  {
    id: '8',
    title: 'Naruto Gold Edition - Vol. 1',
    author: 'Masashi Kishimoto',
    category: 'Shonen',
    coverUrl: 'https://cdn.myanimelist.net/images/manga/3/249658l.jpg',
    rating: 4.8,
    reviewsCount: 18900,
    pages: 192,
    currentPage: 192,
    inLibrary: true,
    isFavorite: true,
    isCompleted: true,
    releaseYear: 1999,
    volume: 'Vol. 01',
    synopsis:
      'Naruto Uzumaki é um jovem ninja da Vila Oculta da Folha que carrega selada dentro de si a Raposa de Nove Caudas. Rejeitado pelos moradores, ele treina incansavelmente para se tornar o Hokage.',
    chapters: [
      {
        title: 'Capítulo 1: Uzumaki Naruto!',
        content: [
          'Há doze anos, uma Raposa de Nove Caudas atacou a Vila Oculta da Folha. Apenas um grande líder ninja conseguiu detê-la sacrificando a própria vida: o Quarto Hokage.',
          '"Eu nunca volto atrás na minha palavra! Esse é o meu jeito ninja de ser!"',
        ],
      },
    ],
  },
];

interface KindleContextData {
  books: Book[];
  selectedBookId: string;
  setSelectedBookId: (id: string) => void;
  toggleFavorite: (id: string) => void;
  toggleLibrary: (id: string) => void;
  updateProgress: (id: string, page: number) => void;
  theme: ThemeColors;
  toggleTheme: () => void;
  readingStreakDays: number;
}

const KindleContext = createContext<KindleContextData>({} as KindleContextData);

export const KindleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS);
  const [selectedBookId, setSelectedBookId] = useState<string>('1');
  const [isDark, setIsDark] = useState<boolean>(true);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const toggleFavorite = (id: string) => {
    setBooks((prev) =>
      prev.map((book) => (book.id === id ? { ...book, isFavorite: !book.isFavorite } : book))
    );
  };

  const toggleLibrary = (id: string) => {
    setBooks((prev) =>
      prev.map((book) => (book.id === id ? { ...book, inLibrary: !book.inLibrary } : book))
    );
  };

  const updateProgress = (id: string, page: number) => {
    setBooks((prev) =>
      prev.map((book) => {
        if (book.id !== id) return book;
        const clamped = Math.max(0, Math.min(book.pages, page));
        return {
          ...book,
          currentPage: clamped,
          inLibrary: true,
          isCompleted: clamped >= book.pages,
        };
      })
    );
  };

  return (
    <KindleContext.Provider
      value={{
        books,
        selectedBookId,
        setSelectedBookId,
        toggleFavorite,
        toggleLibrary,
        updateProgress,
        theme: isDark ? darkTheme : lightTheme,
        toggleTheme,
        readingStreakDays: 14,
      }}
    >
      {children}
    </KindleContext.Provider>
  );
};

export const useKindle = () => useContext(KindleContext);
