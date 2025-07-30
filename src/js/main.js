$(document).ready(function() {
    const sessionDataString = localStorage.getItem('sessionData');
    if (!sessionDataString) {
        return;
    }
    const { numCourts, participants } = JSON.parse(sessionDataString);

    const courtsContainer = $('#courts-container');
    const nextUpContainer = $('#next-up-players');
    const benchPlayersContainer = $('#bench-players');

    function initialize() {
        for (let i = 1; i <= numCourts; i++) {
            courtsContainer.append(createCourtBlock(`球場 ${i}`, `court-${i}`, true));
        }
        nextUpContainer.append(createCourtBlock(null, 'next-up-court', false));
        participants.forEach(player => {
            benchPlayersContainer.append(createPlayerBlock(player));
        });
        addDragAndDropListeners();
    }

    function createCourtBlock(title, id, showButton) {
        return `
            <div class="court-block" id="${id}">
                ${title ? `<div class="court-label">${title}</div>` : ''}
                <div class="court-sides">
                    <div class="court-side dropzone" data-side="A"></div>
                    <div class="court-side dropzone" data-side="B"></div>
                </div>
                ${showButton ? '<button class="btn btn-primary next-game-btn">終場</button>' : ''}
            </div>
        `;
    }

    function createPlayerBlock(player) {
        return `
            <div class="player-block ${player.skill.toLowerCase()}" draggable="true" id="player-${Date.now()}-${Math.random()}" data-player-name="${player.name}" data-games-played="${player.games_played || 0}">
                <span class="games-played">${player.games_played || 0}</span>
                <span class="player-name">${player.name}</span>
            </div>
        `;
    }

    function addDragAndDropListeners() {
        $(".player-block").draggable({
            revert: "invalid",
            helper: "clone",
            start: function() {
                $(this).css({ opacity: 0.5 });
            },
            stop: function() {
                $(this).css({ opacity: 1 });
            }
        });

        $(".dropzone, .player-block").droppable({
            accept: ".player-block",
            drop: function(event, ui) {
                const draggable = ui.draggable;
                const droppable = $(this);

                // Handle swapping
                if (droppable.hasClass('player-block')) {
                    const draggableParent = draggable.parent();
                    const droppableParent = droppable.parent();
                    draggable.detach().appendTo(droppableParent);
                    droppable.detach().appendTo(draggableParent);
                    return;
                }

                // Handle dropping into a court side
                if (droppable.hasClass('court-side')) {
                    if (droppable.children().length < 2) {
                        draggable.detach().appendTo(droppable);
                    }
                } else {
                    // Handle dropping into other dropzones (bench, etc.)
                    draggable.detach().appendTo(droppable);
                }
            }
        });
    }

    courtsContainer.on('click', '.next-game-btn', function() {
        const courtBlock = $(this).closest('.court-block');
        const playersOnCourt = courtBlock.find('.player-block');
        playersOnCourt.each(function() {
            let gamesPlayed = parseInt($(this).data('gamesPlayed'), 10) + 1;
            $(this).data('gamesPlayed', gamesPlayed);
            $(this).find('.games-played').text(gamesPlayed);
            benchPlayersContainer.append(this);
        });

        const playersNextUp = nextUpContainer.find('.player-block');
        const targetCourtSides = courtBlock.find('.court-side');
        playersNextUp.each(function(index) {
            $(targetCourtSides[index < 2 ? 0 : 1]).append(this);
        });

        const allBenchedPlayers = benchPlayersContainer.find('.player-block').get();
        allBenchedPlayers.sort((a, b) => $(a).data('gamesPlayed') - $(b).data('gamesPlayed'));
        const nextPlayers = allBenchedPlayers.slice(0, 4);
        const nextUpCourtSides = nextUpContainer.find('.court-side');
        nextUpCourtSides.empty();
        $(nextPlayers).each(function(index) {
            $(nextUpCourtSides[index < 2 ? 0 : 1]).append(this);
        });
    });

    initialize();
});