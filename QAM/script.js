// ==UserScript==
// @name Quick-AccessMenu2.1
// @namespace https://www.bondageprojects.com/
// @version 1.5.0.
// @description Everything you'll ever need for BC
// @author Nemesea
// @match https://bondageprojects.elementfx.com/*
// @match https://www.bondageprojects.elementfx.com/*
// @match https://bondage-europe.com/*
// @match https://www.bondage-europe.com/*
// @match http://localhost:*/*
// @icon data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant none
// @run-at document-end
// ==/UserScript==
(typeof OLDmenu !== "undefined") && (ChatRoomSendChat = OLDmenu); //reset
async function NEWmenu() {
    var content = ElementValue("InputChat").trim();
    if (CurrentScreen == "ChatRoom") {
        if (content.indexOf("/help") == 0) {
            if (content.endsWith("/help")) {
                ChatRoomSendLocal(
                    "<b>Quick-AccessMenu2</b>: QAM help is organized into categories. Use <b>/help</b> (category). List of categories:\n" +
                    "<b>bondage</b> = commands related to bondage.\n" +
                    "<b>character</b> = commands related to your character.\n" +
                    "<b>chat</b> = commands with extra features in chat room.\n" +
                    "<b>clothing</b> = commands related to the clothes.\n" +
                    "<b>escape</b> = commands related to escape.\n" +
                    "<b>fun</b> = commands related to fun, pain and pleasure.\n" +
                    "<b>misc</b> = special commands.\n" +
                    "<b>talking</b> = commands related to talking.\n" +
                    "<b>visual</b> = commands related to animations and background.\n" +
                    "<b>zones</b> = commands related to game zones.\n" +
                    " \n" +
                    "Use <b>/help new</b> to get info about changes in current QAM version.\n" +
                    " \n" +
                    "Several commands require to specify a target. It can be a real name or a member number."
                );
            } else if (content.includes("character")) {
                ChatRoomSendLocal(
                    "<b>Quick-AccessMenu2</b>: Character commands - * = more info when using\n" +
                    "<b>/becomeownlover</b> = becomes your own lover.\n" +
                    "<b>/becomeownowner</b> = becomes your own owner.\n" +
                    "<b>/difficulty</b> (number) = changes game difficulty. 0 roleplay - 1 regular - 2 hardcore - 3 extreme\n" +
                    "<b>/giveeverything</b> = gives every item.\n" +
                    "<b>/maxstatistics</b> = gives max statistics.\n" +
                    "<b>/money</b> (value) = gives or takes money.\n" +
                    "<b>/skill</b> (skill) (level) = changes a skill. *"
                );
            } else if (content.includes("chat")) {
                ChatRoomSendLocal(
                    "<b>Quick-AccessMenu2</b>: Chat commands:\n" +
                    "<b>/search</b> (areaname) = opens room search, area is: club or asylum.\n"
                );
            } else if (content.includes("clothing")) {
                ChatRoomSendLocal(
                    "<b>Quick-AccessMenu2</b>: Clothing commands:\n" +
                    "<b>/wardrobe</b> (target) = opens target wardrobe."
                );
            } else if (content.includes("fun")) {
                ChatRoomSendLocal(
                    "<b>Quick-AccessMenu2</b>: Fun commands:\n" +
                    "<b>/moaner</b> = moans when horny and stimulated. Using will give more info."
                );
            }
        }
        else if (content.indexOf("/becomeownlover") == 0) {
            if (content.includes("yes")) {
                ServerSend("AccountLovership", {
                    MemberNumber: Player.MemberNumber,
                    Action: "Propose" && "Accept"
                })
                ServerSend("AccountLovership", {
                    MemberNumber: Player.MemberNumber,
                    Action: "CanOfferBeginWedding" && "Propose"
                });
                ServerSend("AccountLovership", {
                    MemberNumber: Player.MemberNumber,
                    Action: "CanBeginWedding" && "Accept"
                });
                ChatRoomSendLocal("Quick-AccessMenu2: Accomplished. Break-up is done via Club Management.");
            } else {
                ChatRoomSendLocal(
                    "<b>Warning</b>: Uncomfirmed glitch might occur when removing self as lover, during which a random/real lover will be taken\n" +
                    "Use with risk in mind. Confirm by typing: <b>/becomeownlover yes</b>"
                );
            }
        }
        // 不依赖其他代码
        else if (content.indexOf("/becomeownowner") == 0) {
            ServerSend("AccountOwnership", {
                MemberNumber: Player.MemberNumber,
                Action: "Propose" && "Accept"
            })
            ServerSend("AccountOwnership", {
                MemberNumber: Player.MemberNumber,
                Action: "CanOfferEndTrial" && "Propose"
            });
            ServerSend("AccountOwnership", {
                MemberNumber: Player.MemberNumber,
                Action: "CanEndTrial" && "Accept"
            });
            ChatRoomSendLocal("Quick-AccessMenu2: Accomplished. Break-up is done via Club Management.");
        }
        else if (content.indexOf("/clubhelp") == 0) {
            // 系统 API
            CommandPrintHelpFor(Commands);
        }
        // 不依赖其他代码
        else if (content.indexOf("/giveeverything") == 0) {
            ChatRoomSendLocal("Quick-AccessMenu2: Every item in the game now added.");
            AssetFemale3DCG.forEach(group => group.Asset.forEach(item => InventoryAdd(Player, item.Name, group.Group)));
            ServerPlayerInventorySync();
        }

        /**
         * @TODO: 依赖 moaner 模块
         */
        else if (content.indexOf("/moaner") == 0) {
            if (content.endsWith("/moaner")) {
                ChatRoomSendLocal(
                    "<b>Quick-AccessMenu2</b>: 关于 moaner:\n" +
                    "<b>/moaner on</b> 开启涩涩的叫声.\n" +
                    "<b>/moaner off</b> 关掉涩涩的叫声.\n" +
                    "<b>/moaner profile [name]</b> 无任何参数列出所有可用配置. 如果后面跟配置名,则切换到你选择的呻吟方案.\n" +
                    "<b>/moaner status</b> 显示当前 Moaner 的状态.\n" +
                    "<b>/moaner verbose &lt; on|off &gt;</b> 启用或关闭更详细的帮助信息.\n" +
                    " \n" +
                    "你可以通过下面的方法启用或关闭 Monaer 的部分功能:\n" +
                    "<b>/moaner orgasm &lt; on|off &gt;</b> : 开启或关闭高潮时发出涩涩的声音.\n" +
                    "<b>/moaner spank &lt; on|off &gt;</b>: 开启或关闭被击打时发出涩涩的声音.\n" +
                    "<b>/moaner talk &lt; on|off &gt;</b>: 开启或关闭谈话时发出涩涩的声音\n" +
                    "<b>/moaner vibe &lt; on|off &gt;</b>: 开启或关闭震动玩具模式改变时发出涩涩的声音"
                );
            } else {
                var stringMoan1 = content;
                var stringMoan2 = stringMoan1.split(/[ ,]+/);
                var feature = stringMoan2[1];
                if ((feature == "on") || (feature == "off")) {
                    scriptControl(feature);
                    M_MOANER_saveControls();
                } else {
                    var commande = stringMoan2[2];
                    if (feature == "orgasm") {
                        orgasmControl(commande);
                        M_MOANER_saveControls();
                    } else if (feature == "profile") {
                        if (commande == null) {
                            profilesList();
                        } else if (commande != null) {
                            M_MOANER_activerProfile(commande);
                            M_MOANER_saveControls();
                        }
                        showM_MOANER_profileStatus();
                    } else if (feature == "spank") {
                        spankControl(commande);
                        M_MOANER_saveControls();
                    } else if (feature == "status") {
                        showStatus();
                    } else if (feature == "talk") {
                        talkControl(commande);
                        M_MOANER_saveControls();
                    } else if (feature == "verbose") {
                        verboseControl(commande);
                        M_MOANER_saveControls();
                    } else if (feature == "vibe") {
                        vibeControl(commande);
                        M_MOANER_saveControls();
                    }
                }
            }
        }

        // 不依赖其他代码
        else if (content.indexOf("/money") == 0) {
            Player.Money = content.substring(6);
            ServerPlayerSync();
        }
        // 不依赖其他代码：需要修改一下帮助文档
        else if (content.indexOf("/search") == 0) {
            setTimeout(function () {
                ChatRoomSpace = "";
                CommonSetScreen("Online", "ChatSearch");
                ChatRoomSetLastChatRoom("");
                document.getElementById("InputChat").style.display = "none";
                document.getElementById("TextAreaChatLog").style.display = "none";
            }, 3000);
            setTimeout(function () {
                CommonSetScreen("Online", "ChatRoom");
                document.getElementById("InputChat").style.display = "inline";
                document.getElementById("TextAreaChatLog").style.display = "inline";
            }, 15000);
        }
        // 不依赖其他代码
        else if (content.indexOf("/skill") == 0) {
            if (content.endsWith("/skill")) {
                ChatRoomSendLocal(
                    "<b>Quick-AccessMenu2</b>: The skill command must be followed by a skill and a level.\n" +
                    "You will be able to check the change in your profile.\n" +
                    " \n" +
                    "Available skills:\n" +
                    "bondage, dressage, evasion, infiltration,\n" +
                    "lockpicking, selfbondage, willpower.\n" +
                    "Level must be between 0 and 10."
                );
            } else {
                var stringSkill1 = content;
                var stringSkill2 = stringSkill1.split(/[ ,]+/);
                var skill = stringSkill2[1];
                var level = stringSkill2[2];
                if (skill == "bondage") {
                    SkillChange("Bondage", level);
                } else if (skill == "dressage") {
                    SkillChange("Dressage", level);
                } else if (skill == "evasion") {
                    SkillChange("Evasion", level);
                } else if (skill == "infiltration") {
                    SkillChange("Infiltration", level);
                } else if (skill == "lockpicking") {
                    SkillChange("LockPicking", level);
                } else if (skill == "selfbondage") {
                    SkillChange("SelfBondage", level);
                } else if (skill == "willpower") {
                    SkillChange("Willpower", level);
                }
            }
        }
        // 不依赖其他代码
        else if (content.indexOf("/wardrobe") == 0) {
            var targetname = content.substring(10).trim();
            var targetfinder = new RegExp('^' + targetname + '', 'i');
            var target = ChatRoomCharacter.filter(A => (A.Name.match(targetfinder)));
            if (target[0] == null) {
                var targetnumber = parseInt(targetname);
                target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
            };
            if (target[0] != null) {
                target[0].OnlineSharedSettings.AllowFullWardrobeAccess = true;
                target[0].OnlineSharedSettings.BlockBodyCosplay = false;
                ChatRoomClickCharacter(target[0]);
                DialogChangeClothes();
            }
        }
        ElementValue("InputChat", "");
    }
}

