import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from './../../assets/logo.png';

import styles from './styles';

export default function Detail() {

    // Instanciamos o useNavigation
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;
    // Mensagem a enviar
    const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso '${incident.title}' com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value) }`;

    // Criamos uma função que retorna a página inicial com goBack(), ou seja
    // Retorna para a página anterior
    function navigationBack() {
        navigation.goBack();
    }

    function sendMail() {
        MailComposer.composeAsync({
            // Assunto da mensagem
            subject: `Heroi do caso: ${incident.title}`,
            // Email para quem será enviado
            recipients: [incident.email],
            // Mesangem do e-mail
            body: message,
        })
    } 

    function sendWhatsapp() {
        
        /**
         * Passamos alguns parâmetros dentro da url:
         * 
         * phone - o telefone da pessoa que será enviado a mensagem;
         * text - mensagem que irá ser enviada
        */
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />

                <TouchableOpacity onPress={navigationBack}>
                    <Feather name="arrow-left" size={20} color="#E82041" />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                {/* Passamos um array dentro do objeto para remover a margem do fim do card */}
                <Text style={[styles.incidentProperty, { marginTop: 0 } ]}>ONG:</Text>
                <Text style={styles.incidentValue}> { incident.name }  de { incident.city } </Text>
                
                <Text style={styles.incidentProperty}>Caso:</Text>
                <Text style={styles.incidentValue}> { incident.title } </Text>
                
                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}> { 
                    Intl.NumberFormat('pt-BR', { 
                        style: 'currency', currency: 'BRL' 
                    }).format(incident.value) } 
                </Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

                <Text style={styles.heroDescription}>Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};