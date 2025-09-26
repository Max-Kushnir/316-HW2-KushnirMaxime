import { jsTPS_Transaction } from "jstps";

export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(initApp, initSongIndex, initOldSong, initNewSong) {
        super();
        this.app = initApp;
        this.songIndex = initSongIndex;
        this.oldSong = { ...initOldSong }; // Deep copy
        this.newSong = { ...initNewSong }; // Deep copy
    }

    executeDo() {
        this.app.editSong(this.songIndex, this.newSong);
    }
    
    executeUndo() {
        this.app.editSong(this.songIndex, this.oldSong);
    }
}