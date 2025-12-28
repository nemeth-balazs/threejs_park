let helpVisible = false;
let helpDiv;

export function initHelpOverlay() {
    helpDiv = document.createElement('div');
    helpDiv.id = 'helpOverlay';
    helpDiv.innerHTML = `
        <b>Keyboard shortcuts</b><br><br>
        Tip #1: Change to night mode to start animation!<br>
        Tip #2: Use the left / right arrow to move the spotlight<br>
            in front of the welcome text in night mode!<br>
        Tip #3: Use the up / down arrow to rotate the flag<br>
        I – Toggle help<br>
        A – Show axis helpers<br>
        S – Show spotlight helpers<br>
        D – Change daylight<br>
        R – Reset camera<br>
        1 - Show left lamp<br>
        2 - Show right lamp<br>
        3 - Show well<br>
        4 - Show flag<br>
        5 - Show fence<br>
        6 - Show road<br>
        7 - Show billboard<br>
        8 - Show welcome text<br>
    `;

    helpDiv.style.position = 'absolute';
    helpDiv.style.top = '50px';
    helpDiv.style.left = '50%';
    helpDiv.style.transform = 'translateX(-50%)';
    helpDiv.style.background = 'rgba(0,0,0,0.75)';
    helpDiv.style.color = '#fff';
    helpDiv.style.padding = '12px 16px';
    helpDiv.style.fontFamily = 'sans-serif';
    helpDiv.style.borderRadius = '6px';
    helpDiv.style.display = 'none';
    helpDiv.style.zIndex = '1000';

    document.body.appendChild(helpDiv);
}

export function toggleHelp() {
    helpVisible = !helpVisible;
    helpDiv.style.display = helpVisible ? 'block' : 'none';
}