import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './style.css'
import { toast } from 'react-toastify'

function Filme() {
    const { id } = useParams();
    const navigate = useNavigate()
    const [filme, setFilme] = useState({});
    const [loading, setLoanding] = useState(true);

    useEffect(() => {
        async function Loadfilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "ada93334886eaf4031b03215c527df5a",
                    language: "pt-BR",
                }
            })
                .then((response) => {
                    setFilme(response.data)
                    setLoanding(false)
                })
                .catch(() => {
                    console.log('Filme nao encontrado')
                    navigate('/', {
                        replace: true
                    })
                })
        }

        Loadfilme()

    }, [navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem('@primeFlix');

        let filmesSalvos = JSON.parse(minhaLista) || [];
        
        ///verificar se tem algum item igual na lista de compras
        const hasFilme = filmesSalvos.some((filmesalvo) => filmesalvo.id === filme.id)

        /// se ja tiver um
        if(hasFilme){
            toast.warn("Esse filme ja está na lista!");
            return;
        }
        /// se nao tiver, adicionar
        filmesSalvos.push(filme);
        localStorage.setItem("@primeFlix", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso!")
    }

    if (loading) {
        return (
            <div className='filme-info'>
                <h1>Carregando detalhes...</h1>
            </div>
        );
    }

    return (
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://www.youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
                </button>
            </div>

        </div>
    );
}

export default Filme
