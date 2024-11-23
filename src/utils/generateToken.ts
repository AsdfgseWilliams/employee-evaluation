export const generateToken = (name: string): string => {
  return `${name.toLowerCase().replace(/\s/g, '-')}-${Math.random().toString(36).substr(2, 9)}`;
};

export const evaluados = [
"Borja Planells", "Edu Vivar", "Albert Puig", "Alba Barros", "Sete Flores", 
"Ximena Xavier", "Cynthia Pérez", "Maria Pazos", "Júlia García", "Mariano Tamburro", 
"June Echebarria", "Heidy Cava", "Alvaro Spotorno", "Esteban Adamuz", "Linda Lawson", 
"Núria Budesca", "Carmen Lucio", "Guillem Rubio", "Percy Stiven", "David Cañete", 
"Ariadna Ballestar", "Laia Vila", "Valeria Terrazas", "Samantha Alarcón", "David López", 
"Mariona Torras", "Santiago Lleras", "Fanny Espinosa", "Sara Vidal", "Belén Alda", "Gerard Ger"
];

export const evaluadosTokens = evaluados.map(name => ({ name, token: generateToken(name) }));
