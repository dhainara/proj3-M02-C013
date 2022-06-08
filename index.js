import express from "express"
import path from "path"

const __dirname = path.resolve(path.dirname(''))
const app = express()
const port = 3000

console.log(__dirname)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

let mensagem = ""
let livro = undefined

const estanteLivros = [
    {
        id: 1,
        name: "Sherlock Holmes: Volume 1",
        editor: "HarperCollins",
        cover: "https://m.media-amazon.com/images/I/51r4tEpBGXL.jpg",
        year: "2015",
        autor: "",
        language: "Português",
        genero: "Policial, Suspense e Mistério",
        pages: "572"
    }, {
        id: 2,
        name: "No Longer Humans",
        editor: "New Directions Publishing Corporation",
        cover: "https://www.kulturkaufhaus.de/annotstream/9780811204811/COPL/Dazai-Osamu/No-Longer-Human.jpg?sq=1",
        year: "1973",
        autor: "Osamu Dazai",
        language: "Inglês",
        genero: "Ficção Literária",
        pages: "152"
    }, {
        id: 3,
        name: "A princesa salva a si mesma neste livro",
        editor: "Leya",
        cover: "https://images-na.ssl-images-amazon.com/images/I/61l3pp4owJL.jpg",
        year: "2017",
        autor: "Amanda Lovelace",
        language: "Português",
        genero: "Poesia",
        pages: "208"
    }, {
        id: 4,
        name: "As coisas que você só vê quando desacelera",
        editor: "Editora Sextante",
        cover: "https://lojasaraiva.vteximg.com.br/arquivos/ids/12110699/1008837628.jpg?v=637142254225270000",
        year: "2017",
        autor: "Haemin Sunim",
        language: "Português",
        genero: "Autoajuda",
        pages: "256"
    }
]

app.listen(port, () =>
    console.log(`Servidor rodando em http://localhost:${port}`)
)

app.get('/', (req, res) => {
    res.render('index.ejs', { estanteLivros })
})

app.get('/detalhes/:id/', (req, res) => {
    const id = +req.params.id;
    livro = estanteLivros.find((livro) => livro.id == id);
    res.render('detalhes.ejs', {livro})
})

app.get("/delete/:id", (req, res) => {
    const id = +req.params.id - 1
    delete estanteLivros[id]
    mensagem = `Livro deletado com sucesso!`
    res.redirect('/')
})

app.get('/cadastro', (req, res) => {
    res.render('cadastro.ejs', {livro})
})

let i = estanteLivros.length + 1

app.post("/cadastro", (req, res) => {
    const { name, editor, cover, year, autor, language, genero, pages } = req.body
    estanteLivros.push({ id: i, name, editor, cover, year, autor, language, genero, pages})
    res.redirect('/');
});