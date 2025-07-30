# 羽球臨打自動排場助手 (桌面應用程式版)
Badminton Queue Assistant is a desktop application designed to support organizers of amateur badminton sessions in efficiently managing player rotations. The tool automatically tracks each participant’s game count and determines optimal player selection for upcoming matches, with the objectives of ensuring equitable play opportunities and minimizing consecutive games for any individual. This system promotes fairness by balancing playtime among all attendees while allowing sufficient rest periods between matches.

「羽球臨打自動排場助手」是一個網頁應用程式，旨在幫助業餘羽球活動的主辦者臨打球賽的排場輪換。該工具會自動追踪每位參與者的上場次數，並自動選擇下一場的球員組合，以確保公平的上場機會並盡量減少連續上場。該系統通過平衡所有參與者的比賽時間，同時允許在比賽之間有足夠的休息時間，來促進公平性。

## 支援平台
Windows 10以上 (Spported by Windows 10 and up) 

## 1. 主要功能 Key Features
- Works without internet connection
- Upload/Save a player list with name and skill level
- Visual indication of player's skill level by color
- Keep track on players' payment status
- Automatical rotation based on game count to ensure equitable play opportunities
- Support manual rotation if needed

- 不須連接網際網路
- 可上傳/儲存球員名單(包含姓名和程度)
- 以顏色標示球員的程度
- 追踪臨打參與者的付款狀態
- 根據上場次數自動排場，確保公平的比賽機會
- 需要時可手動排場

## 2. 如何安裝 How to install
1. Download the ZIP file from release
2. Extract the ZIP to a folder on your device

- 下載已發佈的ZIP檔案
- 將ZIP檔案解壓縮到您電腦上的文件夾中

## 3. 設定新球局 Start a new session
1. Run **Queue_Assistant_Badminton.exe**
2. Click **Upload list** and select **participants.json** in the installed folder.
3. Click **+** button to add new participant. Fill in name and skill level, and click **Add** button to add the new participant to the list.
4. Check the signed-up players from the list and click **>** to copy the list to **Signed-up list**
5. Click the **$** icon of each player to mark their payment status
6. Click **Save** buttons to save **All player list** to overwrite the **participants.json** file or save as a different file in the installed foler (Optional), which can be reused for the next session.
7. Click **Confirm** to launch the main page in which Signed-up player list is automatically loaded to the **Bench Area**
8. Drag-and-drop the 1st set of four players into **Next Up** area, and click **End Game** button to move them to an empty court in **Ongoing Area**. Repeat the process until all courts are filled with players

- 執行 **Queue_Assistant_Badminton.exe**
- 點擊 **上傳名單** 並選擇安裝文件夾中的 **participants.json**
- 按 **+** 號可新增球員，輸入姓名及程度後按 **新增** 即可加入名單
<img src="https://github.com/sweifang/badminton-queue-assistant/blob/main/assets/3.JPG?raw=true" alt="add_participant" width="300">

- 從列表中勾選已報名的球員，然後點擊 **>** 將名單複製到 **本次參與者**
- 點擊每位球員的 **$** 圖示以標記其付款狀態
- 點擊 **儲存** 按鈕以下載 **所有參與者名單** 來覆寫安裝文件夾中的**participants.json**或另存新檔，方便下次直接載入使用
<img src="https://github.com/sweifang/badminton-queue-assistant/blob/main/assets/1.JPG?raw=true" alt="add_participant" width="500">

- 點擊 **確認** 以啟動主頁面，**本次參與者名單** 會自動載入到 **板凳區**
- 將第一組四名球員拖放到 **即將上場** 區域，然後點擊 **終場** 按鈕將他們移動到 **進行中** 區域的空球場。重複此流程，直到所有球場都滿員
<img src="https://github.com/sweifang/badminton-queue-assistant/blob/main/assets/2.JPG?raw=true" alt="add_participant" width="500">

## 4. 自動排場 Auto rotation
- After a game is finished, click "End Game" button to trigger the rotation
- Players in **Next Up** area will be moved to **Ongoing Area**
- Players with low game count in **Bench Area** will be moved to **Next Up**

- 比賽結束後，點擊 **終場** 按鈕進行自動排場
- **即將上場** 區域的球員將被移動到 **進行中** 區域
- **板凳區** 中比賽次數較少的球員將被移動到 **即將上場**

## 5. 手動排場 Manual rotation
- Organizer may manual drag the player block and drop it on a player block in other arear for a quick swap if needed
- Game count prioritization is omitted in the event of manual rotation

- 如果需要，主辦者可以手動拖動球員方塊並將其放到其他區域的球員方塊上將他們互換
- 在手動輪換將無視比賽次數的優先順序
