let helpVisible = false;
let helpDiv;

export function initHelpOverlay() {
    helpDiv = document.createElement('div');
    helpDiv.id = 'helpOverlay';
    helpDiv.innerHTML = `
        <b>Keyboard shortcuts</b><br><br>
        I – Toggle help<br>
        A – Show/hide axis helpers<br>
        S – Show/hide spotlight helpers<br>
        D – Is daylight?<br>
        R – Reset camera<br>
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