function handlePrioBtnClick(btnNumber) {
    for (let i = 1; i <= 3; i++) {
        const btn = document.getElementById('addTaskPrio' + i);
        if (i == btnNumber) { // falls dieser Button geklickt wurde
            btn.classList.toggle('addTaskPrioBtnsSelected');
            btn.classList.toggle(`addTaskPrio${i}Selected`);
            togglePrioBtnImg(i);
        } else { // CSS-Klassen entfernen, falls anderer Button geklickt wurde
            btn.classList.remove('addTaskPrioBtnsSelected');
            btn.classList.remove(`addTaskPrio${i}Selected`);
            colorPrioBtnImg(i);
        }
    }
}

function togglePrioBtnImg(i) {
    const img = document.getElementById(`addTaskPrio${i}Img`);
    if (img.src.includes('white')) {
        colorPrioBtnImg(i);
    } else {
        let newSrc = img.src.replace('.svg', '_white.svg');
        img.src = newSrc;
    }
}

function colorPrioBtnImg(i) {
    const img = document.getElementById(`addTaskPrio${i}Img`);
    if (img.src.includes('white')) {
        let newSrc = img.src.replace('_white', '');
        img.src = newSrc;
    }
}