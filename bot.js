// discord.js モジュールのインポート
const Discord = require('discord.js');

// Discord Clientのインスタンス作成
const client = new Discord.Client();

// 準備完了イベントのconsole.logで通知黒い画面に出る。
client.on('ready', () => {
    console.log('ready...');
	client.user.setActivity('アニマルビデオ', {
		type: 'WATCHING'
	});
});

client.on('message', async message => {
	if (message.author.id === client.user.id) {
		return;
	}
	
	if (message.author.id === '331432897888387072') {
		return;
	}
	
	let channnel_name = message.channel.name;

	if(channnel_name === '掲示板' || channnel_name === 'general')
	{
		
		if(message.mentions.everyone)
		{
			
			message.delete()
			 
		}
	}
	if(channnel_name === '掲示板')
	{
		if(message.content.match(/discord.gg\//))//match(/https:\/\/discord.gg\//))
		{
			message.delete()
			  
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
