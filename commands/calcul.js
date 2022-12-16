const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('calcul')
        .setDescription('Permet de calculer')
        .addStringOption(option =>
            option.setName('option')
                .setDescription('tu veux faire quel opération')
                .setRequired(true)
                .addChoices(
                    { name: 'Multiplication', value: 'multiplication' },
                    { name: 'Addition', value: 'addition' },
                    { name: 'Soustraction', value: 'substraction' },
                ))
        .addStringOption(option => option.setName('x').setDescription('c x'))
        .addStringOption(option => option.setName('y').setDescription('c y')),

    async execute(interaction) {
        const x = interaction.options.getString('x');
        const y = interaction.options.getString('y');
        const option = interaction.options.getString('option');
        axios.get(`https://botdiscord-kc3z.onrender.com/${option}?x=${x}&y=${y}`).then(res => {
            interaction.reply(`resultat: ${res.data}`);
        }).catch((error) => console.log(error))
    }
};