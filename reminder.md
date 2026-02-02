Slack Reminder Cheat Sheet

Slackのリマインダー機能（/remind）のコマンドまとめです。コピペして使ってください。

🔔 基本・自分用

最もよく使う形です。自分宛てに通知を送ります。

基本の形

最も汎用的な形式です。

構文: /remind me [内容] [いつ]

使用例: /remind me 提出期限です in 30 minutes

Tip: 「me」の部分は省略しても自分宛てになりますが、明示的に書くのが確実です。

指定した時間に (at)

特定の時刻に通知したい場合に使います。

構文: /remind me [内容] at [時刻]

使用例: /remind me お昼休憩 at 12:00

Tip: 12:00 や 1pm のように指定できます。

指定した時間後に (in)

「今から○分後」「○時間後」に通知したい場合に使います。

構文: /remind me [内容] in [時間]

使用例: /remind me カップ麺できたよ in 3 minutes

Tip: minutes, hours, days などが使えます。

日付を指定 (on)

特定の日付に通知したい場合に使います。

構文: /remind me [内容] on [日付]

使用例: /remind me 免許更新 on 12/20

Tip: MM/DD の形式が認識されやすいです。

👥 他人・チャンネルへ

自分以外の人やチーム全体にリマインダーを設定します。

特定のメンバーに送る

同僚などにリマインダーを設定します。

構文: /remind @[ユーザー名] [内容] [いつ]

使用例: /remind @sato 会議の時間です in 5 minutes

Tip: 相手のSlack上のユーザーID（@から始まる名前）を使います。

チャンネルに送る

チャンネル全体にリマインダーを送り、Botとして投稿させます。

構文: /remind #[チャンネル名] [内容] [いつ]

使用例: /remind #project-a 定例ミーティング開始 at 10:00

Tip: チャンネルのメンバー全員に通知がいきます。

📅 繰り返し

定期的なタスクや習慣化したいことに使います。

毎日 (every day)

毎日同じ時間にリマインドします。

構文: /remind me [内容] every day at [時刻]

使用例: /remind me 日報を書く every day at 17:30

平日のみ (every weekday)

土日を除く、月〜金曜日にリマインドします。業務連絡に最適です。

構文: /remind me [内容] every weekday at [時刻]

使用例: /remind me 始業打刻 every weekday at 9:00

特定の曜日 (every Monday...)

毎週決まった曜日にリマインドします。

構文: /remind me [内容] every [曜日] at [時刻]

使用例: /remind #general ゴミ捨て当番 every Tuesday at 8:50

Tip: 曜日は英語で指定します (Monday, Tuesday, Wednesday...)

隔週など (every 2 weeks)

一定の間隔でリマインドします。

構文: /remind me [内容] every 2 weeks

使用例: /remind me 通院の日 every 2 weeks at 9:00

Tip: weeks の部分を days や months に変更可能です。

🛠 管理・削除

リマインダーの一覧を表示

現在設定されている未完了のリマインダーを一覧表示します。

コマンド: /remind list

Tip: このリストから、「完了」にしたり「削除」したりできます。

ヘルプを表示

Slack公式のヘルプメッセージを表示します。

コマンド: /remind help

✅ 覚えておくと便利なポイント

コマンドは /remind ですが、 /reminder でも機能します。

時間の指定は英語（at, in, on, every）を使うのが最も誤動作が少なく安全です。

作成したリマインダーはSlackbotとのDM（ダイレクトメッセージ）画面で通知されます。