//if modified code above is not called, use original.
var OLDmenu = ChatRoomSendChat;
var ChatRoomSendChat = NEWmenu;

//below is additional stuff

//greeting message.
ChatCommandGreeting = function (data) {
    if (CurrentScreen == "ChatRoom" && data.Content == "ServerEnter") {
        Player.RestrictionSettings.BypassNPCPunishments = true;
        ChatRoomSendLocal(
            "<div style='margin:1.2em 0px'>" +
            "Quick-AccessMenu2 - version 1.5.0: 已加载, 输入 <b>/help</b> 显示基本菜单.\n" +
            "使用 <b>/help new</b> 显示当前 QAM 的所更改的信息.\n" +
            "原作者的留的 <a href='https://discord.gg/YukepB6RVp' target='_blank'>https://discord.gg/YukepB6RVp</a>\n" +
            "提示: NPC 惩罚已禁用.\n" +
            "若要查看 BC 原本帮助或 BCE(若安装过) 帮助请使用: <b>/clubhelp</b>.\n" +
            "<b style='color:red'>此 QAM 被猫做了一些简易的修改, 可能会存在一些问题.</b>\n" +
            "<b style='color:red'>原作者 <a href='https://github.com/tetris245/tetris245' target='_blank'>(tetris245)</a>的版本.</b>\n" +
            "<b style='color:red'><a href='https://github.com/tetris245/tetris245/wiki' target='_blank'>原作者写的使用文档.</a>" +
            "</div>"
        );
        ServerSocket.off('ChatRoomMessage', ChatCommandGreeting)
    }
}

setTimeout(function () {
    ServerSocket.on('ChatRoomMessage', ChatCommandGreeting);
}, 5000);

