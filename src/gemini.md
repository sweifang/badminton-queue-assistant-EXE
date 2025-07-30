# Functional Requirement Document
## for Badmintion Queue Assistant
### 1. Description
Badminton Queue Assistant is a web-based application designed to support organizers of amateur badminton sessions in efficiently managing player rotations. The tool automatically tracks each participant’s game count and determines optimal player selection for upcoming matches, with the objectives of ensuring equitable play opportunities and minimizing consecutive games for any individual. This system promotes fairness by balancing playtime among all attendees while allowing sufficient rest periods between matches.

### 2. Prerequisite
* The application is designed with HTML, CSS and JavaScript.
* Resources for Assets: 
  * Pexels for images: [pexels.com](pexels.com)
  * Google Fonts for font faces: [fonts.google.com](fonts.google.com)
  * Iconify for logo and icons: [iconify.design](iconify.design)
  * Placeholder.co for placeholders: [placehold.co](placehold.co)
  * Use Bootstrap 5 for responsive layouts 
  * Use JQuery for interactive components
  * Output: Seperate HTML, CSS (inline), and JavaScript into individual file
* The application is designed exclusively for doubles games.
* Each ongoing game consists of exactly four players.
* The number of courts supported ranges from 1 to 4.
* The maximum number of participants allowed is four times the number of available courts.

### 3. Visual Styling
Design a modern, dark-themed UI for a form-based web interface. The styling should emphasize clarity, accessibility, and a polished, professional look with soft, tactile elements. Follow the guidlines below if applicable.

#### 3.1 Layout & Structure
- **Grid-based layout** with ample spacing between components.    
- Balanced use of horizontal and vertical alignments.    
- Clearly separated panels or card sections for logical grouping.    

