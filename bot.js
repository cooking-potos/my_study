// discord.js モジュールのインポート
const Discord = require('discord.js');

// Discord Clientのインスタンス作成
const client = new Discord.Client();

const str_voice_text_channel_name = "作業室用テキストチャンネル";

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
			channel.fetchMessages({limit:100})//{around: message.id, limit: 3 }
				  .then(messages => {
						console.log("1回目:"+messages.size+" "+username)
						var filtered_mes = messages.filter(msg => msg.content.match(/```/) && msg.author.id === author_id);
						var first_mes = filtered_mes.first();
						
						if(filtered_mes.size > 0)
						{
							comment = first_mes.content.replace(/```/g, '');
							do_after_get_comment();
						}
						else
						{
							
							var last_message = messages.last();
							channel.fetchMessages({limit:100,before:last_message.id})//{around: message.id, limit: 3 }
								  .then(messages => {
										console.log("2回目:"+messages.size)
										filtered_mes = messages.filter(msg => msg.content.match(/```/) && msg.author.id === author_id);
										first_mes = filtered_mes.first();
										
										if(filtered_mes.size > 0)
										{
											comment = first_mes.content.replace(/```/g, '');
											do_after_get_comment();
										}
										else
										{
											
											var last_message = messages.last();
											channel.fetchMessages({limit:100,before:last_message.id})//{around: message.id, limit: 3 }
												  .then(messages => {
														console.log("3回目:"+messages.size)
														filtered_mes = messages.filter(msg => msg.content.match(/```/) && msg.author.id === author_id);
														first_mes = filtered_mes.first();
														
														if(filtered_mes.size > 0)
														{
															comment = first_mes.content.replace(/```/g, '');
															
														}
														else
														{
															comment = "直近の300件には黒枠書き込みはありません。";
															
														}
														do_after_get_comment();
												});
										}
								});
						}
				})
				.catch(console.error);
		}
	}
	else if(message.content === '!del_voice_text')
	{
		if(channnel_name === str_voice_text_channel_name)
		{
			del_all_message_at_voice_text_channel();
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
	function del_all_message_at_voice_text_channel()
	{
		let chls = client.channels.filter(chl => chl.name === str_voice_text_channel_name);
		let chl = chls.first();
		chl.fetchMessages({ limit: 100 })
			.then(messages => {
				messages.deleteAll();
			})
			.catch(console.error);
	}
	function do_after_get_comment()
				{
					
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
