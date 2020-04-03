import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from './../../services/api';

import logoImg from './../../assets/logo.png';
import styles from './styles';

export default function Incidents() {

    // Estados iniciais
    const [ incidents, setIncidents ] = useState('');
    const [ total, setTotal ] = useState(0);
    const [ page, setPage ] = useState(1);
    // Para armazenar uma informação quando estamos buscando dados novos para evita que esses dados
    // sejam carregados novamente
    const [ loading, setLoading ] = useState(false);

    // Para redirecionamento de páginas
    const navitagion = useNavigation();

    function navigationToDetail(incident) {
        // O nome da rota precisa ser exatamente igual ao name passado no arquivo 'routes.js'
        navitagion.navigate('Detail', { incident });
    }

    async function loadIncidents() {

        // Para evitar que enquanto outra requisição seja feita, que mais uma aconteça
        if(loading) return;
        // Para não buscar mais informações caso já tenha carregado todos os casos
        if(total > 0 && incidents.length === total) return;

        setLoading(true);

        // Enviando o número da página que estamos carregando na URL
        const response = await api.get('incidents', { params: { page } });

        // Invés de trocar os valores de incidents, anexa os novos que vieram dentro
        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);

        // Pulando para a próxima página
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, []);

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}> {total} casos.</Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve</Text>

            {/* Cria uma lista com scroll */}
            <FlatList style={styles.incidentList}
                // Número de dados que irá aparecer 
                // No caso o objeto de casos
                data={incidents}
                // Inserindo uma chave para o FloatList saber quem é quem, igual no ReactJS para iteração
                keyExtractor={incident => String(incident.id)}
                // Removendo o scroll vertical que é criado na lista
                showsVerticalScrollIndicator={false}
                // Função disparada quando o usuário chegar ao final da lista
                onEndReached={loadIncidents}
                // Fala quando % no final da lista o usuário precisa estar para carregar novos itens
                onEndReachedThreshold={0.2} // Quando estiver 20% ao final da lista
                // Itens que serão renderizados 
                // Apelidamos item de incident 
                renderItem={({ item: incident }) => (

                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}> { incident.name } </Text>
                        
                        <Text style={styles.incidentProperty}>Caso:</Text>
                        <Text style={styles.incidentValue}> { incident.title } </Text>
                        
                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}> { 
                            Intl.NumberFormat('pt-BR', { 
                                style: 'currency', currency: 'BRL' 
                            }).format(incident.value) } 
                        </Text>

                        <TouchableOpacity 
                            style={styles.detailsButton} 
                            onPress={ () => navigationToDetail(incident) }
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};