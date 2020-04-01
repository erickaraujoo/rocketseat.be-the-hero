import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash } from 'react-icons/fi'

import api from './../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {

    const history = useHistory();

    const [incidents, setIncidents] = useState([]);

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    // É chamada toda vez que certo elemento passado no segundo argumento mudar seu valor
    // Deixando vazio, ele apenas é chamada uma unica vez
    // Recalcula toda vez que o id for mudado
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId, 
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id) {

        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            // Atualizando o estado removendo o caso que foi excluido
            // retornando apenas os casos que o id seja diferente que o id do caso excluído 
            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch(err) {
            alert("Erro ao deletar caso, tente novamente!");
        }
    }

    function handleLogout() {

        // Removendo todos os dados do LocalStorage com .clear()
        localStorage.clear();

        // Redirecionando o usuário para a página inicial
        history.push("/");
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Heroes"/>
                <span>Bem vinda, { ongName }</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {/* Retorna um conteúdo JSX diretamente com parênteses */}
                { incidents.map(incident => (

                    // Precisamos inserir uma chave única para mostrar ao JavaScript quem é quem
                    // ou facilitar quando precisar manipular os dados 
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÕES:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>

                        {/* Intl (internalização) é uma classe global, 
                        onde formata o número de acordo com o que você deseja
                        estamos formatando um número em reais, então passamos o idioma que utilizamos,
                        no objeto inserimos o formato da moeda 'currency', e qual a moeda que queremos,
                        no caso 'BRL' (reais). Após isso, avisamos qual o número que queremos formatar
                        formatando assim em 'R$ 00,00' */}
                        <p>
                            { Intl.NumberFormat('pt-BR', { 
                                style: 'currency', currency: 'BRL' 
                            } ).format( incident.value )}
                        </p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
