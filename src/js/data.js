let RN_DATA = {

  units: [
    { id: 1, name: "Recife Centro",    city: "Recife – PE",    open: true,  hours: "06h–22h", emoji: "🏙️", type: "completa" },
    { id: 2, name: "Fortaleza Aldeota", city: "Fortaleza – CE", open: true,  hours: "07h–21h", emoji: "🌊", type: "completa" },
    { id: 3, name: "Salvador Pelourinho", city: "Salvador – BA", open: false, hours: "08h–20h", emoji: "⛪", type: "reduzida" },
    { id: 4, name: "Natal Ponta Negra", city: "Natal – RN",    open: true,  hours: "06h–22h", emoji: "🏖️", type: "completa" },
    { id: 5, name: "João Pessoa Centro", city: "João Pessoa – PB", open: true, hours: "07h–21h", emoji: "🌴", type: "reduzida" },
    { id: 6, name: "Maceió Pajuçara",  city: "Maceió – AL",   open: true,  hours: "06h–22h", emoji: "🐚", type: "completa" },
  ],

  categories: [
    { id: "cafe",      name: "☕ Café da Manhã",   icon: "☕" },
    { id: "tapioca",   name: "🫓 Tapiocas",         icon: "🫓" },
    { id: "cuscuz",    name: "🌽 Cuscuz",            icon: "🌽" },
    { id: "bolos",     name: "🎂 Bolos e Doces",    icon: "🎂" },
    { id: "sucos",     name: "🥤 Sucos Regionais",  icon: "🥤" },
    { id: "combos",    name: "🍱 Combos",            icon: "🍱" },
    { id: "junino",    name: "🎉 Especial Junino",  icon: "🎉", seasonal: true },
  ],

  products: [
    
    { id: 1,  category: "cafe",    name: "Café com Leite",          desc: "Café coado na hora com leite integral quentinho.",                price: 6.00,  emoji: "☕", available: true,  units: [1,2,3,4,5,6] },
    { id: 2,  category: "cafe",    name: "Café Preto",              desc: "Café forte e encorpado, passado na hora.",                        price: 4.00,  emoji: "🫖", available: true,  units: [1,2,3,4,5,6] },
    { id: 3,  category: "cafe",    name: "Café da Manhã Completo",  desc: "Café, cuscuz, tapioca, manteiga de garrafa e queijo coalho.",     price: 22.90, emoji: "🍽️", available: true,  units: [1,2,4,6] },
    
    { id: 4,  category: "tapioca", name: "Tapioca Simples",         desc: "Tapioca tradicional com manteiga de garrafa.",                    price: 8.50,  emoji: "🫓", available: true,  units: [1,2,3,4,5,6] },
    { id: 5,  category: "tapioca", name: "Tapioca de Queijo Coalho",desc: "Tapioca recheada com queijo coalho grelhado.",                    price: 12.00, emoji: "🧀", available: true,  units: [1,2,3,4,5,6] },
    { id: 6,  category: "tapioca", name: "Tapioca de Frango",       desc: "Tapioca com frango desfiado temperado e catupiry.",               price: 14.50, emoji: "🍗", available: true,  units: [1,2,4,6] },
    { id: 7,  category: "tapioca", name: "Tapioca de Carne Seca",   desc: "Tapioca com carne seca desfiada e manteiga de garrafa.",          price: 16.00, emoji: "🥩", available: true,  units: [1,2,4,6] },
    { id: 8,  category: "tapioca", name: "Tapioca Doce de Coco",    desc: "Tapioca com coco ralado e leite condensado.",                     price: 10.00, emoji: "🥥", available: true,  units: [1,2,3,4,5,6] },
    
    { id: 9,  category: "cuscuz",  name: "Cuscuz Simples",          desc: "Cuscuz de milho com manteiga de garrafa.",                        price: 7.00,  emoji: "🌽", available: true,  units: [1,2,3,4,5,6] },
    { id: 10, category: "cuscuz",  name: "Cuscuz com Ovo",          desc: "Cuscuz com ovo mexido e manteiga.",                               price: 9.50,  emoji: "🍳", available: true,  units: [1,2,3,4,5,6] },
    { id: 11, category: "cuscuz",  name: "Cuscuz Recheado",         desc: "Cuscuz com carne seca, queijo e pimentão.",                       price: 15.00, emoji: "🥘", available: true,  units: [1,2,4,6] },
    
    { id: 12, category: "bolos",   name: "Bolo de Macaxeira",       desc: "Bolo úmido de macaxeira com coco ralado.",                        price: 8.00,  emoji: "🎂", available: true,  units: [1,2,3,4,5,6] },
    { id: 13, category: "bolos",   name: "Bolo de Milho",           desc: "Bolo de milho cremoso, receita da Dona Francisca.",               price: 8.00,  emoji: "🌽", available: true,  units: [1,2,3,4,5,6] },
    { id: 14, category: "bolos",   name: "Bolo de Rolo",            desc: "Bolo de rolo pernambucano com goiabada.",                         price: 9.50,  emoji: "🍥", available: true,  units: [1,4] },
    
    { id: 15, category: "sucos",   name: "Suco de Umbu",            desc: "Suco natural de umbu, fruta típica do sertão.",                   price: 9.00,  emoji: "🍹", available: true,  units: [1,2,4,6] },
    { id: 16, category: "sucos",   name: "Suco de Cajá",            desc: "Suco de cajá gelado, refrescante e tropical.",                    price: 9.00,  emoji: "🥭", available: true,  units: [1,2,3,4,5,6] },
    { id: 17, category: "sucos",   name: "Suco de Maracujá",        desc: "Suco de maracujá natural com ou sem açúcar.",                     price: 8.00,  emoji: "🍊", available: true,  units: [1,2,3,4,5,6] },
    
    { id: 18, category: "combos",  name: "Combo Nordestino",        desc: "Cuscuz + Tapioca de queijo + Café com leite.",                    price: 24.90, emoji: "🍱", available: true,  units: [1,2,4,6] },
    { id: 19, category: "combos",  name: "Combo Família",           desc: "2 Cuscuz + 2 Tapiocas + 2 Sucos. Serve 2 pessoas.",              price: 44.90, emoji: "👨‍👩‍👧", available: true,  units: [1,2,4,6] },
    
    { id: 20, category: "junino",  name: "Pamonha",                 desc: "Pamonha de milho verde, doce ou salgada. Disponível em junho.",   price: 7.00,  emoji: "🌽", available: false, units: [1,2,4,6], seasonal: true },
    { id: 21, category: "junino",  name: "Canjica",                 desc: "Canjica cremosa com coco e canela. Especial junino.",             price: 10.00, emoji: "🍮", available: false, units: [1,2,4,6], seasonal: true },
    { id: 22, category: "junino",  name: "Pé de Moleque",           desc: "Pé de moleque artesanal com amendoim torrado.",                   price: 5.00,  emoji: "🍬", available: false, units: [1,2,3,4,5,6], seasonal: true },
  ],

  promotions: [
    { id: 1, title: "Café da Manhã Completo",  desc: "Combo completo com 15% OFF até 10h",  emoji: "☕", discount: 15, productId: 3 },
    { id: 2, title: "Tapioca + Suco",          desc: "Qualquer tapioca + suco por R$ 18,90", emoji: "🫓", discount: 0,  productId: null, fixedPrice: 18.90 },
    { id: 3, title: "Fidelidade Dupla",        desc: "Pontos em dobro às quartas-feiras",    emoji: "⭐", discount: 0,  productId: null, doublePoints: true },
  ],

  rewards: [
    { id: 1, name: "Café Grátis",          cost: 50,   emoji: "☕", desc: "Resgate um café preto ou com leite." },
    { id: 2, name: "Tapioca Simples",      cost: 100,  emoji: "🫓", desc: "Tapioca simples com manteiga." },
    { id: 3, name: "10% de Desconto",      cost: 150,  emoji: "🏷️", desc: "10% de desconto no próximo pedido." },
    { id: 4, name: "Combo Nordestino",     cost: 250,  emoji: "🍱", desc: "Combo nordestino completo grátis." },
    { id: 5, name: "Frete Grátis",         cost: 80,   emoji: "🚀", desc: "Entrega grátis no próximo pedido." },
    { id: 6, name: "Bolo de Macaxeira",    cost: 120,  emoji: "🎂", desc: "Uma fatia de bolo de macaxeira." },
  ],

  pointsHistory: [
    { date: "22/04/2026", desc: "Pedido #1042 — Combo Nordestino",  points: +25, type: "earn" },
    { date: "20/04/2026", desc: "Resgate — Café Grátis",            points: -50, type: "redeem" },
    { date: "18/04/2026", desc: "Pedido #1038 — Café da Manhã",     points: +23, type: "earn" },
    { date: "16/04/2026", desc: "Pedido #1031 — Tapioca de Frango", points: +15, type: "earn" },
    { date: "09/04/2026", desc: "Bônus de Boas-vindas",             points: +100, type: "bonus" },
  ],

  orderStatuses: [
    { key: "received",  label: "Pedido Recebido",    desc: "Seu pedido foi confirmado.",           icon: "✅" },
    { key: "preparing", label: "Em Preparo",          desc: "A cozinha está preparando seu pedido.", icon: "👨‍🍳" },
    { key: "ready",     label: "Pronto para Retirada", desc: "Seu pedido está pronto!",             icon: "🔔" },
    { key: "delivered", label: "Entregue",            desc: "Pedido entregue. Bom apetite!",        icon: "🎉" },
  ],

  mockOrder: {
    id: "#1043",
    unit: "Recife Centro",
    status: "preparing",
    items: [
      { name: "Tapioca de Queijo Coalho", qty: 2, price: 12.00 },
      { name: "Café com Leite",           qty: 2, price: 6.00  },
      { name: "Suco de Cajá",             qty: 1, price: 9.00  },
    ],
    subtotal: 45.00,
    discount: 4.50,
    total: 40.50,
    points: 41,
    payment: "Cartão de Crédito",
    createdAt: "23/04/2026 08:14",
  },

  tiers: [
    { name: "Semente",  min: 0,    max: 199,  color: "#8B7355", emoji: "🌱" },
    { name: "Raiz",     min: 200,  max: 499,  color: "#C0392B", emoji: "🌿" },
    { name: "Tronco",   min: 500,  max: 999,  color: "#E67E22", emoji: "🌳" },
    { name: "Nordestão",min: 1000, max: Infinity, color: "#F39C12", emoji: "⭐" },
  ],

  mockUser: {
    name: "Maria das Graças",
    email: "maria@email.com",
    phone: "(81) 99999-0001",
    points: 313,
    tier: "Raiz",
    memberSince: "Janeiro 2026",
  },
};

function getProductsByUnit(unitId) {
  return RN_DATA.products.filter(p => p.units.includes(unitId));
}

function getProductsByCategory(unitId, categoryId) {
  return getProductsByUnit(unitId).filter(p => p.category === categoryId);
}

function getUserTier(points) {
  return RN_DATA.tiers.find(t => points >= t.min && points <= t.max) || RN_DATA.tiers[0];
}

function formatCurrency(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
