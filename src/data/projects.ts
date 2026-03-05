export interface Project {
  id: number;
  titulo: string;
  descricao: string;
  tags: string[];
  imagem: string;
  Link: string;
  LinkGit: string;
  LinkGoogle?: string;
  LinkApple?: string;
  tipo: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    titulo: "Vale Energia",
    descricao:
      "Sistema web completo para gestão e pagamento de contas de energia elétrica. Plataforma que facilita pagamentos.",
    tags: ["WEB"],
    imagem: "/imagens/valeenergia.png",
    Link: "https://hml.valeenergia.site",
    LinkGit: "",
    tipo: ["frontend", "backend", "principais"],
  },
  {
    id: 2,
    titulo: "Mouv Brasil",
    descricao:
      "Sistema completo de gestão e comercialização de ingressos para eventos. Plataforma que conecta organizadores e público.",
    tags: ["WEB"],
    imagem: "/imagens/mouv.png",
    Link: "https://www.mouvbrasil.com/",
    LinkGit: "",
    tipo: ["backend", "frontend", "principais"],
  },
  {
    id: 3,
    titulo: "SporTickets",
    descricao:
      "Plataforma especializada em comercialização de ingressos para eventos esportivos. Sistema que oferece experiência otimizada de compra.",
    tags: ["WEB/APP"],
    imagem: "/imagens/sporticket.png",
    Link: "https://www.sportickets.com.br/",
    LinkGit: "",
    tipo: ["backend", "frontend", "principais"],
  },
  {
    id: 4,
    titulo: "Base 3",
    descricao:
      "Plataforma de gestão de escolas, cursos e alunos. Sistema integrado que facilita administração acadêmica.",
    tags: ["WEB"],
    imagem: "/imagens/base3.png",
    Link: "https://base3edu.com.br/",
    LinkGit: "",
    tipo: ["backend", "frontend", "principais"],
  },
  {
    id: 5,
    titulo: "Nacional Go",
    descricao:
      "Plataforma líder nacional em transporte veicular que gerencia todo processo logístico de movimentação de veículos.",
    tags: ["WEB"],
    imagem: "/imagens/nacional.png",
    Link: "https://app.nacionalgo.com.br/",
    LinkGit: "",
    tipo: ["backend", "frontend", "principais"],
  },
  {
    id: 6,
    titulo: "Anac Arquitetura",
    descricao:
      "Website institucional desenvolvido para escritório de arquitetura renomado. Plataforma elegante que apresenta portfólio completo.",
    tags: ["WEB"],
    imagem: "/imagens/anac.png",
    Link: "https://anacotrim.com.br/",
    LinkGit: "",
    tipo: ["frontend", "principais"],
  },
  {
    id: 7,
    titulo: "Cortex",
    descricao:
      "Aplicativo mobile para monitoramento IoT de recursos em tempo real. Sistema inteligente que recebe dados de sensores na nuvem.",
    tags: ["APP"],
    imagem: "/imagens/cortex.png",
    Link: "",
    LinkGit: "",
    LinkGoogle: "https://play.google.com/store/apps/details?id=com.besx.core",
    LinkApple: "https://apps.apple.com/us/app/cortex-app/id6449041878",
    tipo: ["mobile", "principais"],
  },
  {
    id: 8,
    titulo: "DubPay",
    descricao:
      "Plataforma completa de fintech desenvolvida para revolucionar transações financeiras digitais. Sistema robusto que oferece soluções de pagamento seguras e eficientes.",
    tags: ["APP"],
    imagem: "/imagens/dubpay.png",
    Link: "https://dubpay.com.br/",
    LinkGit: "",
    tipo: ["frontend", "principais"],
  },
  {
    id: 9,
    titulo: "Quiz Programing",
    descricao:
      "Aplicativo mobile interativo para avaliação de conhecimentos em programação com perguntas dinâmicas.",
    tags: ["APP"],
    imagem: "/imagens/quizprogram.png",
    Link: "",
    LinkGit: "https://github.com/LucasHARosa/Quiz-Programing",
    tipo: ["mobile"],
  },
  {
    id: 10,
    titulo: "I Weather",
    descricao:
      "Aplicativo mobile de previsão meteorológica com dados em tempo real e cobertura completa de testes.",
    tags: ["APP"],
    imagem: "/imagens/iweather.png",
    Link: "",
    LinkGit: "https://github.com/LucasHARosa/IWeather",
    tipo: ["mobile"],
  },
  {
    id: 11,
    titulo: "Arthos",
    descricao:
      "Sistema mobile de controle de acesso inteligente para ambientes corporativos.",
    tags: ["APP"],
    imagem: "/imagens/Arthos.png",
    Link: "",
    LinkGit: "",
    LinkGoogle:
      "https://play.google.com/store/apps/details?id=com.lucash_rosa.remapp",
    LinkApple: "https://apps.apple.com/br/app/arthos/id6526462876",
    tipo: ["mobile"],
  },
  {
    id: 12,
    titulo: "Gym Train",
    descricao:
      "Aplicativo mobile completo para gestão de treinos e evolução física.",
    tags: ["APP"],
    imagem: "/imagens/gyntrain.png",
    Link: "",
    LinkGit: "https://github.com/LucasHARosa/Gym-Train",
    tipo: ["mobile"],
  },
  {
    id: 13,
    titulo: "DT Money",
    descricao: "Aplicação web para gestão completa de finanças pessoais.",
    tags: ["WEB"],
    imagem: "/imagens/dt_money.png",
    Link: "",
    LinkGit: "https://github.com/LucasHARosa/DT-Money",
    tipo: ["frontend"],
  },
  {
    id: 14,
    titulo: "Timer Pomodoro",
    descricao:
      "Aplicação web baseada na técnica Pomodoro para otimização de produtividade.",
    tags: ["WEB"],
    imagem: "/imagens/timer_pomoro_1.png",
    Link: "https://lucasharosa.github.io/Timer-Pomodoro/",
    LinkGit: "https://github.com/LucasHARosa/Timer-Pomodoro",
    tipo: ["frontend"],
  },
  {
    id: 15,
    titulo: "Habits",
    descricao:
      "Plataforma full stack multiplataforma para rastreamento e desenvolvimento de hábitos saudáveis.",
    tags: ["WEB/APP"],
    imagem: "/imagens/habits.png",
    Link: "",
    LinkGit: "https://github.com/LucasHARosa/Habit",
    tipo: ["mobile", "frontend", "backend"],
  },
  {
    id: 16,
    titulo: "Coffee Delivery",
    descricao:
      "E-commerce completo especializado em cafés especiais com carrinho interativo.",
    tags: ["SHOP"],
    imagem: "/imagens/coffe_deliveryHome.png",
    Link: "https://lucasharosa.github.io/Coffee-Delivery/",
    LinkGit: "https://github.com/LucasHARosa/Coffe-Delivery",
    tipo: ["frontend"],
  },
  {
    id: 17,
    titulo: "Enigm",
    descricao:
      "Jogo de adivinhação de palavras inspirado no TERMO/Wordle com feedback visual.",
    tags: ["WEB"],
    imagem: "/imagens/Enigm.png",
    Link: "https://enigm.vercel.app/",
    LinkGit: "https://github.com/LucasHARosa/Enigm",
    tipo: ["frontend"],
  },
];
