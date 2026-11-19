export const WHATSAPP_NUMBER = '5521993076814';
export const WHATSAPP_DISPLAY = '(21) 99307-6814';

export function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const CORD_PALETTES = [
  {
    id: 'cru',
    name: 'Algodão Cru Natural',
    hex: '#EFE7DA',
    ring: '#D6C7B2',
    mood: 'Leveza pura e atemporal',
  },
  {
    id: 'mostarda',
    name: 'Mostarda Ocre',
    hex: '#C68B36',
    ring: '#9F6D25',
    mood: 'Luz solar e acolhimento',
  },
  {
    id: 'taupe',
    name: 'Taupe Caramelo',
    hex: '#B39377',
    ring: '#8B6F56',
    mood: 'Calma terrosa e afeto',
  },
  {
    id: 'terracota',
    name: 'Terracota Suave',
    hex: '#B96B4F',
    ring: '#914F38',
    mood: 'Calor humano e presença',
  },
  {
    id: 'salvia',
    name: 'Verde Sálvia',
    hex: '#7B8265',
    ring: '#5B6149',
    mood: 'Frescor botânico e paz',
  },
];

export const WOOD_SUPPORTS = [
  {
    id: 'cavilha',
    name: 'Cavilha de Madeira Polida',
    description: 'Acabamento liso, delicado e minimalista em madeira tratada.',
  },
  {
    id: 'galho',
    name: 'Galho Natural Rústico',
    description: 'Colhido e lixado à mão — cada galho tem curva única da natureza.',
  },
];

export const OCCASIONS = [
  { id: 'casa-nova', label: 'Casa Nova', emoji: '🏡' },
  { id: 'aniversario', label: 'Aniversário', emoji: '🕯️' },
  { id: 'gratidao', label: 'Gratidão', emoji: '🌿' },
  { id: 'amor', label: 'Carinho & Amor', emoji: '🤍' },
  { id: 'maternidade', label: 'Chegada de Bebê', emoji: '☁️' },
];

export const MESSAGE_SUGGESTIONS = {
  'casa-nova':
    'Que este novo lar seja sempre abraço, luz da manhã e lugar de paz. Com todo carinho!',
  aniversario:
    'Que seu novo ciclo seja tecido com calma, beleza e muitos encontros bonitos.',
  gratidao:
    'Uma lembrança feita à mão para agradecer por tudo o que você representa na minha vida.',
  amor:
    'Escolhi cada nó pensando em você. Que esse pedacinho de arte aqueça o seu cantinho.',
  maternidade:
    'Bem-vindo(a) ao mundo! Que este cantinho cresça cercado de ternura, calma e proteção.',
};

