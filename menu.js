document.querySelector("#easy").addEventListener("click", () => {
    window.location.href ="./minigame-cardjitsu/index.html?difficulty=easy";
})
document.querySelector("#normal").addEventListener("click", () => {
    window.location.href = "./minigame-cardjitsu/index.html?difficulty=normal";
});
document.querySelector("#hard").addEventListener("click", () => {
    window.location.href = "./minigame-cardjitsu/index.html?difficulty=hard";
});