#### 3.2 Background & Containers
- **Background color:** Deep charcoal gray (#23242b or similar).    
- **Card/container backgrounds:** Slightly lighter gray, maintaining a sense of layering.    
- **Subtle inner shadows** to differentiate input fields and cards from the background.    

#### 3.3  Input Fields, Dropdowns & Controls

- **Background:** Slightly lighter gray than the main background, maintaining contrast.    
- **Borders:** Thin (1-2px), high-contrast borders in blue (#256eff) or dark gray for focus states; subtle gray when idle.    
- **Rounded corners:** High radius (8-12px) for a pill or soft rectangular look.    
- **Focus effect:** Bright blue glow or border (outer or inner shadow).    
- **Placeholder text:** Light gray or muted white.    
- **Entered text:** Bright white for strong visibility.    
- **Dropdown menus:** Elevated with shadow, dark background, strong hover highlights (subtle blue/gray).    

#### 3.4 Steppers & Switches
- **Stepper buttons:** Rounded squares, filled with gray background and high-contrast numbers, blue border or glow on focus.    
- **Toggles/switches:** Pill-shaped with thumb. Active state in vivid blue, inactive in gray. Smooth transitioning for state changes.    

#### 3.5 Checkboxes & Radio Buttons
- **Checkboxes:** Square with high border radius, filled with blue on checked.    
- **Radio buttons:** Circular, with blue fill on selection, unfilled states in gray.    

#### 3.6 Buttons
- **Primary action (e.g., “Confirm”):**    
    - **Background:** Vivid, saturated blue (#256eff).        
    - **Text:** Bright white.        
    - **Rounded corners:** 10-14px for approachability.        
    - **Shadow:** Soft, slight drop shadow for elevation.        
    - **Hover/Active:** Slightly brighter or darker blue, glow effect.        
- **Secondary buttons:** Dark background, white text, border on focus.    

#### 3.7 Tags & Chips
- **Backgrounds:** Green or orange for color-coded tags. Subtle textural difference to differentiate types.    
- **Text:** White or highly contrasting.    
- **Icons for removal:** Light gray/white, simple “X”, rounded chip corners.
    
#### 3.8 Typography

|Element|Font Style|Color|Weight|
|---|---|---|---|
|Labels|Sans-serif, 15-16px|Muted gray|Regular|
|Input text|Sans-serif, 16px|Bright white|Medium|
|Placeholder text|Sans-serif, 16px italic|Light gray|Regular|
|Button text|Sans-serif, 16px|White|Medium/semibold|
|Tag/Chip text|Sans-serif, 14px|White|Medium|

- **Font:** Modern geometric sans-serif (e.g., Inter, SF Pro, Roboto).
    

#### 3.9 Effects
- **Shadows:** Subtle elevation on dropdowns, cards, and focused fields (soft, diffuse black).    
- **Glows:** Blue glow for focus states on inputs and buttons, visually indicating active elements.    
- **Transitions:** Smooth (150–250ms) ease-in-out for interactive feedback.    

#### 3.10 Iconography & Profile Elements
- **User profile:** Circular avatar with subtle shadow.    
- **Icons:** Simple, flat, monochromatic (gray/white).    

#### 3.11 Additional UI Details

- **Slider:** Modern, minimal rail with blue active section.    
- **Night/Day Switch:** Clearly indicates “Dark” or “Light” mode with icon and contrasting fill.    
- **Consistency:** All corners highly rounded, color contrasts optimized for accessibility, strong focus indicators, uniform spacing.

### 4. UI Elements

#### 4.1 Player Block

- Each player is represented as a rounded-corner rectangular block ("**player block**").
- The player block displays the following information:
  - **Current Game Count**: Shown as a bold number, positioned before the player's name.
  - **Player's Name**: Displayed in either English or Traditional Chinese.
  - **Skill Level**: Indicated by the background color of the block:
    - **Red:** Expert
    - **Orange:** Advanced
    - **Blue:** Intermediate
    - **Green:** Entry

#### 4.2 Court Block

- Each ongoing game is displayed as a rectangular block simulating a top view of a badminton court ("**court block**").
- A center line divides the court block to indicate two sides. On top of the block is the label of the court, such as **球場1** and **球場2** for example.
- Two player blocks are positioned on each side of the court, representing the four players participating in the game.
- The size of court block shall be large enought to contain the four player blocks.

### 5. Data Files (JSON)
#### 5.1 Participant List
- A participant list, named `participants.json`, is stored in the project directory.
- This file stores a list of all individuals who have ever joined.
- Each participant is a JSON object with the following structure:
  ```json
  {
    "name": "player's name",
    "skill": "Expert"
  }
  ```

#### 5.2 Signed-up List
- A list of participants for the current session, named `signed-up.json`, is stored in the project directory.
- This file is overwritten each time a new session is started.
- The structure of each participant object is similar to `participants.json` but with additional session-specific fields:
  ```json
  {
    "name": "player's name",
    "skill": "Expert",
    "games_played": 0,
    "paid": false
  }
  ```

### 6. Session Setting Page (HTML)

- The session setting page is an HTML file titled **"新局設定"**.
- This is the first page displayed when initializing a new session after launching the application.
- The session setting page includes the following settings:
  - **Number of Courts**: Set via a drop-down menu (range: 1 to 4).
  - **所有參與者** (All Participants): Lists all participants. This list is loaded by selecting the `participants.json` file via a file input button. Each participant is represented as a player block (as defined in Section 3.1) with a checkbox to the left. The organizer checks the box if the participant is signing up for this session.
  - **本次參與者** (Signed-up Participants): Displays the participants currently signed up for this session. This list is initially empty.

#### 6.1 Add New Participants

- A **plus icon** is located at the corner of the "所有參與者" column, allowing the organizer to add a new participant.
- Clicking the plus icon opens a window with the following fields:
  - **姓名** (Name): Input field for the participant’s name (English or Traditional Chinese).
  - **程度** (Skill Level): Drop-down list with four skill levels, each indicated by both text and color as defined in Section 3.1.
- A "**新增**" (Add) button at the bottom of the window saves the new participant, closes the window, and updates the "所有參與者" column.

#### 6.2 Select Participants for This Session

- To select participants for the current session, the organizer checks the player blocks in the "所有參與者" column.
- Clicking the **Arrow Button** (pointing from "所有參與者" to "本次參與者") between the two columns copies the selected player blocks to the "本次參與者" column.

#### 6.3 Remove Participants from "本次參與者" Column

- A **minus icon** is placed in front of each player block in the "本次參與者" column.
- Clicking the minus icon removes the corresponding player block from the "本次參與者" list.

#### 6.4 Mark the Payment Status

- All participants signed up for the current session are expected to pay the organizer. This function allows the organizer to track payment status.
- A **dollar sign** appears after each player block. The dollar sign is **grey** by default, indicating "unpaid" status.
- Clicking the dollar sign changes its color to **pink**, marking a "paid" status.

#### 6.5 Complete Session Setting

- After completing all settings, the page can be closed by clicking the "**確認**" (Confirm) button at the bottom of the page.
- The "**確認**" button is prominently displayed, centered on the page, with increased size for clarity.
- The participants in the "本次參與者" column will convert into a JSON file according to the format of `signed-up.json` for download.
- The participants in the "所有參與者" column will convert into a JSON file according to the format of `participants.json` for download.
- The approach to transfer the participants in the "本次參與者" column to the main page (as described in Section 7)is as follows,
  - The JavaScript converts the participants in the number of courts and the "本次參與者" column into a JSON string.
  - This JSON string is stored in the browser's **sessionStorage** under a specific key, for example, 'sessionData'.
  - After storing the data, the script will then redirect the user to the new main application page (e.g., main.html).

Certainly! Here is the refined version of your content in markdown format:

### 7. Main Page (HTML)

#### 7.1 Load Signed-up Participants for Current Session

- Upon loading, the page’s JavaScript checks `sessionStorage` for the key `'sessionData'`.
- It retrieves the JSON string stored there and parses it into a JavaScript array using `JSON.parse()`.
- Signed-up participants are displayed as player blocks that can be drag-and-dropped across different areas.
- Court blocks are rendered according to the number of courts, as described in Section 4.2.

#### 7.2 Layout

- The main page is divided into four areas:
  - **進行中** (Ongoing Games)
  - **即將上場** (Next Up)
  - **板凳區** (Bench Area)
  - **未到區** (Not Arrived)
- Proper padding shall be added to "Next Up", "Bench Area", and "Not Arrived" to ensure proper gap between areas, especially in mobile view.

#### 7.3 "進行中" Area

- **Title:** 進行中  
- This area displays court blocks representing ongoing games and the player blocks assigned to each court.
- Depending on the configured number of courts (1 to 4), 1 to 4 court blocks are shown.
- Each court block has a **終場** ("Next Game") button positioned outside and below the court block, center-aligned horizontally.
- Court blocks are initially empty of player blocks.
- Up to four player blocks can be drag-and-dropped into a court block from other court blocks or areas.

#### 7.4 "即將上場" Area

- **Title:** 即將上場  
- This area displays up to four player blocks that are next in line to play.
- The area is initially empty.
- Player blocks can be drag-and-dropped into this area.

#### 7.5 "板凳區" Area

- **Title:** 板凳區  
- Initially, player blocks are placed in the "板凳區" area 
- Player blocks can be drag-and-dropped into this area.

#### 7.6 "未到區" Area
- **Title:** 未到區 
- This area is for the players who signed-up but hasn't showed up.
- The signed-up player blocks were initially placed in "板凳區" Area. The organizer may drag-and-drop those player blocks who hasn't showed up to "未到區" Area.
- Players blocks in "未到區" area are excluded from the automatic rotation until they are manually moved back to the "未到區" area.

### 8. Rule of Rotation

#### 8.1 Automatic Rotation

- Rotation is triggered when a **"終場"** (End Game) button is clicked, initiating the following sequence of actions:

  - The four player blocks currently assigned to the corresponding court block are moved to the **"板凳區"** (Bench Area), and each player’s game count is incremented by one.
  
  - These player blocks are marked as being in a **"resting"** state, indicated by a change in their background color to grey.  
    - Player blocks in the "resting" state are excluded from selection during rotation until the **next** click of a "終場" button.  
    - Upon that next click, their "resting" status is cleared, and their background color reverts to reflect their skill level.
  
  - The player blocks currently in the **"即將上場"** (Next Up) area are moved to fill the now-vacant court block within the **"進行中"** (Ongoing Games) area.
  
  - The system then selects the next set of player blocks from the "板凳區" to move into the "即將上場" area for upcoming matches, applying these rules:
  
    1. Player blocks marked as "resting" are **excluded** from selection until their resting status is cleared.
    
    2. All eligible player blocks are sorted in ascending order by game count.
    
    3. The four player blocks with the lowest game counts are prioritized.
    
    4. If more than four players share the lowest game count, four are randomly selected among them.
    
    5. If the selected combination is identical to their most recent previous game, at least two players must be replaced with the next available candidate from the sorted list to ensure variety in team composition.

    6. If fewer than four eligible players are available, the remaining spots will be filled by selecting players from the "resting" pool, starting with those who have the lowest game count. Their "resting" status is cleared upon selection.
    
    7. Once finalized, the selected four player blocks are moved from the "板凳區" area to the "即將上場" area in preparation for the next match.

#### 8.2 Manual Adjustment

- Manual adjustment is initiated by dragging a player block and moving it to another area, optionally replacing another player block.
- Manual adjustments override the automatic rotation rules.
- If a player block marked as "resting" is manually moved, its "resting" status is immediately cleared.
- Automatic rotation resumes after the next click of the **"終場"** (End Game) button.
