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
	let channnel_name = message.channel.name;
	let channel = message.channel;
	let username = message.author.username;
	let author_id = message.author.id;
	if(message.content === '!c')
	{
		if(channnel_name === 'main')
		{
			channel.fetchMessages()//{around: message.id, limit: 3 }
				  .then(messages => {
						const filtered_mes = messages.filter(msg => msg.content.match(/```/) && msg.author.id === author_id);
						const first_mes = filtered_mes.first();
						if(filtered_mes.size > 0)
						{
							var comment = first_mes.content.replace(/```/g, '');
						}
						else
						{
							var comment = "直近の黒枠書き込みはありません。";
						}
						console.log(comment+" "+username);
						sleep(3,function () {
							console.log('3sec spanned logged at callback function.');
							message.delete();
							return;
						});
						message.reply(comment)
							.then(sent => {
								sleep(20,function () {
									console.log('del bot reply');
									sent.delete();
									return;
								});
							})
					})
				 .catch(console.error);
		}
	}
	
	if (message.author.id === process.env.AD_ID) {
		return;
	}
	if(channnel_name === '掲示板' || channnel_name === '募集-ゲーム開発関連')
	{
		//if(message.mentions.everyone)
		if(message.content.match(/@everyone/))
		{
			console.log('del everyone '+username);
			message.delete();		 
		}
		else if(message.content.match(/discord.gg\//))
		{
			console.log('del discord_link '+username);
			message.delete();
		}
	}
});

client.login(process.env.BOT_TOKEN);

function sleep(waitSec, callbackFunc) {
        var spanedSec = 0;
        var id = setInterval(function () {
            spanedSec++;
            if (spanedSec >= waitSec) {
                clearInterval(id);
                if (callbackFunc) {
                    callbackFunc();
                }
            }
        }, 1000);
    }
