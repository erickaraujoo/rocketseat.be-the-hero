import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/apii';

import { FiLogIn } from 'react-icons/fi';

import './styles.css';

import heroesImg from './../../assets/heroes.png';
import logoImg from './../../assets/logo.svg';

export default function Logon() {

    // Constante para redirecionamento de página
    const history = useHistory();

    // Estado inicial
    const [id, setID] = useState('');

    // Função assíncrona com async / await
    async function handleLogin(e) {

        // Removendo a ação de submit na página
        e.preventDefault();

        try{
            // Requisição passando o id como objeto na endpoint '/sessions'
            const response = await api.post('sessions', { id });

            // Inserindo no LocalStorage o id e o nome da ONG
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            // Redirecionando o usuário a página de profiles
            history.push('/profile');
        } catch(err) {

            // Caso dê falha, retornar um alerta
            alert("Falha no login, tente novamente!");
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input 
                        placeholder="Sua ID" 
                        value={ id }
                        onChange={ e => setID(e.target.value ) }
                    />

                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="heroes" />
        </div>
    );
}
