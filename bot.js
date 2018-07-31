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

client.on('message', message => {
	if (message.author.id === client.user.id) {
		return;
	}
	if (message.author.id === process.env.AD_ID) {
		return;
	}
	let channnel_name = message.channel.name;

	if(channnel_name === '掲示板' || channnel_name === '募集-ゲーム開発関連')
	{
		if(message.mentions.everyone)
		{
			console.log('del everyone');
			message.delete();		 
		}
		else if(channnel_name === '掲示板')
		{
			if(message.content.match(/discord.gg\//))
			{
				console.log('del discord_link');
				message.delete();
			}
		}
	}
});

client.login(process.env.BOT_TOKEN);
