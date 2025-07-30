document.addEventListener('DOMContentLoaded', () => {
    const { dialog, fs, window: tauriWindow } = window.__TAURI__;

    let allParticipants = [];
    let sessionParticipants = [];

    const loadParticipantsBtn = document.getElementById('load-participants-btn');
    const selectAllBtn = document.getElementById('select-all-btn');
    const addParticipantBtn = document.getElementById('add-participant-btn');
    const saveParticipantBtn = document.getElementById('save-participant-btn');
    const moveToSessionBtn = document.getElementById('move-to-session-btn');
    const sessionParticipantsContainer = document.getElementById('session-participants');
    const confirmBtn = document.getElementById('confirm-btn');
    const downloadSignedUpBtn = document.getElementById('download-signed-up-btn');
    const downloadParticipantsBtn = document.getElementById('download-participants-btn');

    if (loadParticipantsBtn) {
        loadParticipantsBtn.addEventListener('click', async () => {
            try {
                const selected = await dialog.open({
                    multiple: false,
                    filters: [{
                        name: 'JSON',
                        extensions: ['json']
                    }]
                });
                if (selected) {
                    const contents = await fs.readTextFile(selected);
                    allParticipants = JSON.parse(contents);
                    renderAllParticipants();
                    selectAllBtn.classList.remove('d-none');
                }
            } catch (err) {
                console.error("Error loading participants:", err);
            }
        });
    }

    if (selectAllBtn) {
        selectAllBtn.addEventListener('click', () => {
            document.querySelectorAll('#all-participants input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = true;
            });
        });
    }

    if (addParticipantBtn) {
        addParticipantBtn.addEventListener('click', () => {
            const modal = new bootstrap.Modal(document.getElementById('add-participant-modal'));
            modal.show();
        });
    }

    function renderAllParticipants() {
        const list = document.getElementById('all-participants');
        list.innerHTML = '';
        allParticipants.forEach((p, index) => {
            const block = createPlayerBlock(p, index, false);
            list.insertAdjacentHTML('beforeend', block);
        });
    }

    function renderSessionParticipants() {
        const list = document.getElementById('session-participants');
        list.innerHTML = '';
        sessionParticipants.forEach((p, index) => {
            const block = createPlayerBlock(p, index, true);
            list.insertAdjacentHTML('beforeend', block);
        });
    }

    function createPlayerBlock(player, index, inSession) {
        const checkbox = inSession ? '' : `<input type="checkbox" class="form-check-input" data-index="${index}">`;
        const removeIcon = inSession ? `<img src="assets/minus.svg" class="action-icon remove-icon" data-index="${index}">` : '';
        const dollarIcon = player.paid ? 'assets/dollar_sign_pink.svg' : 'assets/dollar_sign_grey.svg';
        const dollarSign = inSession ? `<img src="${dollarIcon}" class="action-icon dollar-sign" data-index="${index}">` : '';

        return `
            <div class="participant-row">
                ${checkbox}
                ${removeIcon}
                <div class="player-block ${player.skill}">
                    <span class="game-count">${player.games_played || 0}</span>
                    <span class="player-name">${player.name}</span>
                </div>
                <div class="actions">
                    ${dollarSign}
                </div>
            </div>
        `;
    }

    if (saveParticipantBtn) {
        saveParticipantBtn.addEventListener('click', () => {
            const name = document.getElementById('participant-name').value;
            const skill = document.getElementById('skill-level').value;
            if (name && skill) {
                allParticipants.push({ name, skill, games_played: 0, paid: false });
                renderAllParticipants();
                document.getElementById('participant-name').value = '';
                document.getElementById('skill-level').value = 'Expert';
                const modal = bootstrap.Modal.getInstance(document.getElementById('add-participant-modal'));
                modal.hide();
            }
        });
    }

    if (moveToSessionBtn) {
        moveToSessionBtn.addEventListener('click', () => {
            document.querySelectorAll('#all-participants input:checked').forEach(checkbox => {
                const index = checkbox.dataset.index;
                const participant = allParticipants[index];
                if (!sessionParticipants.some(p => p.name === participant.name)) {
                    sessionParticipants.push({ ...participant });
                }
            });
            renderSessionParticipants();
        });
    }

    if (sessionParticipantsContainer) {
        sessionParticipantsContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('remove-icon')) {
                const index = event.target.dataset.index;
                sessionParticipants.splice(index, 1);
                renderSessionParticipants();
            }
            if (event.target.classList.contains('dollar-sign')) {
                const index = event.target.dataset.index;
                sessionParticipants[index].paid = !sessionParticipants[index].paid;
                renderSessionParticipants();
            }
        });
    }

    if (confirmBtn) {
        confirmBtn.addEventListener('click', function() {
            const numCourts = document.getElementById('courts-select').value;

            const sessionData = {
                numCourts: parseInt(numCourts, 10),
                participants: sessionParticipants
            };

            localStorage.setItem('sessionData', JSON.stringify(sessionData));

            const webview = new tauriWindow.WebviewWindow('secondary', {
                url: 'main.html',
                width: 900,
                height: 900,
                title: '羽球臨打自動排場助手 V1.0'
            });

            webview.once('tauri://created', function () {
                // webview window successfully created
            });
            webview.once('tauri://error', function (e) {
                // an error occurred during webview window creation
                console.error(e);
            });
        });
    }

    if (downloadSignedUpBtn) {
        downloadSignedUpBtn.addEventListener('click', async () => {
            try {
                const filePath = await dialog.save({
                    defaultPath: 'signed-up.json',
                    filters: [{
                        name: 'JSON',
                        extensions: ['json']
                    }]
                });
                if (filePath) {
                    const signedUpData = JSON.stringify(sessionParticipants, null, 2);
                    await fs.writeTextFile(filePath, signedUpData);
                }
            } catch (err) {
                console.error("Error saving signed-up participants:", err);
            }
        });
    }

    if (downloadParticipantsBtn) {
        downloadParticipantsBtn.addEventListener('click', async () => {
            try {
                const filePath = await dialog.save({
                    defaultPath: 'participants.json',
                    filters: [{
                        name: 'JSON',
                        extensions: ['json']
                    }]
                });
                if (filePath) {
                    const allParticipantsData = JSON.stringify(allParticipants.map(p => ({name: p.name, skill: p.skill})), null, 2);
                    await fs.writeTextFile(filePath, allParticipantsData);
                }
            } catch (err) {
                console.error("Error saving all participants:", err);
            }
        });
    }
});