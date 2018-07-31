// discord.js モジュールのインポート
const Discord = require('discord.js');

// Discord Clientのインスタンス作成
const client = new Discord.Client();

// 準備完了イベントのconsole.logで通知黒い画面に出る。
client.on('ready', () => {
    	console.log('ready...');
	client.user.setActivity('みんなの代わりにゲーム', {
		type: 'PLAYING'
	});
});

client.on('message', async message => {
	if (message.author.id === client.user.id) {
		return;
	}
	if (message.author.id === process.env.AD_ID) {
		return;
	}
	let channnel_name = message.channel.name;

	if(channnel_name === '掲示板' || channnel_name === '募集')
	{
		if(message.mentions.everyone)
		{
			console.log('del everyone mention');
			message.delete();		 
		}
	}
	if(channnel_name === '掲示板')
	{
		if(message.content.match(/discord.gg\//))
		{
			console.log('del bbs discordlink');
			message.delete();
		}
	}
});

client.login(process.env.BOT_TOKEN);