// 备用
function updateBackground() {
    var UpdatedRoom = {
        Name: ChatRoomData.Name,
        Description: ChatRoomData.Description,
        Language: ChatRoomData.Language,
        Background: ChatCreateBackgroundSelect,
        Limit: "" + ChatRoomData.Limit,
        Admin: ChatRoomData.Admin,
        Ban: ChatRoomData.Ban,
        BlockCategory: ChatRoomData.BlockCategory,
        Game: ChatRoomData.Game,
        Private: ChatRoomData.Private,
        Locked: ChatRoomData.Locked,
    };
    ServerSend("ChatRoomAdmin", {
        MemberNumber: Player.ID,
        Room: UpdatedRoom,
        Action: "Update",
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//Moaner
//ChatRoom
/*var backupChatRoomSendChat;
var backupActivityOrgasmPrepare;
var backupActivityOrgasmStart;
var backupChatRoomMessage;
var backupChatRoomFirstTimeHelp;*/
/////////////////////////////////////////////////////////////////////////////////////////////////////////

var M_MOANER_scriptOn = true;
var M_MOANER_lang = "zh";

let backupChatRoomMessage = ChatRoomMessage;

function M_MOANER_MoanerInitAlteredFns() {
    //gemissements quand on parle
    M_MOANER_initChatRoomSendChatOverride();
    //initActivityOrgasmPrepareOverride();
    M_MOANER_initActivityOrgasmStart();
    //gemissements quand on recoit une stimulation
    M_MOANER_initChatRoomMessageOverride();
    //message d'aide
    M_MOANER_initChatRoomFirstTimeHelpOverride();
}

function M_MOANER_initChatRoomFirstTimeHelpOverride() {
    let backupChatRoomFirstTimeHelp = ChatRoomFirstTimeHelp;
    ChatRoomFirstTimeHelp = () => {
        firstHelp();
        backupChatRoomFirstTimeHelp();
    }
}

var M_MOANER_tempChatRoomData;

function M_MOANER_initChatRoomMessageOverride() {
    M_MOANER_logDebug("Entree initChatRoomOverride pour ChatRoomMessage");
    let backupChatRoomMessage = ChatRoomMessage;
    ChatRoomMessage = (data) => {
        if (M_MOANER_scriptOn && window.CurrentScreen == "ChatRoom") {
            M_MOANER_tempChatRoomData = data;
            if (data != null && data.Content != undefined && data.Content != null) {
                M_MOANER_logDebug("lancerM_MOANER_reactionTrigger");
                M_MOANER_reactionTrigger(data);
            }
        }
        backupChatRoomMessage(data);
    };
}

function M_MOANER_initChatRoomSendChatOverride() {
    M_MOANER_logDebug("Entree M_MOANER_MoanerInitAlteredFns pour ChatRoomSendChat");
    let backupChatRoomSendChat = ChatRoomSendChat;
    ChatRoomSendChat = (...rest) => {

        let msg = ElementValue("InputChat").trim();
        if (M_MOANER_scriptOn && M_MOANER_isSimpleChat(msg)) {
            msg = M_MOANER_reactionExcitation(Player, msg);
            ElementValue("InputChat", msg);
        }
        M_MOANER_logDebug("msg=" + msg);
        backupChatRoomSendChat(...rest);
        M_MOANER_logDebug("Sortie ChatRoomSendChat");
    };
}

function M_MOANER_initActivityOrgasmStart() {
    let backupActivityOrgasmStart = ActivityOrgasmStart;
    ActivityOrgasmStart = (C) => {
        if (M_MOANER_scriptOn) {
            M_MOANER_reactionOrgasm(C);
        }
        backupActivityOrgasmStart(C);
    };
}

function M_MOANER_isCommande(msg) {
    return msg.startsWith("/") && ChatRoomTargetMemberNumber == null;
}

function M_MOANER_isSimpleChat(msg) {
    return msg.trim().length > 0 && !msg.startsWith("/") && !msg.startsWith("(") && !msg.startsWith("*") && ChatRoomTargetMemberNumber == null;
}

function M_MOANER_isInChatRoom() {
    return window.CurrentScreen == "ChatRoom";
}

//MoanerCommands
//commande:
//@moaner feature commande
//feature: talk (quand on parle), orgasm, startVibrator, spank
//commande On, OFF

var M_MOANER_moanerKey = "bc_moaner_";

//features
var M_MOANER_talkActive = true;
var M_MOANER_orgasmActive = true;
var M_MOANER_vibratorActive = true;
var M_MOANER_spankActive = true;
var M_MOANER_verboseActive = true;
var M_MOANER_firstHelpSeen = false;

var M_MOANER_scriptStatus = ["Moaner 已启用.", "Moaner 已关闭."];
var M_MOANER_orgasmStatus = ["高潮呻吟已启用. 在你高潮时会发出奇怪涩涩的叫声.", "高潮呻吟已关闭. 你可以安静享受高潮了."];
var M_MOANER_vibratorStatus = ["震动呻吟已启用. 在你的震动玩具被调节时你会忍不住叫出来.", "震动呻吟已关闭. 修改你的震动玩具时, 你可以安静的期待了."];
var M_MOANER_spankStatus = ["拍打叫声已启用, 你在被拍打时会发出涩涩地声音.", "拍打涩涩声已经关闭, 你可以安静地被打了(bushi)."];
var M_MOANER_talkStatus = ["谈话呻吟已启用. 呻吟会中断你的谈话, 已输入的文字会随着呻吟强制发出.", "谈话呻吟已关闭. 你可以好好说话了."];
var M_MOANER_verboseStatus = ["显示更详细的信息.", "显示简短的信息."];
var M_MOANER_profileStatus = ["无已加载的自定义配置.", "当前涩涩声: "];
var M_MOANER_profileListM_MOANER_intro = "可用的涩涩声: ";

var M_MOANER_intro = "Moaner 已经安装. 输入 /moaner 查看更多信息, 输入 /moaner status 查看当前状态.";

function M_MOANER_initControls() {
    var datas = JSON.parse(localStorage.getItem(M_MOANER_moanerKey + "_" + Player.MemberNumber));

    if (datas == null || datas == undefined) {
        M_MOANER_talkActive = true;
        M_MOANER_orgasmActive = true;
        M_MOANER_vibratorActive = true;
        M_MOANER_spankActive = true;
        M_MOANER_scriptOn = false;
        profileName = "default";
        //M_MOANER_saveControls();
    } else {
        M_MOANER_talkActive = datas.talkMoan;
        M_MOANER_orgasmActive = datas.orgasmMoan;
        M_MOANER_vibratorActive = datas.vibeMoan;
        M_MOANER_spankActive = datas.spankMoan;
        M_MOANER_scriptOn = datas.script;
        profileName = datas.moanProfile;
    }
}

function M_MOANER_saveControls() {
    var controls = {
        "talkMoan": M_MOANER_talkActive,
        "orgasmMoan": M_MOANER_orgasmActive,
        "vibeMoan": M_MOANER_vibratorActive,
        "spankMoan": M_MOANER_spankActive,
        "script": M_MOANER_scriptOn,
        "moanProfile": profileName
    };
    localStorage.setItem(M_MOANER_moanerKey + "_" + Player.MemberNumber, JSON.stringify(controls));
}

function M_MOANER_deleteControls() {
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key.startsWith(M_MOANER_moanerKey) && key.endsWith(Player.MemberNumber)) {
            localStorage.removeItem(key);
        }
    }
}

//controle sur le script entier
function scriptControl(commande) {
    if (commande == "on") {
        M_MOANER_scriptOn = true;
    } else if (commande == "off") {
        M_MOANER_scriptOn = false;
    }
    showM_MOANER_scriptStatus();
}

//controle sur le mode verbose
function verboseControl(commande) {
    if (commande == "on") {
        M_MOANER_verboseActive = true;
    } else if (commande == "off") {
        M_MOANER_verboseActive = false;
    }
    showM_MOANER_verboseStatus();
}

//controle sur les gÃƒÂ©missements quand on parle
function talkControl(commande) {
    if (commande == "on") {
        M_MOANER_talkActive = true;
    } else if (commande == "off") {
        M_MOANER_talkActive = false;
    }
    showM_MOANER_talkStatus();
}

//controle sur les gÃƒÂ©missements ÃƒÂ  l'orgasme
function orgasmControl(commande) {
    if (commande == "on") {
        M_MOANER_orgasmActive = true;
    } else if (commande == "off") {
        M_MOANER_orgasmActive = false;
    }
    showM_MOANER_orgasmStatus();
}

//controle sur les gÃƒÂ©missements au lancement d'un vibrateur
function vibeControl(commande) {
    if (commande == "on") {
        M_MOANER_vibratorActive = true;
    } else if (commande == "off") {
        M_MOANER_vibratorActive = false;
    }
    showM_MOANER_vibratorStatus();
}

//controle sur les gÃƒÂ©missements ÃƒÂ  la fessÃƒÂ©e
function spankControl(commande) {
    if (commande == "on") {
        M_MOANER_spankActive = true;
    } else if (commande == "off") {
        M_MOANER_spankActive = false;
    }
    showM_MOANER_spankStatus();
}

function firstHelp() {
    //console.log("ChatRoomHelpSeen="+ChatRoomHelpSeen);
    if (!M_MOANER_firstHelpSeen) {
        M_MOANER_firstHelpSeen = true;
        console.log("firstHelp! " + ChatRoomHelpSeen);
        M_MOANER_sendMessageToWearer(M_MOANER_intro);
    }
}

function profilesList() {
    let liste = M_MOANER_getKeys(M_MOANER_moansProfiles);
    let msg = M_MOANER_profileListM_MOANER_intro + liste;
    M_MOANER_sendMessageToWearer(msg);
}

//Status
function showStatus() {
    showM_MOANER_scriptStatus();
    showM_MOANER_profileStatus();
    showM_MOANER_talkStatus();
    showM_MOANER_orgasmStatus();
    showM_MOANER_vibratorStatus();
    showM_MOANER_spankStatus();
    showM_MOANER_verboseStatus();
}

function showM_MOANER_profileStatus() {
    if (!M_MOANER_verboseActive) {
        return;
    }
    let msg;
    if (profileName == "default") {
        msg = M_MOANER_profileStatus[0];
    } else {
        msg = M_MOANER_profileStatus[1] + profileName;
    }
    M_MOANER_sendMessageToWearer(msg);
}

function showM_MOANER_verboseStatus() {
    if (!M_MOANER_verboseActive) {
        return;
    }
    let msg;
    if (M_MOANER_scriptOn) {
        msg = M_MOANER_verboseStatus[0];
    } else {
        msg = M_MOANER_verboseStatus[1];
    }
    M_MOANER_sendMessageToWearer(msg);
}

function showM_MOANER_scriptStatus() {
    if (!M_MOANER_verboseActive) {
        return;
    }
    let msg;
    if (M_MOANER_scriptOn) {
        msg = M_MOANER_scriptStatus[0];
    } else {
        msg = M_MOANER_scriptStatus[1];
    }
    M_MOANER_sendMessageToWearer(msg);
}

function showM_MOANER_talkStatus() {
    if (!M_MOANER_verboseActive) {
        return;
    }
    let msg;
    if (M_MOANER_talkActive) {
        msg = M_MOANER_talkStatus[0];
    } else {
        msg = M_MOANER_talkStatus[1];
    }
    M_MOANER_sendMessageToWearer(msg);
}

function showM_MOANER_orgasmStatus() {
    if (!M_MOANER_verboseActive) {
        return;
    }
    let msg;
    if (M_MOANER_orgasmActive) {
        msg = M_MOANER_orgasmStatus[0];
    } else {
        msg = M_MOANER_orgasmStatus[1];
    }
    M_MOANER_sendMessageToWearer(msg);
}

function showM_MOANER_vibratorStatus() {
    if (!M_MOANER_verboseActive) {
        return;
    }
    let msg;
    if (M_MOANER_vibratorActive) {
        msg = M_MOANER_vibratorStatus[0];
    } else {
        msg = M_MOANER_vibratorStatus[1];
    }
    M_MOANER_sendMessageToWearer(msg);
}

function showM_MOANER_spankStatus() {
    if (!M_MOANER_verboseActive) {
        return;
    }
    let msg;
    if (M_MOANER_spankActive) {
        msg = M_MOANER_spankStatus[0];
    } else {
        msg = M_MOANER_spankStatus[1];
    }
    M_MOANER_sendMessageToWearer(msg);
}

//MoanerUtils

function M_MOANER_logDebug(msg) { }

function startDebug() {
    M_MOANER_logDebug = (msg) => {
        console.log("DEBUG: " + msg);
    };
}

function stopDebug() {
    M_MOANER_logDebug = (msg) => {
        console.log("DEBUG: " + msg);
    };
}

let MoanerIsLoaded;

MoanerLoginListener();

async function MoanerLoginListener() {
    while (!MoanerIsLoaded) {
        try {
            while ((!window.CurrentScreen || window.CurrentScreen == "Login" || (typeof window.CursedStarter === "function" && window.cursedConfig === undefined)) && !MoanerIsLoaded) {
                //console.log("cherche isLoaded");
                //console.log("window.CurrentScreen="+window.CurrentScreen);
                await new Promise(r => setTimeout(r, 2000));
            }
            //console.log("window.CurrentScreen="+window.CurrentScreen);
            //console.log("MoanerIsLoaded trouvÃƒÂ©");
            MoanerIsLoaded = true;
            M_MOANER_MoanerInitAlteredFns();
            M_MOANER_initControls();

        } catch (err) {
            console.log(err);
        }
        await new Promise(r => setTimeout(r, 2000));
    }
}

function M_MOANER_getKeys(obj) {
    var keys = [];
    for (var key in obj) {
        keys.push(key);
    }
    return keys;
}

function M_MOANER_shuffle(array, seed) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    // While there remain elements to M_MOANER_shuffle...
    while (0 !== currentIndex) {
        seed = M_MOANER_getRandomNumber(seed);

        // Pick a remaining element...
        randomIndex = seed % (array.length - 1);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// 消息被改了
function M_MOANER_sendMessageToWearer(msg) {
    // ServerSend("ChatRoomChat", {
    //     Type: "Action",
    //     Content: "gag",
    //     Target: Player.MemberNumber,
    //     Dictionary: [{
    //         Tag: "gag",
    //         Text: msg
    //     }],
    // });
    ChatRoomSendLocal(
        "<span style='color:#5fbd7a'>&#40; " + msg + "&#41;</span>"
    );
}

function M_MOANER_getRandomNumber(seed) {
    let number = Math.floor(Math.abs(Math.sin(seed) * 1000));
    return number;
}

//MoanerManagement

/*const baseM_MOANER_factor4Moans=["n... Nyah\u2665","Oooh","mmmmmh!","NYyaaA\u2665"];
const baseM_MOANER_factor3Moans=["mm","aaaah","nyAh\u2665"];
const baseM_MOANER_factor2Moans=["nyah\u2665","Aah!","mh","oh!\u2665","mh\u2665"];
const basefactor1Moans=["mh","\u2665oh\u2665","ah","...\u2665"];
const baseM_MOANER_orgasmMoans=["Nya...Ny...NyaaAAaah!","Mmmmh... MMmh... Hhhmmmm...","Oooooh... Mmmmh... OooOOOOh!","Mmmhnn... Nyhmm... Nyah!"];
const basePainMoans=["Aie!","Aoouch!","Eek","ouch","Aow"];*/

var M_MOANER_profileName = "default";

/*M_MOANER_defaultMoans = {
    "hot": ["n... Nyah\u2665", "Oooh", "mmmmmh!", "NYyaaA\u2665"],
    "medium": ["mm", "aaaah", "nyAh\u2665"],
    "light": ["nyah\u2665", "Aah!", "mh", "oh!\u2665", "mh\u2665"],
    "low": ["mh", "\u2665oh\u2665", "ah", "...\u2665"],
    "orgasm": ["Nya...Ny...NyaaAAaah!", "Mmmmh... MMmh... Hhhmmmm...", "Oooooh... Mmmmh... OooOOOOh!", "Mmmhnn... Nyhmm... Nyah!"],
    "pain": ["Aie!", "Aoouch!", "Aaaaie!", "Ouch", "Aow"]
}*/

M_MOANER_defaultMoans = {
    "hot": ["嗯... 喵呜❤", "❤...咕噜咕噜~", "嗯~呼~!", "喵❤~~~"],
    "medium": ["姆", "啊❤", "喵啊❤"],
    "light": ["唔姆", "啊啊❤", "嗯", "喵~", "唔啊❤"],
    "low": ["啊", "唔啊", "嗯嗯", "啊呜"],
    "orgasm": ["喵...喵...喵啊❤~", "嗯啊...嗯嗯❤... 喵嗯❤...", "啊... 嗯... 嗯嗯❤ ... 呼~!", "嗯喵... 嗯嗯... 喵❤~"],
    "pain": ["喵呜!!!", "呜...好疼!!!", "呲咝!", "呜噜呜撸~", "喵 >.<"]
}

M_MOANER_customMoans = {
    "hot": [],
    "medium": [],
    "light": [],
    "low": [],
    "orgasm": [],
    "pain": []
}

var M_MOANER_moansProfiles = [];

function M_MOANER_activerProfile(name) {
    if (M_MOANER_moansProfiles[name] == undefined) {
        profileName = "default";
        resetMoans(Math.random() * 300);
    } else {
        profileName = name;
        resetMoans(Math.random() * 300);
    }
}

function M_MOANER_getMoans(name) {
    var pleasureMoans = M_MOANER_moansProfiles[name];
    if (pleasureMoans == undefined) {
        pleasureMoans = M_MOANER_defaultMoans;
    }
    return pleasureMoans;
}

function M_MOANER_addMoansProfile(name, pleasure) {
    if (pleasure.hot == undefined || pleasure.hot.length == 0) {
        pleasure.hot = M_MOANER_defaultMoans.hot;
    }
    if (pleasure.medium == undefined || pleasure.medium.length == 0) {
        pleasure.medium = M_MOANER_defaultMoans.medium;
    }
    if (pleasure.light == undefined || pleasure.light.length == 0) {
        pleasure.light = M_MOANER_defaultMoans.light;
    }
    if (pleasure.low == undefined || pleasure.low.length == 0) {
        pleasure.low = M_MOANER_defaultMoans.low;
    }
    if (pleasure.orgasm == undefined || pleasure.orgasm.length == 0) {
        pleasure.orgasm = M_MOANER_defaultMoans.orgasm;
    }
    if (pleasure.pain == undefined || pleasure.pain.length == 0) {
        pleasure.pain = M_MOANER_defaultMoans.pain;
    }
    M_MOANER_moansProfiles[name] = pleasure;
}

function addLowMoans(name, pleasureList) {
    var profile = M_MOANER_moansProfiles[name];
    if (profile == undefined) {
        profiledefaultPleasureMoans;
    }
    profile.low = pleasureList;
    addMoansProfile(name, profile);
}

M_MOANER_addMoansProfile("default", M_MOANER_defaultMoans);

//MoanerReactions

var M_MOANER_orgasmMoans = [];

var M_MOANER_factor4Moans = [];
var M_MOANER_factor3Moans = [];
var M_MOANER_factor2Moans = [];
var factor1Moans = [];
var PROPORTION_MAX = 40;

/******************************************************************/
//rÃƒÂ©agir au chat
/******************************************************************/
function M_MOANER_reactionExcitation(C, CD) {

    if (M_MOANER_talkActive && IsStimulated(C)) {

        // Validate nulls
        if (CD == null) CD = "";

        // Validates that the preferences allow stuttering
        /*if ((C.ArousalSettings == null) || (C.ArousalSettings.AffectStutter == null) || (C.ArousalSettings.AffectStutter != "None")) {
            return M_MOANER_applyMoanToMsg(C,CD);
        }*/
        return M_MOANER_applyMoanToMsg(C, CD);
    }

    // No stutter effect, we return the regular text
    return CD;
}

function M_MOANER_reactionOrgasm(C) {
    if (M_MOANER_orgasmActive && M_MOANER_scriptOn && C.MemberNumber == Player.MemberNumber && window.CurrentScreen == "ChatRoom") {
        if (C.ID == 0 && C.MemberNumber == Player.MemberNumber) {
            var moan;
            var backupChatRoomTargetMemberNumber = null;
            //doit pas se lancer en prive
            //doit pas se lancer en /me
            //doit se lancer uniquement en chat simple
            msg = ElementValue("InputChat");
            if (M_MOANER_isSimpleChat(msg)) {

                moan = msg + "... " + getOrgasmMoan();

                ElementValue("InputChat", moan);
                msg = "";
                ChatRoomSendChat();
            } else {
                backupChatRoomTargetMemberNumber = ChatRoomTargetMemberNumber;
                ChatRoomTargetMemberNumber = null;
                moan = "... " + getOrgasmMoan();
                ElementValue("InputChat", moan);
                ChatRoomSendChat();
                ChatRoomTargetMemberNumber = backupChatRoomTargetMemberNumber;
                ElementValue("InputChat", msg);
            }
        }
    }
}

function M_MOANER_reactionTrigger(data) {
    if (M_MOANER_isPlayerTarget(data)) {
        var msg = ElementValue("InputChat");
        if (M_MOANER_isSimpleChat(msg)) {
            M_MOANER_reactionVibeWithChat(data);
            M_MOANER_reactionSpankWithChat(data);
        } else {
            M_MOANER_reactionSpankWithoutChat(data);
            M_MOANER_reactionVibeWithoutChat(data);
        }
    }
}

function M_MOANER_reactionSpankWithChat(data) {
    if (M_MOANER_spankActive && M_MOANER_isSpank(data)) {
        //rÃƒÂ©cupÃƒÂ©rer le gÃƒÂ©missement ÃƒÂ  appliquer
        //datas pour gÃƒÂ©nÃƒÂ©ration des gÃƒÂ©missements
        var Factor = Math.floor(Player.ArousalSettings.Progress / 20);
        var moan = getSpankMoan(Factor, Math.random() * 300);
        var msg = ElementValue("InputChat");
        if (msg != "") {
            moan = msg + "... " + moan;
        }
        ElementValue("InputChat", moan);
        ChatRoomSendChat();
    }
}

function M_MOANER_reactionSpankWithoutChat(data) {
    if (M_MOANER_spankActive && M_MOANER_isSpank(data)) {
        //rÃƒÂ©cupÃƒÂ©rer le gÃƒÂ©missement ÃƒÂ  appliquer
        //datas pour gÃƒÂ©nÃƒÂ©ration des gÃƒÂ©missements
        var Factor = Math.floor(Player.ArousalSettings.Progress / 20);
        var moan = getSpankMoan(Factor, Math.random() * 300);
        var msg = ElementValue("InputChat");
        let backtarget = ChatRoomTargetMemberNumber;
        ChatRoomTargetMemberNumber = null;
        ElementValue("InputChat", moan);
        ChatRoomSendChat();
        ElementValue("InputChat", msg);
        ChatRoomTargetMemberNumber = backtarget;
    }
}

function M_MOANER_reactionVibeWithoutChat(data) {
    if (M_MOANER_vibratorActive && M_MOANER_isVibes(data)) {
        //rÃƒÂ©cupÃƒÂ©rer le gÃƒÂ©missement ÃƒÂ  appliquer
        //datas pour gÃƒÂ©nÃƒÂ©ration des gÃƒÂ©missements
        var Factor = Math.floor(Player.ArousalSettings.Progress / 20);
        var moan = getMoan(Factor, true, Math.random() * 300);
        var msg = ElementValue("InputChat");
        let backtarget = ChatRoomTargetMemberNumber;
        ChatRoomTargetMemberNumber = null;
        ElementValue("InputChat", moan);
        ChatRoomSendChat();
        ElementValue("InputChat", msg);
        ChatRoomTargetMemberNumber = backtarget;
    }
}

function M_MOANER_reactionVibeWithChat(data) {
    if (M_MOANER_vibratorActive && M_MOANER_isVibes(data)) {
        //rÃƒÂ©cupÃƒÂ©rer le gÃƒÂ©missement ÃƒÂ  appliquer
        //datas pour gÃƒÂ©nÃƒÂ©ration des gÃƒÂ©missements
        var Factor = Math.floor(Player.ArousalSettings.Progress / 20);
        var moan = getMoan(Factor, true, Math.random() * 300);
        var msg = ElementValue("InputChat");
        console.log("msg=" + msg);
        if (msg != "") {
            moan = msg + "... " + moan;
        }
        ElementValue("InputChat", moan);
        ChatRoomSendChat();
    }
}

function M_MOANER_isSpank(data) {
    var array = data.Dictionary;
    if (data.Content == "ActionActivitySpankItem") {
        return true;
    }
    for (index in array) {
        let elem = array[index];
        if (elem.Tag == "ActivityName") {
            if (elem.Text == "Spank" || elem.Text == "Slap") {
                return true;
            }
        }
    }
    return false;
}

function M_MOANER_isVibes(data) {
    if (data.Type == "Action" && data.Content.includes("Vibe")) {
        return true;
    }
    return false;
}

function M_MOANER_isPlayerTarget(data) {
    var array = data.Dictionary;
    for (index in array) {
        let elem = array[index];
        if ((elem.Tag == "DestinationCharacter" || elem.Tag == "TargetCharacter" || elem.Tag == "DestinationCharacterName") && elem.MemberNumber == Player.MemberNumber) {
            return true;
        }
    }
    return false;
}

function M_MOANER_applyMoanToMsg(C, CD) {
    //dÃƒÂ©terminer le nombre de gÃƒÂ©missements
    //calculer ÃƒÂ§a en fonction du nombre de mots
    //proportion: PROPORTION_MAX*niveauExcitation
    //PROPORTION_MAX=40%
    var proportion = C.ArousalSettings.Progress * PROPORTION_MAX / 10000;
    M_MOANER_logDebug("proportion: " + proportion);
    var CDList = CD.split(" ");

    var currentIndex = 0;
    var stop = false;
    var finalTextList = [];

    //rÃƒÂ©cupÃƒÂ©rer les gÃƒÂ©missements ÃƒÂ  appliquer
    //datas pour gÃƒÂ©nÃƒÂ©ration des gÃƒÂ©missements
    var Factor = Math.floor(C.ArousalSettings.Progress / 20);
    while (currentIndex < CDList.length) {
        //si le prochain mot contient une parenthÃƒÂ¨se, on arrÃƒÂ¨te la rÃƒÂ©partission des gÃƒÂ©missements)
        var currentWord = CDList[currentIndex++];
        var presenceParenthese = M_MOANER_detectParentheses(currentWord);
        if (presenceParenthese == 1) {
            stop = true;
        }
        if (stop) {
            finalTextList.push(currentWord);
        } else {
            let random = Math.ceil(Math.random() * 100)
            let result;
            if (random <= proportion * 100) {
                if (random % 2 == 0) {
                    result = currentWord + "..." + getMoan(Factor, true, CD.length);
                } else {
                    result = getMoan(Factor, true, CD.length) + " " + currentWord;
                }
                finalTextList.push(result);
            } else {
                finalTextList.push(currentWord);
            }
        }
        if (presenceParenthese == 2) {
            stop = false;
        }
    }
    return finalTextList.join(" ");
}

//return 1 if opening bracket, 2 of closing bracket, 0 otherwise
function M_MOANER_detectParentheses(CD) {
    if (!CD.includes("(") && !CD.includes(")")) {
        return 0;
    }
    for (i = CD.length; i >= 0; i--) {
        if (CD.charAt(i) == ")") {
            return 2;
        }
        if (CD.charAt(i) == "(") {
            return 1;
        }
    }
    return 0;
}

function transformText(isStimulated, L, ArouseFactor, CD) {
    if (isStimulated) {
        return CD.substring(0, L) + CD.charAt(L) + getMoan(ArouseFactor, isStimulated) + CD.substring(L, CD.length);
    } else {
        return CD.substring(0, L) + CD.charAt(L) + "-" + CD.substring(L, CD.length);
    }
}

function getMoan(Factor, isStimulated, seed) {
    //M_MOANER_logDebug("getMoan: factor="+Factor);
    //M_MOANER_logDebug("getMoan: isStimulated="+isStimulated);
    if (!isStimulated) return "";
    //sÃƒÂ©lectionner un gÃƒÂ©missement
    return " " + selectMoan(Factor, seed);
}

function getSpankMoan(Factor, seed) {
    let gemissement;
    //selon le niveau de fetichisme fessÃƒÂ©e
    let activity = getActivityTaste("Spank");
    if (activity == undefined) return "";
    let activityTaste = activity.Self;

    let seuilDouleur = Math.min(10, (4 - activityTaste) * 25);
    let seuilPlaisir = seuilDouleur + 40
    let douleur = Player.ArousalSettings.Progress <= seuilDouleur;
    let plaisir = Player.ArousalSettings.Progress > seuilPlaisir;
    if (douleur) {
        gemissement = getPainMoan();
    } else if (plaisir) {
        gemissement = "\u2665" + getMoan(Factor, true, 300) + "\u2665";
    } else {
        gemissement = getPainMoan() + "\u2665" + getMoan(Factor, true, 300) + "\u2665";
    }
    return gemissement;
}

function getZoneTaste(data) {
    let zone;
    let taste;
    for (index in data.Dictionary) {
        var elem = data.Dictionary[index];
        if (elem.Tag == "ActivityGroup") zone = getZone(elem.Text);
    }
    if (zone == undefined || zone == null || zone.Factor == undefined) {
        return undefined;
    }
    taste = zone.Factor;
    if (zone.Orgasm == true) {
        taste *= 2;
    }
    return taste;
}

function getZone(name) {
    for (index in Player.ArousalSettings.Activity) {
        var zone = Player.ArousalSettings.Zone[index];
        if (zone.Name == name) return zone;
    }
}

function getActivityTaste(name) {
    for (index in Player.ArousalSettings.Activity) {
        var activity = Player.ArousalSettings.Activity[index];
        if (activity.Name == name) return activity;
    }
}

function resetMoans(seed) {
    //M_MOANER_logDebug("resetMoans IN");

    factor1Moans = M_MOANER_shuffle(basefactor1Moans.concat([]), seed);
    M_MOANER_factor2Moans = M_MOANER_shuffle(factor1Moans.concat(baseM_MOANER_factor2Moans), seed);
    M_MOANER_factor3Moans = M_MOANER_shuffle(M_MOANER_factor2Moans.concat(baseM_MOANER_factor3Moans), seed);
    M_MOANER_factor4Moans = M_MOANER_shuffle(M_MOANER_factor3Moans.concat(baseM_MOANER_factor4Moans), seed);
    //M_MOANER_logDebug("resetMoans OUT");
}

function getPainMoanBACK() {
    let index = Math.floor(Math.random() * basePainMoans.length);
    return basePainMoans[index];
}

function resetMoans(seed) {
    //M_MOANER_logDebug("resetMoans IN");
    moanProfile = M_MOANER_getMoans(profileName);
    factor1Moans = M_MOANER_shuffle(moanProfile.low.concat([]), seed);
    M_MOANER_factor2Moans = M_MOANER_shuffle(factor1Moans.concat(moanProfile.light), seed);
    M_MOANER_factor3Moans = M_MOANER_shuffle(M_MOANER_factor2Moans.concat(moanProfile.medium), seed);
    M_MOANER_factor4Moans = M_MOANER_shuffle(M_MOANER_factor3Moans.concat(moanProfile.hot), seed);
    //M_MOANER_logDebug("resetMoans OUT");
}

function getPainMoan() {
    moanProfile = M_MOANER_getMoans(profileName);
    let index = Math.floor(Math.random() * moanProfile.pain.length);
    return moanProfile.pain[index];
}

function getOrgasmMoan() {
    var gemissement;

    if (M_MOANER_orgasmMoans.length == 0) {
        M_MOANER_logDebug("getOrgasmMoan: reset list");
        let seed = 3000;
        M_MOANER_logDebug("getOrgasmMoan: seed=" + seed);
        moanProfile = M_MOANER_getMoans(profileName);
        M_MOANER_orgasmMoans = M_MOANER_shuffle(moanProfile.orgasm.concat([]), seed);
    }
    gemissement = M_MOANER_orgasmMoans.shift();
    return gemissement;
}

function selectMoan(Factor, seed) {
    if (Factor < 2) {
        //M_MOANER_logDebug("factor1Moans.length="+factor1Moans.length);
        if (factor1Moans.length <= 0) {
            resetMoans(seed);
            return selectMoan(Factor, seed);
        } else {
            return factor1Moans.shift();
        }
    } else if (Factor < 3) {
        //M_MOANER_logDebug("M_MOANER_factor2Moans.length="+M_MOANER_factor2Moans.length);
        if (M_MOANER_factor2Moans.length <= 0) {
            resetMoans(seed);
            return selectMoan(Factor, seed);
        } else {
            return M_MOANER_factor2Moans.shift();
        }
    } else if (Factor < 4) {
        //M_MOANER_logDebug("M_MOANER_factor3Moans.length="+M_MOANER_factor3Moans.length);
        if (M_MOANER_factor3Moans.length <= 0) {
            resetMoans(seed);
            return selectMoan(Factor, seed);
        } else {
            return M_MOANER_factor3Moans.shift();
        }
    } else if (Factor >= 4) {
        //M_MOANER_logDebug("M_MOANER_factor4Moans.length="+M_MOANER_factor4Moans.length);
        if (M_MOANER_factor4Moans.length <= 0) {
            resetMoans(seed);
            return selectMoan(Factor, seed);
        } else {
            return M_MOANER_factor4Moans.shift();
        }
    }
}

function IsStimulated(C) {
    if (C.IsEgged() && ((C.ArousalSettings == null) || (C.ArousalSettings.AffectStutter == null) || (C.ArousalSettings.AffectStutter == "Vibration") || (C.ArousalSettings.AffectStutter == "All")))
        for (let A = 0; A < C.Appearance.length; A++) {
            var Item = C.Appearance[A];
            if (InventoryItemHasEffect(Item, "Vibrating", true))
                return true;
        }
    return false;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  MoanerProfiles
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 仅在被主人玩弄时启用
ownerOnly = {
    "hot": [],
    "medium": [],
    "light": [],
    "low": [],
    "orgasm": [],
    "pain": []
}

// 仅在被恋人玩弄时启用
loverOnly = {
    "hot": [],
    "medium": [],
    "light": [],
    "low": [],
    "orgasm": [],
    "pain": []
}

// 支配者方案（可手动切换）
domMoans = {
}

// 顺从着方案（可手动切换）
subMoans = {

}

// RBQ 方案 ~  
RBQ_Moans = {

}

// 给果果的
honokaMoans = {
    "hot": [],
    "medium": [],
    "light": [],
    "low": [],
    "orgasm": [],
    "pain": ["坏果子...", "笨蛋...!", "果子是绒布球...", "哼...绒布球也来欺负猫了...", "给你一猫爪...", "果子狗...猫不会屈服的！"]
}
M_MOANER_addMoansProfile("honoka", honokaMoans);

// 暴躁紫猫版
vnekoMoans = {
    "hot": [],
    "medium": [],
    "light": [],
    "low": [],
    "orgasm": ["喵...喵...喵啊❤", "嗯啊...嗯嗯❤...", "啊... 嗯... 嗯嗯❤ ... 呼~", "嗯喵... 嗯嗯... 喵❤", "阿巴阿巴❤"],
    "pain": ["啊哈？", "再打猫咬你哦", "变态!", "给你一猫爪...", "喵呜(炸毛)！", "呜...喵...", "笨蛋...没吃小鱼干吗？", "这可是很疼的...", "喵！...不要拿猫发泄啊！"]
}
M_MOANER_addMoansProfile("vneko", vnekoMoans);

// 温顺蓝猫版
nekonyaMoans = {
    "hot": ["嗯... 喵呜♥", "咕噜咕噜~", "嗯~呼~!", "喵❤~~~"],
    "medium": ["姆", "啊❤", "喵啊❤"],
    "light": ["唔姆❤", "啊啊❤", "嗯", "喵~", "唔啊❤"],
    "low": ["啊", "❤唔啊❤", "嗯嗯", "...♥"],
    "orgasm": ["喵...喵...喵啊❤!", "嗯啊...嗯嗯❤... 喵嗯❤...", "啊... 嗯... 嗯嗯❤ ... 呼~!", "嗯喵... 嗯嗯... 喵❤~!"],
    "pain": ["喵呜!!!", "再打猫就咬你了!", "呲咝!", "呜噜噜噜噜~", "喵>.<"]
}
M_MOANER_addMoansProfile("nekonya", nekonyaMoans);


//dog
EN_M_MOANER_dogMoans = {
    "hot": ["w... Wouuuf\u2665", "aouuh\u2665"],
    "medium": ["waaaf\u2665", "ky\u016b\u016b\n", "..wouf"],
    "light": ["Ouaff\u2665", "Aouh!", "Oua\u2665af", "Ky\u016bn\u2665"],
    "low": ["wou..", "ouah\u2665", "Wouf\u2665", "\u2665ky\u016bn\u2665", "ky\u016b\u2665"],
    "orgasm": ["ouaf\u2665 O... Ouuw... Ouaaaa!!", "Mmmhnn... aaaa... Ouuuaaaaaf!!", "mmmh... Aouuuh.... Aouhhhh!"],
    "pain": ["Ka\u00ef!", "Aoouch!", "Kaaa\u00ef!", "Ouch", "Aow"]
}
M_MOANER_addMoansProfile("ENDog", EN_M_MOANER_dogMoans);

//fox
//base: wif, yif, aouh
//thanks to Noriko
EN_M_MOANER_foxMoans = {
    "hot": ["w... Wiiif\u2665", "Yiiif\u2665"],
    "medium": ["wiiif\u2665", "Yiii", "..yif"],
    "light": ["Wiff\u2665", "Yif!", "yi\u2665iif", "Wiif"],
    "low": ["wif", "Wy\u2665", "if\u2665", "\u2665yi\u2665", "Yi\u2665"],
    "orgasm": ["Wiff\u2665 W... Wiii... WIIF!!", "Mmmhnn... Wiiif... Yiiiif!!", "mmmh... Aouuuh.... Aouhhhh!"],
    "pain": []
}
M_MOANER_addMoansProfile("ENFox", EN_M_MOANER_foxMoans);

//mouse
//base coui
EN_M_MOANER_mouseMoans = {
    "hot": ["Scouiiic\u2665", "couiiic\u2665"],
    "medium": ["scouiii\u2665", "Couyk", "..scoui"],
    "light": ["Scouii\u2665", "Coui!", "kouu\u2665ic", "Couic \u2665"],
    "low": ["coui..", "scoui\u2665", "cou\u2665i", "Couic ", "koui\u2665"],
    "orgasm": ["Couic\u2665 sc.. couIIIiic!!", "Mmmhnn... ooo... ouiiiic!!", "mmmh... Scouuu.... Scouiiic!"],
    "pain": []
}
M_MOANER_addMoansProfile("ENMouse", EN_M_MOANER_mouseMoans);

//neko
EN_M_MOANER_nekoMoans = {
    "hot": ["n... Nyah\u2665", "NYyaaA\u2665"],
    "medium": ["nyAh\u2665", "nyyy", "..yah"],
    "light": ["nyah\u2665", "Yah!", "myuh", "mh\u2665"],
    "low": ["myu", "ny\u2665", "mh", "\u2665yh\u2665", "ny\u2665"],
    "orgasm": ["Nya...Ny...NyaaAAaah!", "Mmmhnn... Nyhmm... Nyah!", "mmmh... mmmeeeee.... meeeoooow!"],
    "pain": []
}
M_MOANER_addMoansProfile("ENNeko", EN_M_MOANER_nekoMoans);

//pig
EN_M_MOANER_pigMoans = {
    "hot": ["Gruiik\u2665", "gruik\u2665"],
    "medium": ["gruiii\u2665", "Gruik", "..Grui.."],
    "light": ["Grui\u2665", "Gruik!", "gruuiii\u2665ic", "gruik \u2665"],
    "low": ["grui.. gruiik\u2665", "gruiik\u2665", "gru\u2665i", "Gruik ", "Groi\u2665"],
    "orgasm": ["Gru\u2665 gr.. gruiIIIiick!!", "Mmmhnn... uii... gruiiik!!", "mmmh... Gruiik.... Gruiiiiik!"],
    "pain": ["Gruuik!!", "Aoouch!", "Awo... gruik!", "Ouch", "Gruiiik"]
}
M_MOANER_addMoansProfile("ENPig", EN_M_MOANER_pigMoans);

//wildFox
EN_M_MOANER_wildFoxMoans = {
    "hot": ["w... Wiiif\u2665", "Yiiif\u2665", "Wa\u2665ouu"],
    "medium": ["wiiif\u2665", "Yiii", "..yif", "waouuu"],
    "light": ["Wiff\u2665", "Yif!", "yi\u2665iif", "Wiif", "waou"],
    "low": ["wif", "Wy\u2665", "if\u2665", "\u2665yi\u2665", "Yi\u2665", "aou"],
    "orgasm": ["WAAAAOUUUUUUUHHHHH!", "Mmmhnn... Wiiif... Yiiiif!!", "AOUUUUUH!", "WAHOOOOOOOUUUUH!", "WAAAAAAAAHH!", "WAAAAOUUUUUUUHHHHH!", "AOUUUUUH!", "WAHOOOOOOOUUUUH!", "WAAAAAAAAHH!"],
    "pain": []
}
M_MOANER_addMoansProfile("ENWildFox", EN_M_MOANER_wildFoxMoans);


function sendLocalMessage(content) {
    ChatRoomMessage({
        Content: content,
        Type: "LocalMessage",
        Sender: Player.MemberNumber
    });
    document.querySelector('#TextAreaChatLog').lastChild.style.color = 'silver';
}

function findCharacterInRoom(name) {
    if (!isNaN(name)) {
        var target = ChatRoomCharacter.find(c => c.MemberNumber == name);
    } else if (typeof name == 'string') {
        var target = ChatRoomCharacter.find(c => c.Name.toLowerCase() == name.toLowerCase());
    }
    return target;
}

function sendHiddenMessageTarget(message, MemberNumber) {
    ServerSend("ChatRoomChat", {
        Content: message,
        Type: "Hidden",
        Target: MemberNumber
    });
}

function sendHiddenMessageAll(message) {
    ServerSend("ChatRoomChat", {
        Content: message,
        Type: "Hidden"
    });
}


function getCommand(commandName) {
    for (const cmd of ChatCommands) {
        if (cmd.name == commandName) {
            var command = cmd;
        } else if (cmd.aliases && cmd.aliases.includes(commandName)) {
            var command = cmd;
        }
    }
    return command;
}


