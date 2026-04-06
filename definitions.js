/* ── Nail Designs Definitions ─────────────────────────────────────── */
const nailDesigns = [
	{
		id: 1,
		name: "Gel Semipermanente Oro Rosa",
		category: "gel-semipermanente",
		image: "./img/gel-semipermanente.jpeg",
		npClass: "np-1",
	},
	{
		id: 2,
		name: "Rubber Oro",
		category: "rubber",
		image: "./img/rubber.jpeg",
		npClass: "np-2",
	},
	{
		id: 3,
		name: "Mano Alzada Berries Love",
		category: "mano-alzada",
		image: "./img/mano-alzada.jpeg",
		npClass: "np-3",
	},
	{
		id: 4,
		name: "Jardín Secreto",
		category: "floral",
		image: "./img/flowers.jpeg",
		npClass: "np-4",
	},
];

const WA_NUMBER = '523344024741';
const WA_MESSAGE = encodeURIComponent('¡Hola Katia! Me gustaría agendar una cita');
const waUrl = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;