export const PRODUCTS = [
  {
    id: 'mini-porta-flores',
    name: 'Mini Painel Porta-Flores Secas',
    category: 'lembrancas',
    badge: 'Mais escolhido para presente',
    sizeLabel: 'Miniatura afetiva',
    image: '/images/mini-porta-flores.jpg',
    forWho: 'Para presentear uma amiga, mãe ou alguém que ama flores e pequenos gestos.',
    description:
      'Um bolsinho delicado em cordão 100% algodão cru que acolhe um mini buquê de flores secas em tons suaves. Pequeno no tamanho, imenso no significado.',
    defaultPalette: 'cru',
    palettes: ['cru', 'taupe', 'salvia'],
    supports: ['cavilha'],
    highlight: 'Acompanha mini buquê de flores secas naturais',
  },
  {
    id: 'mini-coracao',
    name: 'Miniatura Coração Franjado',
    category: 'lembrancas',
    badge: 'Lembrança afetiva',
    sizeLabel: 'Miniatura afetiva',
    image: '/images/mini-coracao.jpg',
    forWho: 'Um abraço em forma de lembrança para datas especiais, madrinhas ou agradecimento.',
    description:
      'Trama sutil em formato de coração e chevron com franjas macias penteadas à mão. Cabe em qualquer cantinho afetivo — do quarto ao hall de entrada.',
    defaultPalette: 'cru',
    palettes: ['cru', 'terracota', 'mostarda', 'salvia'],
    supports: ['cavilha'],
    highlight: 'Ideal para presentes intimistas & datas especiais',
  },
  {
    id: 'painel-meia-lua',
    name: 'Painel Meia-Lua Bicolor',
    category: 'paineis',
    badge: 'Queridinho do ateliê',
    sizeLabel: 'Painel de parede',
    image: '/images/painel-meia-lua.jpg',
    forWho: 'Para iluminar o quarto, o home office ou celebrar uma conquista de casa nova.',
    description:
      'Arcos concêntricos em algodão cru abraçados por fileiras em mostarda ocre. Equilibra delicadeza geométrica e calor solar na medida certa.',
    defaultPalette: 'mostarda',
    palettes: ['mostarda', 'terracota', 'taupe', 'salvia'],
    supports: ['cavilha', 'galho'],
    highlight: 'Você escolhe a combinação das cores',
  },
  {
    id: 'espelho-solar',
    name: 'Espelho Moldura em Macramê',
    category: 'espelhos-mesa',
    badge: 'Peça autoral',
    sizeLabel: 'Espelho artesanal',
    image: '/images/espelho-solar.jpg',
    forWho: 'Um presente memorável de casamento, bodas ou transformação de ambiente.',
    description:
      'Espelho retangular envolto por borda trançada nó a nó em cordão de algodão. Reflete luz, textura artesanal e personalidade em salas ou halls de entrada.',
    defaultPalette: 'mostarda',
    palettes: ['mostarda', 'cru', 'taupe', 'terracota'],
    supports: ['cavilha'],
    highlight: 'Moldura tecida à mão na cor escolhida',
  },
  {
    id: 'painel-quatro-hastes',
    name: 'Painel Geométrico Quatro Hastes',
    category: 'paineis',
    badge: 'Sob medida',
    sizeLabel: 'Painel de parede',
    image: '/images/painel-quatro-hastes.jpg',
    forWho: 'Para quem aprecia arquitetura têxtil, calma visual e peças exclusivas.',
    description:
      'Quatro hastes de madeira sustentam losangos entrelaçados em degradê suave de algodão cru e taupe caramelo, criando profundidade e movimento na parede.',
    defaultPalette: 'taupe',
    palettes: ['taupe', 'cru', 'mostarda', 'salvia'],
    supports: ['cavilha'],
    highlight: 'Adaptamos proporções e tons para a sua parede',
  },
  {
    id: 'toalha-macrame',
    name: 'Toalha & Caminho de Mesa em Macramê',
    category: 'espelhos-mesa',
    badge: 'Para reunir quem se ama',
    sizeLabel: 'Peça de mesa',
    image: '/images/toalha-macrame.jpg',
    forWho: 'Para mesas de café da manhã demorados, chás da tarde e casas acolhedoras.',
    description:
      'Trama aberta em losangos geométricos e franjas longas que vestem a madeira da mesa com poesia. Feita sob medida para mesas redondas ou retangulares.',
    defaultPalette: 'cru',
    palettes: ['cru', 'taupe'],
    supports: ['cavilha'],
    highlight: 'Feita nas medidas da sua mesa',
  },
  {
    id: 'painel-galho-natural',
    name: 'Grande Painel Boho em Galho Natural',
    category: 'paineis',
    badge: 'Peça assinatura',
    sizeLabel: 'Painel amplo',
    image: '/images/hero-atelier.jpg',
    forWho: 'O abraço principal de um quarto ou sala — uma obra única para a vida inteira.',
    description:
      'Nosso painel mais emblemático: camadas de guirlandas em V, folhas trançadas e tassels laterais suspensos em um galho natural cuidadosamente tratado.',
    defaultPalette: 'cru',
    palettes: ['cru', 'taupe', 'mostarda'],
    supports: ['galho', 'cavilha'],
    highlight: 'Galho natural único + peça feita sob medida',
  },
];

export const CATEGORIES = [
  { id: 'todos', label: 'Todas as Peças' },
  { id: 'lembrancas', label: 'Lembranças & Miniaturas' },
  { id: 'paineis', label: 'Painéis de Parede' },
  { id: 'espelhos-mesa', label: 'Espelhos & Mesa' },
];
